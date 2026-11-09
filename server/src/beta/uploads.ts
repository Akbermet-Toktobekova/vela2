import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { BetaStore } from './store';
import { BetaError, BetaFinancial } from './financial';
import { BetaImports } from './imports';

type User = {id: string; name: string; email: string};
interface Upload {
  id: string; accountId: string; fileName: string; uploadedAt: string; status: 'uploaded'|'processing'|'complete'|'needs_attention';
  message?: string; importId?: string; contentBase64?: string;
}
/** Staging contains no parsing/model work. The job queue processes files after onboarding. */
export class BetaUploads {
  constructor(private store: BetaStore, private financial: BetaFinancial, private imports: BetaImports) {
    for (const row of store.database.prepare("SELECT user_id FROM beta_documents WHERE doc_key='uploads-v1'").all() as {user_id:string}[]) {
      const saved = (store.get(row.user_id,'uploads-v1') || []) as Upload[];
      if (saved.some(u => u.status === 'processing')) store.put(row.user_id,'uploads-v1',saved.map(u=>u.status==='processing'?{...u,status:'uploaded'}:u));
    }
  }
  private all(user: User): Upload[] {return (this.store.get(user.id, 'uploads-v1') || []) as Upload[];}
  list(user: User) { return this.all(user).map(({contentBase64, ...row}) => row); }
  pending(user: User) { return this.all(user).filter(u => u.status === 'uploaded').map(u => u.id); }
  stage(user: User, raw: unknown) {
    const input = z.object({accountId: z.string().min(1), fileName: z.string().min(1).max(255), contentBase64: z.string().min(1).max(28_000_000)}).strict().parse(raw);
    if (!this.financial.get(user).state.accounts.some(a => a.id === input.accountId)) throw new BetaError('INVALID_ACCOUNT', 'Choose your account.');
    const bytes = Buffer.from(input.contentBase64, 'base64');
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(input.contentBase64) || !bytes.length || bytes.length > 20 * 1024 * 1024)
      throw new BetaError('INVALID_FILE', 'Choose a valid file smaller than 20 MB.');
    const row: Upload = {...input, id: randomUUID(), uploadedAt: new Date().toISOString(), status: 'uploaded'};
    this.store.put(user.id, 'uploads-v1', [...this.all(user), row]); return this.list(user).find(u => u.id === row.id)!;
  }
  private update(user: User, id: string, changes: Partial<Upload>) {
    this.store.put(user.id, 'uploads-v1', this.all(user).map(u => u.id === id ? {...u, ...changes} : u));
  }
  async process(user: User) {
    for (const id of this.pending(user)) {
      const row = this.all(user).find(u => u.id === id);
      if (!row) continue;
      this.update(user, id, {status: 'processing'});
      try {
        const preview = (row.importId ? this.imports.get(user.id,row.importId) : null) || await this.imports.preview(user, {accountId: row.accountId, fileName: row.fileName, contentBase64: row.contentBase64});
        if (!this.all(user).some(u => u.id === id)) {
          this.imports.deleteImport(user, preview.id, this.financial.get(user).version); continue;
        }
        this.update(user, id, {importId: preview.id});
        if (preview.confirmed) {this.update(user,id,{status:'complete',contentBase64:undefined,message:undefined});continue;}
        if (preview.pdf) this.imports.prepareAutomaticPdf(user, preview.id);
        const ready = this.imports.get(user.id, preview.id)!;
        if (ready.status === 'parsed_successfully' ||
            ready.status === 'needs_review' && !!ready.parsing && !ready.parsing.mappingRequired &&
              (ready.transactions.length > 0 || !!ready.statement?.duplicateCountSkipped)) {
          this.imports.confirm(user, preview.id, this.financial.get(user).version, true);
          this.update(user, id, {status: 'complete', contentBase64: undefined, message: undefined});
        } else this.update(user, id, {status: 'needs_attention', contentBase64: undefined, message: ready.unresolvedRows?.length ? 'Some rows could not be imported. Open Show details to see the original rows.' : ready.message || 'The statement could not be read.'});
      } catch (error) {
        this.update(user, id, {status: 'needs_attention', message: error instanceof Error ? error.message : 'Processing failed. Retry this file.'});
      }
    }
    return this.list(user);
  }
  retry(user: User, id: string) {
    const row = this.all(user).find(u => u.id === id);
    if (!row) throw new BetaError('NOT_FOUND', 'File not found.', 404);
    if (!row.contentBase64) throw new BetaError('OPEN_REVIEW', 'Open the saved file review in Profile.');
    this.update(user, id, {status: 'uploaded', message: undefined});
  }
  delete(user: User, id: string, expectedVersion: number) {
    const row = this.all(user).find(u => u.id === id);
    if (!row) throw new BetaError('NOT_FOUND', 'File not found.', 404);
    if (this.financial.get(user).version !== expectedVersion) throw new BetaError('VERSION_CONFLICT', 'Refresh before deleting.', 409);
    if (row.importId) this.imports.deleteImport(user, row.importId, expectedVersion);
    this.store.put(user.id, 'uploads-v1', this.all(user).filter(u => u.id !== id));
  }
}
