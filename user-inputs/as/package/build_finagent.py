"""FinAgent reproducible research-to-artifact rebuild (2026-11-01).
Reconstructs a small audited corpus. DOES NOT reconstruct inaccessible old ZIP or claim old IDs.
Synthetic MCDA sensitivities are demonstration, not calibrated financial recommendations.
"""
import csv, json, os, math, zipfile, random, hashlib, statistics
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from artifact_tool import Workbook, SpreadsheetFile

BASE=Path('/mnt/data/FinAgent_Database_Delivery'); DATE='2026-11-01'
D={k:[] for k in ['sources','financial_claims','claim_source_mapping','financial_rules','financial_formulas','evidence_gaps','action_candidates','action_evidence_mapping','action_rule_mapping','action_formula_mapping','agent_knowledge_mapping','verification_audit','version_history']}

# Primary pages were read in original institutional domains or at original scholarly publishers via web retrieval.
# Distinguish full-page text review from source-retrieved extracts and inaccessible original PDFs.
source_rows=[
('S001','An essential guide to building an emergency fund','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','Consumers','https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/','What is an emergency fund?; How much do I need in it?; Strategy: Manage your cash flow; Strategy: Make your saving automatic; Where should I keep it?','FULL_PAGE_TEXT_REVIEWED','Guidance, not causal experiment',''),
('S002','Know Before You Owe: Credit cards','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','Credit card users','https://www.consumerfinance.gov/data-research/credit-card-data/know-you-owe-credit-cards/','4. What do I have to pay and when?; 5. How is interest calculated?','ORIGINAL_PAGE_EXCERPT_REVIEWED','Card-specific agreement controls',''),
('S003','How does my credit card company calculate the amount of interest I owe?','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','Credit card users','https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/','How does the daily interest calculation work?; How do my payments affect the amount of interest I owe?','ORIGINAL_PAGE_EXCERPT_REVIEWED','Many, not all, card issuers; exact APR and grace period vary','2024-01-22'),
('S004','What should I do if I can’t pay my credit card bills?','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','Consumers unable to pay card bills','https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-i-cant-pay-my-credit-card-bills-en-1697/','Opening guidance; What steps can I take to manage my credit card bills? steps 1–4','ORIGINAL_PAGE_EXCERPT_REVIEWED','Hardship programs vary by creditor and borrower',''),
('S005','Emergency Savings and Financial Security','Consumer Financial Protection Bureau','OFFICIAL_OBSERVATIONAL_RESEARCH','US','US consumers with credit bureau records','https://www.consumerfinance.gov/data-research/research-reports/emergency-savings-financial-security-insights-from-making-ends-meet-survey-and-consumer-credit-panel/','Report description; headline findings','ORIGINAL_PAGE_EXCERPT_REVIEWED','Associations, not causal impacts','2022-03-23'),
('S006','Consumer Savings App Strategies and Savings Outcomes','Consumer Financial Protection Bureau','OFFICIAL_OBSERVATIONAL_RESEARCH','US','Qapital savings-app users','https://www.consumerfinance.gov/data-research/research-reports/consumer-savings-app-strategies-and-savings-outcomes/','Research summary: guaranteed vs contingent saving rules','ORIGINAL_PAGE_EXCERPT_REVIEWED','Selection/confounding; not general causal effect','2022-12-07'),
('S007','Economic Well-Being of U.S. Households in 2025 — Income and Expenses','Federal Reserve Board','OFFICIAL_SURVEY','US','US adults in SHED 2025','https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-income-and-expenses.htm','Income Variability: paragraph 1 and 2','ORIGINAL_PAGE_EXCERPT_REVIEWED','Survey self-report; population US adults','2026-05-13'),
('S008','Report on the Economic Well-Being of U.S. Households in 2025 — Overall Financial Well-Being','Federal Reserve Board','OFFICIAL_SURVEY','US','US adults in SHED 2025','https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-overall-financial-well-being.htm','Table 1: Doing okay or living comfortably financially, age group','ORIGINAL_PAGE_EXCERPT_REVIEWED','Descriptive; no individual prediction','2026-05-13'),
('S009','The Global Findex Database 2025 — Report','World Bank','OFFICIAL_SURVEY','INTERNATIONAL','Adults in 141 economies, 2024 survey','https://www.worldbank.org/en/publication/globalfindex/report','Report: survey scope and methodology summary','ORIGINAL_PAGE_EXCERPT_REVIEWED','Country-specific findings not extracted','2025'),
('S010','Asset Allocation and Diversification','US Securities and Exchange Commission / Investor.gov','OFFICIAL_GUIDANCE','US','Beginner investors','https://www.investor.gov/introduction-investing/getting-started/asset-allocation','What is asset allocation?; What is diversification?','FULL_PAGE_TEXT_REVIEWED','General education, not portfolio advice',''),
('S011','Understanding Fees','US Securities and Exchange Commission / Investor.gov','OFFICIAL_GUIDANCE','US','Investors','https://www.investor.gov/introduction-investing/getting-started/understanding-fees','Opening questions: total purchase/sale and ongoing fees','ORIGINAL_PAGE_EXCERPT_REVIEWED','Investment product fee schedules differ',''),
('S012','Financial education affects financial knowledge and downstream behaviors','Journal of Financial Economics / Elsevier','PEER_REVIEWED_META_ANALYSIS','INTERNATIONAL','76 randomized experiments; over 160,000 individuals','https://www.sciencedirect.com/science/article/pii/S0304405X21004281','Abstract; Conclusion','ORIGINAL_PUBLISHER_EXCERPT_REVIEWED','Heterogeneity; not FinAgent-specific efficacy','2022-08'),
('S013','Does Financial Education Impact Financial Literacy and Financial Behavior, and If So, When?','The World Bank Economic Review / Oxford University Press','PEER_REVIEWED_META_ANALYSIS','INTERNATIONAL','126 evaluated studies','https://academic.oup.com/wber/article-abstract/31/3/611/4471971','Abstract','ORIGINAL_PUBLISHER_EXCERPT_REVIEWED','Heterogeneous by behavior, country, audience','2017-10'),
('S014','Repayment Concentration and Consumer Motivation to Get Out of Debt','Journal of Consumer Research / Oxford University Press','PEER_REVIEWED_BEHAVIORAL_STUDY','US_STUDY','Indebted consumers and experimental participants','https://academic.oup.com/jcr/article-abstract/43/3/460/2200459','Abstract','ORIGINAL_PUBLISHER_EXCERPT_REVIEWED','Motivation effect not same as lowest interest cost','2016-08-09'),
('S015','Multi-criteria analysis manual for making government policy','UK Government','OFFICIAL_METHODS_GUIDANCE','GENERAL_METHOD','Multi-criteria decisions','https://www.gov.uk/government/publications/multi-criteria-analysis-manual-for-making-government-policy','Details: policy options appraisal; descriptive manual listing','ORIGINAL_PAGE_EXCERPT_REVIEWED','Method justifies framework, not numerical FinAgent weights','2009-01-28'),
('S016','Constructing Consistent Composite Indicators: the Issue of Weights','European Commission Joint Research Centre','ORIGINAL_METHODS_RESEARCH','GENERAL_METHOD','Composite indicators','https://publications.jrc.ec.europa.eu/repository/handle/JRC32434','Abstract','ORIGINAL_PAGE_EXCERPT_REVIEWED','Does not calibrate FinAgent scoring','2006-02-15'),
('S017','Regulating Buy Now Pay Later (BNPL)','Financial Conduct Authority','OFFICIAL_REGULATORY_GUIDANCE','UK','Third-party DPC lenders and UK consumers','https://www.fca.org.uk/firms/regulating-buy-now-pay-later','Who this applies to; regulations commenced 15 July 2026','ORIGINAL_PAGE_EXCERPT_REVIEWED','In-scope UK third-party DPC; exclusions','2026-07-15'),
('S018','CONC 4.2A Product information requirements: regulated deferred payment credit agreements','Financial Conduct Authority Handbook','PRIMARY_REGULATION','UK','Firms offering in-scope regulated DPC','https://handbook.fca.org.uk/handbook/conc4/conc4s2a?date=15-07-2026&timeline=true','CONC 4.2A.3R; CONC 4.2A.5R','ORIGINAL_PAGE_EXCERPT_REVIEWED','Applies to regulated DPC only','2026-07-15'),
('S019','Regulation (EU) 2016/679 (GDPR)','European Union / EUR-Lex','PRIMARY_LAW','EU','Data controllers and processors','https://eur-lex.europa.eu/legal-content/ENG/ALL/?uri=celex:32016R0679','Article 5(1)(a)–(f)','ORIGINAL_SEARCH_EXCERPT_ONLY','Full-page reopen blocked by anti-bot; legal verification needs further independent review','2016-04-27'),
('S020','Directive (EU) 2023/2225 on consumer credit','European Union / EUR-Lex','PRIMARY_LAW','EU','EU Member States and lenders','https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=oj:L_202302225','Article 48(1) transposition/application; Article 47 repeal','ORIGINAL_SEARCH_EXCERPT_ONLY','Full-page reopen blocked by anti-bot; national transposition not verified','2023-10-18'),
('S021','What is the three-year payoff box on my credit card bill?','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','US cardholders','https://www.consumerfinance.gov/ask-cfpb/a-box-on-my-credit-card-bill-says-that-i-will-pay-off-the-balance-in-three-years-if-i-pay-a-certain-amount-what-does-that-mean-do-i-have-to-pay-that-much-if-i-pay-that-much-and-make-new-purchases-will-i-still-owe-nothing-after-three-years-en-36/','Answer: minimum payment vs 36-month illustration','ORIGINAL_PAGE_EXCERPT_REVIEWED','Assumes no new card spending','2024-01-22'),
('S022','Perceived Financial Preparedness, Saving Habits, and Financial Security','Consumer Financial Protection Bureau','OFFICIAL_OBSERVATIONAL_RESEARCH','US','Making Ends Meet survey consumers','https://www.consumerfinance.gov/data-research/research-reports/perceived-financial-preparedness-saving-habits-and-financial-security/','Research brief summary: save vs do not save','ORIGINAL_PAGE_EXCERPT_REVIEWED','Associations not causality',''),
('S023','How does my card issuer allocate payments across different APR balances?','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','US cardholders with multiple APR categories','https://www.consumerfinance.gov/ask-cfpb/my-bill-shows-different-aprs-and-shows-how-much-of-the-balance-is-subject-to-each-interest-rate-i-cannot-figure-out-how-this-is-calculated-how-does-that-work-en-39/','How payments exceeding the minimum are applied','ORIGINAL_PAGE_EXCERPT_REVIEWED','US issuer rules and card terms apply',''),
('S024','I got a credit card promising no interest if I pay in full in 12 months. How does this work?','Consumer Financial Protection Bureau','OFFICIAL_GUIDANCE','US','US deferred-interest card users','https://www.consumerfinance.gov/ask-cfpb/i-got-a-credit-card-promising-no-interest-for-a-purchase-if-i-pay-in-full-within-12-months-how-does-this-work-en-40/','Five tips for paying off deferred interest purchase','ORIGINAL_PAGE_EXCERPT_REVIEWED','Specific deferred-interest offer terms control',''),
]
for id,title,issuer,typ,juris,pop,url,section,review,limits,published in source_rows:
    D['sources'].append(dict(source_id=id,title=title,issuer=issuer,source_type=typ,jurisdiction=juris,population=pop,canonical_url=url,exact_sections_reviewed=section,retrieval_evidence_status=review,publication_or_effective_date=published,last_reviewed=DATE,limitations=limits,provenance='REBUILT_2026_11_01',link=''))

# Each claim precisely matched to a discrete, verifiable paragraph, section or abstract.
def cl(cid, domain, content, sid, section, status='VERIFIED', kind='GUIDANCE', limitation='', support='DIRECT'):
    # only exact HTML/abstract retrieved sources receive VERIFIED; anti-bot EU originals remain pending
    if sid in ('S019','S020'): status='PENDING_ORIGINAL_REOPEN'; support='SEARCH_EXCERPT_ONLY'
    D['financial_claims'].append(dict(claim_id=cid,domain=domain,claim=content,claim_type=kind,verification_status=status,jurisdiction=next(s['jurisdiction'] for s in D['sources'] if s['source_id']==sid),population=next(s['population'] for s in D['sources'] if s['source_id']==sid),limitations=limitation or next(s['limitations'] for s in D['sources'] if s['source_id']==sid),source_primary_id=sid,last_reviewed=DATE,provenance='REBUILT_FROM_PRIMARY_RETRIEVAL'))
    mid=f'M{len(D["claim_source_mapping"])+1:03d}'
    D['claim_source_mapping'].append(dict(mapping_id=mid,claim_id=cid,source_id=sid,exact_location=section,support_type=support,verification_status=status,last_reviewed=DATE,source_url=next(s['canonical_url'] for s in D['sources'] if s['source_id']==sid)))

cl('C001','RESILIENCE','An emergency fund is a cash reserve specifically set aside for unexpected expenses or financial emergencies.','S001','What is an emergency fund? first paragraph')
cl('C002','RESILIENCE','CFPB guidance says the amount to set aside for emergencies depends on the household situation and past unexpected expenses, rather than imposing one universal amount.','S001','How much do I need in it? first paragraph')
cl('C003','RESILIENCE','CFPB describes safe, accessible storage as important characteristics for emergency savings.','S001','Where should I keep it? first paragraph')
cl('C004','CASH_FLOW','Cash flow includes the timing of income and expenses; mismatched timing can create temporary shortages.','S001','Strategy: Manage your cash flow paragraph')
cl('C005','SAVINGS','CFPB describes automatic recurring transfers as a way to save consistently but warns that insufficient checking-account funds can incur overdraft fees.','S001','Strategy: Make your saving automatic paragraphs 1–2')
cl('C006','SAVINGS','CFPB suggests setting a specific savings goal and monitoring progress to support a saving habit.','S001','Strategy: Create a savings habit bullet points')
cl('C007','RESILIENCE','CFPB observational data show differences in credit, debt, bill-paying difficulty, and well-being by reported emergency-savings levels, without establishing causality.','S005','Report description and main findings',kind='OBSERVATIONAL_ASSOCIATION')
cl('C008','SAVINGS','In CFPB app data, guaranteed saving rules such as payday saving were associated with greater accumulation than spending-contingent rules; this is observational.','S006','Research summary bullet 2',kind='OBSERVATIONAL_ASSOCIATION')
cl('C009','CASH_FLOW','Federal Reserve 2025 survey reports that 30% of US adults had income varying at least occasionally, and 11% said variation created difficulty paying bills in the prior year.','S007','Income Variability paragraphs 1–2',kind='SURVEY_DESCRIPTIVE')
cl('C010','CASH_FLOW','Annual income totals can obscure month-to-month volatility and timing mismatches that cause financial challenges.','S007','Income Variability opening paragraph',kind='SURVEY_INTERPRETATION')
cl('C011','YOUNG_ADULTS','In the Fed 2025 survey, 63% of adults ages 18–29 reported doing okay or living comfortably financially; this is descriptive US survey data.','S008','Table 1: age 18–29 row',kind='SURVEY_DESCRIPTIVE')
cl('C012','GLOBAL','World Bank Global Findex 2025 uses 2024 survey data on roughly 148,000 adults across 141 economies.','S009','Report: survey description',kind='SURVEY_METHOD')
cl('C013','DEBT','CFPB guidance says US credit-card minimum payments must be made by the due date to avoid late-payment consequences, subject to contract terms.','S002','4. What do I have to pay and when?')
cl('C014','DEBT','Paying more than the card minimum generally reduces interest cost and shortens payoff time.','S002','4. What do I have to pay and when?')
cl('C015','DEBT','Many US card issuers accrue credit-card interest daily, and earlier principal payments can reduce interest when interest is accruing.','S003','How does the daily interest calculation work?')
cl('C016','DEBT','US card issuers generally allocate above-minimum payments first to the highest-APR sub-balance on a card.','S023','Answer: payment allocation paragraph')
cl('C017','DEBT','When a US cardholder cannot pay the required minimum, CFPB recommends contacting the card issuer immediately to discuss options.','S004','Opening paragraph; Call your credit card company')
cl('C018','HARDSHIP','CFPB identifies nonprofit credit counseling as a possible support option and cautions about some debt-settlement firm practices.','S004','Consider credit counseling; Watch out for debt settlement')
cl('C019','DEBT','A US three-year repayment disclosure assumes no further spending; paying only minimums can extend payoff for years.','S021','Answer: paragraphs 1–3')
cl('C020','DEBT','A deferred-interest card offer may charge interest if the promotional balance is not repaid by the offer deadline; exact offer terms require checking.','S024','Five tips for paying off deferred interest purchase')
cl('C021','SAVINGS','CFPB survey analysis finds that respondents who report not saving are more likely to have had trouble paying bills, an association not an effect estimate.','S022','Research brief results summary',kind='OBSERVATIONAL_ASSOCIATION')
cl('C022','EDUCATION','A 2022 meta-analysis of 76 randomized experiments involving over 160,000 people found positive average effects of financial education on knowledge and downstream financial behaviors.','S012','Abstract',kind='META_ANALYSIS_CAUSAL_AVERAGE')
cl('C023','EDUCATION','A meta-analysis of 126 studies finds heterogeneous financial education effects; debt behavior is comparatively difficult to change and teachable-moment delivery is associated with stronger effects.','S013','Abstract',kind='META_ANALYSIS')
cl('C024','BEHAVIOR','A field study and experiments suggest concentrating repayments in one account can increase debt-payoff motivation, especially for smaller accounts.','S014','Abstract',kind='BEHAVIORAL_EXPERIMENTS')
cl('C025','INVESTING','SEC Investor.gov says investment asset allocation depends on time horizon and tolerance of investment risk.','S010','What is asset allocation? paragraphs 1–3')
cl('C026','INVESTING','Diversification spreads investments to reduce concentration risk, but narrowly focused funds need not provide broad diversification.','S010','What is diversification? paragraphs 1–5')
cl('C027','INVESTING','SEC Investor.gov recommends checking total purchase/sale costs and ongoing investment fees before investing.','S011','Understanding Fees: opening questions')
cl('C028','MCDA','The UK multi-criteria analysis manual presents MCDA as a structured method for evaluating options using multiple criteria; it does not supply FinAgent-specific weights.','S015','Details: manual description',kind='METHOD_GUIDANCE')
cl('C029','MCDA','European Commission JRC research identifies conceptual pitfalls in interpreting composite-indicator weights.','S016','Abstract',kind='METHOD_RESEARCH')
cl('C030','BNPL','The FCA began regulating in-scope deferred payment credit agreements on 15 July 2026, while exclusions remain.','S017','Who this applies to; introductory paragraphs',kind='REGULATORY_GUIDANCE')
cl('C031','BNPL','FCA CONC 4.2A.3R requires specified pre-contract information for regulated deferred payment credit agreements.','S018','CONC 4.2A.3R',kind='PRIMARY_RULE')
cl('C032','PRIVACY','GDPR Article 5 sets principles including data minimisation and purpose limitation.','S019','Article 5(1)(b)–(c)',kind='PRIMARY_LAW')
cl('C033','CONSUMER_CREDIT','EU Directive 2023/2225 Article 48 states relevant national implementing measures apply from 20 November 2026; transposition and national applicability need checking.','S020','Article 48(1)',kind='PRIMARY_LAW')

# Add independent supporting claim-source link for one case; source passage still support direct.
D['claim_source_mapping'].append(dict(mapping_id='M034',claim_id='C015',source_id='S002',exact_location='5. How is interest calculated?',support_type='CORROBORATING',verification_status='VERIFIED',last_reviewed=DATE,source_url=next(s['canonical_url'] for s in D['sources'] if s['source_id']=='S002')))

# Gaps: original unavailable, implementation validation, jurisdiction and empirical claims beyond corpus.
gap_list=[
('G001','ORIGINAL_CORPUS','Previous ZIP containing 25 sources and 24 claims was not present; original row contents and stable IDs cannot be recovered or independently audited.','CRITICAL'),
('G002','SOURCE_TARGET','Research target 40–60 originals not reached in this bounded rebuild.','HIGH'),
('G003','RESILIENCE','No verified universal emergency-fund reserve threshold for students or irregular earners.','HIGH'),
('G004','WEIGHTING','No empirically calibrated w_R,w_F,w_G or effort coefficient for FinAgent.','CRITICAL'),
('G005','WEIGHTING','No validated personal preference elicitation, scale normalization, or predictive effort measure.','HIGH'),
('G006','WEIGHTING','Criteria overlap (resilience, financial benefit, goal progress) and potential double counting untested on real data.','HIGH'),
('G007','LEGAL','Legal review required for personalized investment advice and national rules in all planned jurisdictions.','CRITICAL'),
('G008','EU','EU legal original HTML reopen blocked; directive and GDPR citations checked in original-site search excerpts only; national implementation unchecked.','HIGH'),
('G009','ACTION_EFFECTS','Action completion probabilities, expected impacts and harm rates not measured on FinAgent users.','HIGH'),
('G010','DEBT','Debt avalanche vs snowball cost/adherence tradeoffs require individual repayment and credit contract data.','HIGH'),
('G011','CONSUMER_PROTECTION','No comprehensive country-by-country fee, overdraft, student loan or hardship catalogue built.','MEDIUM'),
('G012','ACTION_APPROVAL','All candidate actions need product, safety, and where relevant legal approval before execution.','CRITICAL'),
('G013','ORIGINAL_IMAGES','No sensitivity figures were present in research exports; these figures are newly generated illustrative simulations.','MEDIUM'),
('G014','PRIOR_CLAIMS','Prior report indicated 24 approved-for-knowledge-use claims, but without actual old CSV those claims cannot be individually audited.','HIGH'),
]
for g,topic,desc,severity in gap_list: D['evidence_gaps'].append(dict(gap_id=g,category=topic,description=desc,severity=severity,status='OPEN',last_reviewed=DATE,resolution_needed='Additional original-document verification, product testing, or legal review as applicable'))

# Financial formula library: calculations mathematically derived vs products needing specific terms.
flist=[
('F001','Liquid emergency funds','L = sum(accessible_cash_like_accounts) - restricted_amounts','currency','Accessible liquid funds in one currency; excludes inaccessible funds','DERIVED_ENGINEERING_METRIC','S001','Bank and account accessibility depend on jurisdiction'),
('F002','Emergency months coverage','M = L / E_month','months','L currency; E_month essential monthly outflow > 0','DERIVED_ENGINEERING_METRIC','S001','Coverage measure, not verified target'),
('F003','Available cash before action','A = max(0, cash + confirmed_inflows_before_horizon - mandatory_outflows_before_horizon - buffer_floor)','currency','Cash and dated confirmed inflows/outflows in identical currency','ENGINEERING_POLICY_METRIC','S001','Cannot assume uncertain income arrives'),
('F004','Net cash projection','cash_t = cash_0 + SUM(inflows_<=t) - SUM(outflows_<=t)','currency','Timestamped confirmed transactions; no double counting','MATHEMATICAL_IDENTITY','S007','Forecast uncertainty excluded'),
('F005','Daily periodic APR','daily_rate = APR_decimal / 365','fraction/day','Applicable APR decimal; 365-day agreement convention','CONTRACT_DEPENDENT_CALCULATION','S003','Other conventions/contracts possible'),
('F006','Simple daily interest','interest_day = principal_day * daily_rate','currency/day','Interest-bearing daily balance, agreement accrual rules','CONTRACT_DEPENDENT_CALCULATION','S003','Grace periods, fees, balance groups, compounding vary'),
('F007','Loan fixed-payment annuity','P = B*r/(1-(1+r)^(-n)) for r>0; P=B/n if r=0','currency/period','Principal B, effective periodic rate r, remaining periods n>0','MATHEMATICAL_DERIVATION','S003','Not universal card minimum or variable loan'),
('F008','Debt interest avoided','delta_I = interest_baseline - interest_after_action','currency','Both scenarios use same rates, dates, transactions','COUNTERFACTUAL_MODEL','S002','Requires contract-compliant debt engine'),
('F009','Debt payoff horizon','n = -ln(1-B*r/P)/ln(1+r) if P>B*r','periods','Fixed installment P, balance B, rate r > 0; no new borrowing','MATHEMATICAL_DERIVATION','S021','Not applicable to dynamic minimum payments'),
('F010','Debt effective incremental cost','avoidable_cost = future_interest_and_fees_if_no_action - after_action_cost','currency','Scenario assumptions identical except action','COUNTERFACTUAL_MODEL','S002','Defaults and penalty fees must be modeled'),
('F011','Recurring expense saved','annual_saving = monthly_cancelled_cost * 12 - exit_fees - replacement_cost','currency/year','Known recurring charge, contract exit terms','MATHEMATICAL_DERIVATION','S001','Only if user actually cancels/changes service'),
('F012','Savings-goal progress','goal_pct = min(1,max(0,saved_amount/target_amount))','fraction','Target amount > 0','MATHEMATICAL_IDENTITY','S001','No time preference encoded'),
('F013','Monthly saving required (zero growth)','required = max(0,target - current_saving)/months_remaining','currency/month','No return; fixed horizon months_remaining>0','MATHEMATICAL_IDENTITY','S001','Inflation and changing income ignored'),
('F014','Resilience delta','delta_M = months_after_action - months_before_action','months','Liquidity and essential expenses measured consistently','DERIVED_ENGINEERING_METRIC','S001','Not a validated outcome proxy'),
('F015','Goal progress delta','delta_G = progress_after - progress_before','fraction','Both simulated states comparable','DERIVED_ENGINEERING_METRIC','S001','May overlap with cash benefit'),
('F016','Effort feature','C = documented_task_steps_or_minutes + calibrated_user_burden_model','task units','Observational effort inputs; scale to be validated','ENGINEERING_ASSUMPTION','S015','No validated scale exists; must not be equated to currency'),
('F017','FinAgent score','S(a)=w_R*v_R(a)+w_F*v_F(a)+w_G*v_G(a)-lambda_C*c_C(a)','unitless','Commonly normalized criteria and explicit stakeholder weights','UNVALIDATED_ENGINEERING_MODEL','S015','No empirically established coefficients; double-counting risk'),
('F018','Sensitivity winner frequency','p_win(i)=count(i is argmax S under sampled parameters)/N','fraction','Declared sampled parameter ranges and candidate utility matrix','SIMULATION_SUMMARY','S015','Scenario robustness only, not predictive win probability'),
('F019','Shortfall before due date','shortfall = max(0, mandatory_due - liquid_available_by_due)','currency','Dated bill and available confirmed funds','MATHEMATICAL_IDENTITY','S007','Not credit underwriting'),
('F020','Potential fees avoided','fee_delta = future_baseline_fees - future_fees_after_change','currency','Fee schedule and action completion confirmed','COUNTERFACTUAL_MODEL','S011','Do not assume fees saved without checking terms'),
]
for id,name,expr,units,inputs,kind,sid,limits in flist: D['financial_formulas'].append(dict(formula_id=id,name=name,expression=expr,output_units=units,required_inputs=inputs,formula_status=kind,source_id=sid,source_url=next(s['canonical_url'] for s in D['sources'] if s['source_id']==sid),assumptions_limits=limits,test_example='',approval_status='PENDING_REVIEW' if 'ENGINEERING' in kind or 'COUNTERFACTUAL' in kind else 'REFERENCE_ONLY'))

# Evidence-backed financial guidance turned into policies; policy rules are NOT source publications.
rules=[
('R001','Preserve mandatory payments','Reject discretionary transfers that cause known mandatory payments to be missed.','C013,C017','F003,F004,F019','US + general engineering','PENDING_REVIEW'),
('R002','Ensure cash availability','Require positive projected available cash and a policy-defined liquidity floor before optional action.','C002,C004,C005','F003,F004','General engineering','PENDING_REVIEW'),
('R003','Save affordable amount','Offer emergency savings only where affordability is demonstrated using date-based outflows.','C001,C002,C005','F001,F003,F004','General guidance','PENDING_REVIEW'),
('R004','Consider automation safely','Recurring saving only if deposit timing, account fee and overdraft checks pass.','C005,C008','F003,F004','US evidence/general engineering','PENDING_REVIEW'),
('R005','Pay card minimum','Prioritize imminent card minimum due dates when they are legally and contractually required.','C013','F004,F019','US card rules','PENDING_REVIEW'),
('R006','Pay extra debt affordably','Offer extra payment only once minimums and essentials are reserved.','C014,C015','F003,F008','US card guidance/general engineering','PENDING_REVIEW'),
('R007','Compare avalanche and adherence','Compare cost-minimizing extra-payment allocation against behavior-oriented approaches; do not claim universal superiority.','C014,C024','F008,F010','US research','PENDING_REVIEW'),
('R008','Escalate hardship','If required payment not feasible, suggest issuer contact and resources instead of unaffordable payments.','C017,C018','F019','US card guidance','PENDING_REVIEW'),
('R009','Analyze income variability','Forecast within-month liquidity using transaction dates; flag uncertain receipts.','C009,C010','F004','US survey and engineering','PENDING_REVIEW'),
('R010','Review recurring charges','Present potential savings only when cancellation cost and user need are assessed.','C004','F011,F020','Engineering extrapolation','PENDING_REVIEW'),
('R011','Individualize savings target','Treat reserve coverage as diagnostic, not a universal mandatory threshold.','C002','F001,F002','US official guidance','PENDING_REVIEW'),
('R012','Goal funding feasibility','Calculate required contribution versus confirmed capacity; reject impossible deadline promises.','C006','F003,F012,F013','Engineering extrapolation','PENDING_REVIEW'),
('R013','Investing education only','Provide generic allocation/diversification education, not security-specific personal recommendations without legal clearance.','C025,C026,C027','F003','US education + legal gate','PENDING_REVIEW'),
('R014','UK DPC jurisdiction gate','Attach UK DPC rules only for in-scope relevant agreements and effective dates.','C030,C031','F019','UK','PENDING_REVIEW'),
('R015','Financial data minimisation gate','Limit ingestion and retention to approved purposes; EU law must be rechecked for jurisdiction.','C032','','EU (pending full verify)','PENDING_REVIEW'),
('R016','Score is not evidence','Never equate a high aggregate score with proof of action benefit.','C028,C029','F014,F015,F016,F017,F018','Methodological','PENDING_REVIEW'),
('R017','Promo offer deadline','Check deferred-interest offer expiry and product terms before proposing payment changes.','C020','F004,F008','US','PENDING_REVIEW'),
('R018','Separate facts and experiments','Financial education evidence does not validate FinAgent-specific prompts, ranking, or outcomes.','C022,C023','F017','International','PENDING_REVIEW'),
]
for id,name,policy,cids,fids,region,status in rules: D['financial_rules'].append(dict(rule_id=id,name=name,rule_text=policy,supporting_claim_ids=cids,supporting_formula_ids=fids,jurisdiction=region,approval_status=status,safety_review_required='YES',provenance='FINAGENT_PROPOSED_POLICY'))

# Action candidates. Parameters are TEMPLATE placeholders, never patient/user-specific commands.
actions=[
('A001','Make required card minimum','DEBT_REQUIRED','Pay amount_due by due_date','amount_due;due_date;bank_balance;obligations','issuer;payment_method','Payment contract verified and available funds','Insufficient funds;wrong account;disputed obligation','C013','R001,R005','F003,F004,F019'),
('A002','Pay extra toward highest-rate card','DEBT_EXTRA','Pay extra_amount toward target_card','extra_amount;apr;balance;cash_flow','grace_period;fees;promo_expiry','All minimums covered; cash after action >=floor','Arrears on essential bills;no verified APR','C014,C015','R001,R002,R006','F003,F008,F010'),
('A003','Compare debt payoff orders','DEBT_PRIORITY','Compare avalanche and behavioral alternative before user chooses','debts;apr;minimums;balances','completion_preference','Multiple eligible debts with verified terms','Incomplete APR or penalties','C014,C024','R007','F008,F010'),
('A004','Check card interest calculation','DEBT_INFORMATION','Request or review APR/grace period and statement','card_statement','agreement','Interest charge uncertain','No authorization to access terms','C015,C016','R006','F005,F006'),
('A005','Request card hardship options','HARDSHIP','Contact issuer to discuss affordable arrangement','issuer_contact;minimum_due;affordable_payment','next_income_date','Cannot meet required minimum','Issuer identity not confirmed','C017,C018','R008','F019'),
('A006','Find nonprofit credit counseling','HARDSHIP','Compare qualified nonprofit counseling options','country;debt_type','fees;provider_credentials','Debt difficulty persists or user requests help','Provider identity unverified','C018','R008','F019'),
('A007','Start an emergency reserve','EMERGENCY_SAVINGS','Transfer affordable_amount to accessible reserve','liquid_balance;mandatory_outflows;amount','income_stability;shock_history','Affordability confirmed','Transfer would create bill shortfall','C001,C002','R002,R003,R011','F001,F002,F003'),
('A008','Replenish emergency reserve','EMERGENCY_SAVINGS','Transfer affordable_amount after emergency use','reserve_balance;amount;due_bills','target','Prior emergency reserve drawn down','Payments or essentials at risk','C001,C002','R002,R003','F001,F003'),
('A009','Assess reserve coverage','EMERGENCY_INFORMATION','Calculate essential-expense months covered','liquid_balance;essential_monthly_expense','shock_exposure','Inputs current','Essential spending unknown','C002','R011','F001,F002'),
('A010','Set safe payday saving','AUTOMATIC_SAVING','Schedule recurring affordable_amount only after paycheck','pay_dates;transfer_amount;cash_projection','overdraft_rules','Stable confirmed payday and cash flow','Overdraft or missed-payment risk','C005,C008','R002,R004','F003,F004'),
('A011','Pause risky automatic transfer','AUTOMATIC_SAVING','Pause or reduce scheduled transfer at risk date','scheduled_transfer;cash_projection','bank_fee_schedule','Near-term cash shortage projected','No user authorization','C005','R001,R004','F003,F004'),
('A012','Make savings-goal contribution','GOAL_SAVING','Contribute affordable_amount to named goal','goal_target;goal_balance;available_cash','goal_deadline','Goal confirmed and affordable','Essential shortfall; goal already met','C006','R002,R012','F003,F012,F013'),
('A013','Adjust savings-goal deadline','GOAL_PLANNING','Propose later feasible due date instead of unrealistic amount','goal_amount;remaining_months;available_cash','goal_priority','Required contribution exceeds verified capacity','Legal or contractual hard deadline','C006','R012','F012,F013'),
('A014','Review recurring subscriptions','RECURRING_EXPENSES','Identify recurring charge for user review','transactions;merchant;frequency','cancel_fee;usage','Likely recurring charge and consent','Essential service; cancellation penalty not reviewed','C004','R010','F011,F020'),
('A015','Cancel unused subscription after review','RECURRING_EXPENSES','Suggest cancellation of reviewed optional charge','merchant;monthly_fee;exit_terms','replacement_cost','Confirmed unused and user can cancel','Essential service or costly exit','C004','R010','F011'),
('A016','Inspect avoidable account charges','BANK_FEES','Review repeated charges and bank price list','fees;account_type','alternatives','Charges identified','Fee schedule not known','C004','R010','F020'),
('A017','Create bill due-date calendar','CASH_FLOW','Create timetable of mandatory expenses and paydays','due_dates;income_dates;bill_amounts','issuer_cycle','Dates known','Unconfirmed bill estimates presented as certain','C004,C009','R009','F004,F019'),
('A018','Request bill-date adjustment','CASH_FLOW','Ask creditor if due date can better align with paydays','bill;income_date;provider_contact','current_autopay','Documented timing mismatch','No creditor option or risk of fee','C004','R009','F004'),
('A019','Plan irregular income conservatively','IRREGULAR_INCOME','Reserve for confirmed upcoming obligations; separate variable receipts','income_history;mandatory_dates','income_distribution','Income volatility observed','Treat unconfirmed future income as certain','C009,C010','R002,R009','F003,F004'),
('A020','Identify upcoming cash shortfall','CASH_FLOW','Flag known payment shortfall and suggest information gathering','cash;due_obligations;confirmed_income','credit_access','Projection indicates shortfall','Incomplete due-date information','C004,C009','R009','F004,F019'),
('A021','Explain APR and interest','EDUCATION','Offer short contextual explanation for a debt action','apr;statement','credit_agreement','User confused about interest or debt decision','Do not present explanation as specific legal advice','C015,C022','R018','F005,F006'),
('A022','Explain diversification and risk','EDUCATION_INVESTING','Provide generic risk/time-horizon lesson','investment_goal_horizon','risk_tolerance','User asks investment basics','Specific security advice without legal gate','C025,C026','R013','F012'),
('A023','Review investment fee disclosures','EDUCATION_INVESTING','Help locate and compare disclosed total fees','fee_disclosure;account_type','product_alternatives','Investment product already selected for comparison','No official disclosure','C027','R013','F020'),
('A024','Check BNPL scheduled installments','BNPL_INFORMATION','List UK DPC due dates and contract information','country;agreement_type;payment_schedule','provider','Agreement and scope known','Regulatory status assumed cross-border','C030,C031','R014','F004,F019'),
('A025','Prepare debt-consolidation questions','DEBT_INFORMATION','List APR, fees, terms to check before evaluating consolidation','existing_apr;new_apr;fees;terms','credit_score','Offer details available','Missing comparison info or marketing promises','C015,C016','R006','F008,F010'),
('A026','Verify deferred-interest expiry','DEBT_INFORMATION','Review promo expiry and required payoff to avoid contractual interest','promo_end;promo_balance;statement','APR;minimum','Deferred-interest offer identified','Offer terms unverified','C020','R017','F004,F008'),
]
for id,name,cat,template,req,opt,elig,rej,cids,rids,fids in actions:
    claims=cids.split(','); supporting=[m for m in D['claim_source_mapping'] if m['claim_id'] in claims and m['verification_status']=='VERIFIED']; sid=supporting[0]['source_id'] if supporting else ''
    source=next((s for s in D['sources'] if s['source_id']==sid),None)
    evid_status='DIRECT_SOURCE_PLUS_ENGINEERING_GATES' if supporting else 'RESEARCH_GAP'
    D['action_candidates'].append(dict(action_id=id,name=name,category=cat,action_template=template,required_pi_inputs=req,optional_pi_inputs=opt,eligibility_conditions=elig,rejection_conditions=rej,safety_requirements='Checker must confirm affordability, obligations, consent, jurisdiction, timing and evidence freshness.',expected_effects='Potential improvement only; quantify via before/after scenario; not a guaranteed outcome.',possible_harms='Liquidity loss, overdraft, penalties, missed essential payments, behavioral effort, wrong jurisdiction.',applicable_jurisdiction='DETERMINE_PER_USER',calculation_ids=fids,supporting_rule_ids=rids,supporting_claim_ids=cids,source_name=source['issuer'] if source else '',source_url=source['canonical_url'] if source else '',evidence_status=evid_status,evidence_limits='Evidence supports general consideration, not this action template efficacy.',status='PENDING_REVIEW' if supporting else 'RESEARCH_CANDIDATE',approved_for_production='NO',missing_dependencies='Product safety/legal review; contract verification; user data quality',template_not_instance='YES'))
    for claim_id in claims:
        for m in [x for x in D['claim_source_mapping'] if x['claim_id']==claim_id]:
            D['action_evidence_mapping'].append(dict(mapping_id=f'AE{len(D["action_evidence_mapping"])+1:03d}',action_id=id,claim_id=claim_id,source_id=m['source_id'],claim_source_mapping_id=m['mapping_id'],source_url=m['source_url'],relationship='SUPPORTS_BACKGROUND_NOT_AUTOMATIC_APPROVAL'))
    for rid in rids.split(','): D['action_rule_mapping'].append(dict(mapping_id=f'AR{len(D["action_rule_mapping"])+1:03d}',action_id=id,rule_id=rid))
    for fid in fids.split(','): D['action_formula_mapping'].append(dict(mapping_id=f'AF{len(D["action_formula_mapping"])+1:03d}',action_id=id,formula_id=fid))

for ag, cats in {
'Behavior Agent':['BEHAVIOR','EDUCATION','SAVINGS','CASH_FLOW','IRREGULAR_INCOME'],
'Debt Agent':['DEBT','DEBT_REQUIRED','DEBT_EXTRA','DEBT_PRIORITY','DEBT_INFORMATION','HARDSHIP','BNPL_INFORMATION'],
'Suggestion Agent':['EMERGENCY_SAVINGS','GOAL_SAVING','CASH_FLOW','BANK_FEES','RECURRING_EXPENSES','AUTOMATIC_SAVING','IRREGULAR_INCOME','GOAL_PLANNING'],
'Checker Agent':['DEBT_REQUIRED','DEBT_EXTRA','EMERGENCY_SAVINGS','AUTOMATIC_SAVING','GOAL_SAVING','HARDSHIP','EDUCATION_INVESTING','BNPL_INFORMATION'],
'Weighting Engine':['DEBT_EXTRA','DEBT_PRIORITY','EMERGENCY_SAVINGS','GOAL_SAVING','CASH_FLOW','RECURRING_EXPENSES','BANK_FEES'],
'AI Assistant':['EDUCATION','EDUCATION_INVESTING','DEBT_INFORMATION','EMERGENCY_INFORMATION','GOAL_PLANNING','HARDSHIP']}.items():
    for a in D['action_candidates']:
        if a['category'] in cats:
            D['agent_knowledge_mapping'].append(dict(mapping_id=f'AK{len(D["agent_knowledge_mapping"])+1:03d}',agent_name=ag,record_type='ACTION',record_id=a['action_id'],usage='Candidate for explanation, computation or controlled review; not authorized for automatic execution.',status='DESIGN_MAPPING_PENDING_TEST'))

# record row-wise review, clearly separated verified source excerpt versus prior inaccessible corpus.
for s in D['sources']:
    status='VERIFIED' if not s['retrieval_evidence_status'].endswith('ONLY') else 'NEEDS_REVISION'
    D['verification_audit'].append(dict(audit_id=f'VA{len(D["verification_audit"])+1:03d}',record_type='SOURCE',record_id=s['source_id'],status=status,review_date=DATE,method=s['retrieval_evidence_status'],finding=('Retrieved publisher/institutional original excerpt or text at URL; exact supporting location recorded.' if status=='VERIFIED' else 'Original page reopen blocked; original-site result excerpt only.'),requires_followup='NO' if status=='VERIFIED' else 'YES'))
for c in D['financial_claims']:
    D['verification_audit'].append(dict(audit_id=f'VA{len(D["verification_audit"])+1:03d}',record_type='CLAIM',record_id=c['claim_id'],status=c['verification_status'] if c['verification_status']=='VERIFIED' else 'NEEDS_REVISION',review_date=DATE,method='Manual claim-to-passage extraction from original-domain retrieval',finding='Direct relevant section saved in claim-source mapping.' if c['verification_status']=='VERIFIED' else 'Original reopen needs confirmation.',requires_followup='NO' if c['verification_status']=='VERIFIED' else 'YES'))
D['version_history']=[dict(version_id='V001',date=DATE,change='New independently reconstructed corpus from report + original web sources; prior original ZIP not available',breaking_change='YES',prior_data_accessible='NO',assurance='No claim of preservation of inaccessible prior stable IDs'),dict(version_id='V002',date=DATE,change='Candidate action/rule/formula expansions and illustrative sensitivity charts',breaking_change='NO',prior_data_accessible='NO',assurance='No production action approval; no empirically calibrated MCDA parameters')]

# Test examples, exact finance units and purely hypothetical values.
examples={'F001':'€800+€100-€50=€850','F002':'€850/€500 = 1.70 months','F003':'max(0,€1000+€700-€1200-€200)=€300','F004':'€1000+€700-€1200=€500','F005':'0.24/365 = 0.000657534/day','F006':'€1000*(0.24/365)=€0.6575/day','F007':'€1000, r=.01, n=12 => €88.85/month','F008':'€120-€85=€35 interest avoided','F009':'€1000, r=.01, P=€100 => 10.59 periods','F010':'€90-€65=€25','F011':'€9*12-€15-€0=€93/year','F012':'€350/€1000=.35','F013':'(€1000-€350)/5=€130/month','F014':'1.8-1.5=0.3 months','F015':'0.55-0.35=0.20','F016':'Not calibrated','F017':'Illustrated by scenario files only','F018':'See sensitivity scenarios CSV','F019':'max(0,€800-€600)=€200','F020':'€45-€10=€35'}
for f in D['financial_formulas']: f['test_example']=examples.get(f['formula_id'],'')

# Synthetic illustrative MCDA ranking sensitivity: not data about actual consumers.
# Selected scenario features in [-1,1] or [0,1]. Criteria interpretation remains unvalidated.
options=[('Extra debt payment',.05,.90,.35,.30),('Build cash buffer',.85,.35,.35,.15),('Fund nearer-term goal',.05,.15,.95,.10),('Review subscription',.15,.40,.35,.75)]
weights=[(.25,.25,.25,.25),(.45,.25,.20,.10),(.15,.55,.20,.10),(.15,.20,.55,.10),(.10,.25,.15,.50)]
scen=[]
for i,ww in enumerate(weights):
    # friction penalty is lambda for same-scale effort, other weights of benefit not normalized to sum 1 deliberately described as tradeoff
    scores=[(name,round(ww[0]*R+ww[1]*F+ww[2]*G-ww[3]*C,5)) for name,R,F,G,C in options]
    scores=sorted(scores,key=lambda x:-x[1])
    scen += [dict(scenario=f'SCENARIO_{i+1}',weight_R=ww[0],weight_F=ww[1],weight_G=ww[2],lambda_C=ww[3],action=name,score=score,rank=j+1,synthetic='YES') for j,(name,score) in enumerate(scores)]
random.seed(20261101)
N=20000; winners=Counter();score_samples=defaultdict(list)
for _ in range(N):
    z=[random.gammavariate(1,1) for i in range(3)]; nz=sum(z); w=[v/nz for v in z]; penalty=random.uniform(0,.6)
    scored=[(name,w[0]*r+w[1]*f+w[2]*g-penalty*c) for name,r,f,g,c in options]
    winners[max(scored,key=lambda x:x[1])[0]]+=1
    for name,score in scored: score_samples[name].append(score)
win_rows=[dict(action=name,synthetic_win_frequency=round(winners[name]/N,5),samples=N,weight_sampling='Dirichlet(1,1,1) for R/F/G, lambda_C Uniform(0,0.6); uncalibrated') for name,*_ in options]
for filename,rows in [('weighting_scenarios.csv',scen),('weighting_winner_frequency.csv',win_rows)]:
    with open(BASE/filename,'w',encoding='utf-8',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
# chart 1: criterion tradeoff example
labels=[s['scenario'] for s in scen[::4]]
fig,ax=plt.subplots(figsize=(11,6));
for name,*_ in options:
    vals=[next(s['score'] for s in scen if s['scenario']==lab and s['action']==name) for lab in labels]
    ax.plot(labels,vals,marker='o',label=name)
ax.set_title('Illustrative FinAgent score sensitivity — hypothetical actions and weights');ax.set_ylabel('Unitless illustrative score');ax.legend(loc='best',fontsize=8);ax.grid(alpha=.2);fig.tight_layout();fig.savefig(BASE/'Sensitivity_Scenario_Comparison.png',dpi=180);plt.close(fig)
# chart 2: win-frequency summary
fig,ax=plt.subplots(figsize=(10,6));names=[r['action'] for r in win_rows]; values=[r['synthetic_win_frequency'] for r in win_rows];ax.barh(names,values);ax.set_xlim(0,1);ax.set_xlabel('Share of sampled hypothetical parameter settings');ax.set_title('Illustrative rankings: 20,000 uncalibrated weight draws');ax.invert_yaxis();fig.tight_layout();fig.savefig(BASE/'Sensitivity_Winner_Frequency.png',dpi=180);plt.close(fig)
# chart 3: distribution 5-95th percentile for each action across scenarios
fig,ax=plt.subplots(figsize=(10,6));
for i,(name,*_) in enumerate(options):
    vals=sorted(score_samples[name]);lo=vals[int(.05*N)];hi=vals[int(.95*N)];median=statistics.median(vals)
    ax.plot([lo,hi],[i,i],linewidth=6,alpha=.55);ax.plot(median,i,'o')
ax.set_yticks(range(len(options)),[o[0] for o in options]);ax.set_xlabel('Illustrative score (5th–95th percentile, dot = median)');ax.set_title('Synthetic score intervals under varied weighting assumptions');fig.tight_layout();fig.savefig(BASE/'Sensitivity_Score_Intervals.png',dpi=180);plt.close(fig)

# Database referential and controlled-value audit; allow PENDING_ORIGINAL_REOPEN as non-verified.
errs=[]
primary={'sources':'source_id','financial_claims':'claim_id','claim_source_mapping':'mapping_id','financial_rules':'rule_id','financial_formulas':'formula_id','evidence_gaps':'gap_id','action_candidates':'action_id','action_evidence_mapping':'mapping_id','action_rule_mapping':'mapping_id','action_formula_mapping':'mapping_id','agent_knowledge_mapping':'mapping_id','verification_audit':'audit_id','version_history':'version_id'}
ids={t:set(row[key] for row in rows) for t,(key,rows) in ((k,(primary[k],v)) for k,v in D.items())}
for t,rows in D.items():
    if len(ids[t])!=len(rows): errs.append('duplicate IDs '+t)
    if any(not x.get(primary[t]) for x in rows):errs.append('empty PK '+t)
checks=[('financial_claims','source_primary_id','sources'),('claim_source_mapping','source_id','sources'),('claim_source_mapping','claim_id','financial_claims'),('financial_formulas','source_id','sources'),('action_evidence_mapping','source_id','sources'),('action_evidence_mapping','claim_id','financial_claims'),('action_evidence_mapping','action_id','action_candidates'),('action_evidence_mapping','claim_source_mapping_id','claim_source_mapping'),('action_rule_mapping','rule_id','financial_rules'),('action_rule_mapping','action_id','action_candidates'),('action_formula_mapping','formula_id','financial_formulas'),('action_formula_mapping','action_id','action_candidates')]
for table,col,target in checks:
    for row in D[table]:
        if row[col] not in ids[target]:errs.append(f'broken {table}.{col}: {row[col]}')
for row in D['action_candidates']:
    if row['status'] not in ['RESEARCH_CANDIDATE','PENDING_REVIEW','APPROVED','REJECTED']:errs.append('bad action status')
    if row['approved_for_production']!='NO':errs.append('inadvertent action approval '+row['action_id'])
    if row['action_id'] not in {x['action_id'] for x in D['action_evidence_mapping']} and row['evidence_status']!='RESEARCH_GAP':errs.append('unmapped action '+row['action_id'])
    for c in row['supporting_claim_ids'].split(','):
        if c not in ids['financial_claims']:errs.append('bad claimed action '+row['action_id'])
for c in D['financial_claims']:
    if c['verification_status']=='VERIFIED' and not any(m['claim_id']==c['claim_id'] and m['verification_status']=='VERIFIED' and m['exact_location'] and m['source_url'] for m in D['claim_source_mapping']): errs.append('unsupported VERIFIED claim '+c['claim_id'])
for r in D['financial_rules']:
    for c in r['supporting_claim_ids'].split(','):
        if c and c not in ids['financial_claims']: errs.append('rule missing claim '+r['rule_id'])
    for f in r['supporting_formula_ids'].split(','):
        if f and f not in ids['financial_formulas']: errs.append('rule missing formula '+r['rule_id'])
for m in D['agent_knowledge_mapping']:
    if m['record_id'] not in ids['action_candidates']: errs.append('agent bad action')
assert not errs,errs

for k,rows in D.items():
    with open(BASE/(k+'.csv'),'w',newline='',encoding='utf-8-sig') as f:
        cw=csv.DictWriter(f,fieldnames=list(rows[0]));cw.writeheader();cw.writerows(rows)
with open(BASE/'FinAgent_Normalized_Database.json','w',encoding='utf-8') as f:json.dump({'metadata':{'version':'0.1-rebuilt','date':DATE,'source_of_truth':'tables in this JSON / corresponding CSV','original_research_zip_recovered':False,'status':'RECONSTRUCTED_PARTIAL_CORPUS'},'tables':D},f,indent=2,ensure_ascii=False)

# 10-sheet materialized view via artifact_tool (no openpyxl/pandas).
views=[('Sources','sources'),('Verified_Claims','financial_claims'),('Evidence_Mapping','claim_source_mapping'),('Financial_Rules','financial_rules'),('Financial_Formulas','financial_formulas'),('Action_Catalog','action_candidates'),('Action_Evidence_Mapping','action_evidence_mapping'),('Agent_Knowledge_Mapping','agent_knowledge_mapping'),('Evidence_Gaps','evidence_gaps'),('Quality_Audit','verification_audit')]
wb=Workbook.create()
for sheetname,tab in views:
    ws=wb.worksheets.add(sheetname); rows=D[tab]; headers=list(rows[0]); matrix=[headers]+[[str(r.get(h,'')) for h in headers] for r in rows]
    ws.get_range_by_indexes(0,0,len(matrix),len(headers)).values=matrix
    ws.get_range_by_indexes(0,0,1,len(headers)).format={'fill':'#19324A','font':{'bold':True,'color':'#FFFFFF','size':10},'row_height':29,'wrap_text':True,'vertical_alignment':'center'}
    ws.freeze_panes.freeze_rows(1)
    # Avoid excessively wide columns; preserve detailed text for formula bar; wrap where useful.
    for j,h in enumerate(headers):
        width=22
        if h in ['claim','action_template','description','rule_text','expression','eligibility_conditions','rejection_conditions','safety_requirements','required_pi_inputs','exact_location','exact_sections_reviewed','finding','limitations','assumptions_limits']:width=38
        if h in ['canonical_url','source_url']:width=34
        if h in ['title','name']:width=35
        if h in ['link']:width=16
        ws.get_range_by_indexes(0,j,len(matrix),1).format.column_width=width
    ws.get_range_by_indexes(1,0,len(rows),len(headers)).format.row_height=25
    ws.tables.add(ws.get_range_by_indexes(0,0,len(matrix),len(headers)),True,'T'+sheetname.replace('_',''))
    if 'status' in headers:
        j=headers.index('status');ws.get_range_by_indexes(1,j,len(rows),1).format.column_width=23
    # Set working hyperlink formula for source and action rows in extra right column; source URL remains visible as text.
    if tab in ['sources','action_candidates','claim_source_mapping','action_evidence_mapping']:
        idx=len(headers)
        ws.get_range_by_indexes(0,idx,1,1).values=[['Open_Source_URL']]
        ws.get_range_by_indexes(0,idx,1,1).format={'fill':'#19324A','font':{'bold':True,'color':'#FFFFFF'},'row_height':29}
        for ri,row in enumerate(rows,2):
            url=row.get('canonical_url') or row.get('source_url') or ''
            if url: ws.get_range_by_indexes(ri-1,idx,1,1).formulas=[[f'=HYPERLINK("{url}","Open source")']]
        ws.get_range_by_indexes(0,idx,len(rows)+1,1).format.column_width=20

out=BASE/'FinAgent_Master_Knowledge_Base.xlsx'
SpreadsheetFile.export_xlsx(wb).save(str(out))

# Verify xlsx actual zipped office package and read sizes through re-import, not just file.exists.
with zipfile.ZipFile(out) as z:
    xl_names=z.namelist(); assert 'xl/workbook.xml' in xl_names and len([n for n in xl_names if n.startswith('xl/worksheets/sheet') and n.endswith('.xml')])==10
assert out.stat().st_size>25000
# Excel is exported; data are re-opened in CSV / JSON to assert round-trip.
with open(BASE/'FinAgent_Normalized_Database.json',encoding='utf-8') as f: reloaded=json.load(f)
for k in D:
    with open(BASE/(k+'.csv'),encoding='utf-8-sig',newline='') as f:assert len(list(csv.DictReader(f)))==len(reloaded['tables'][k])

quality={
 'artifact_date':DATE,'deliverable_version':'0.1-rebuilt','prior_export_found':False,
 'counts':{k:len(v) for k,v in D.items()},
 'claim_status_counts':dict(Counter(x['verification_status'] for x in D['financial_claims'])),
 'source_retrieval_status_counts':dict(Counter(x['retrieval_evidence_status'] for x in D['sources'])),
 'actions_by_category':dict(Counter(x['category'] for x in D['action_candidates'])),
 'actions_production_approved':sum(x['approved_for_production']=='YES' for x in D['action_candidates']),
 'agents_covered':sorted(set(x['agent_name'] for x in D['agent_knowledge_mapping'])),
 'referential_integrity_errors':errs,'missing_old_database':'Original referenced ZIP and its rows unavailable; reconstructed new stable IDs, no deceptive preservation of previous data.',
 'source_verification_scope':'Original-source text or snippets returned from institution/publisher pages. EUR-Lex original page blocked for direct reopen; associated claims not verified.',
 'sensitivity_parameters':'Synthetic hypothetical feature values; sample weights R/F/G Dirichlet(1,1,1), effort penalty Uniform(0,.6), 20000 samples fixed seed.',
 'critical_limitations':['Not 40-60 verified sources','No full audit of missing original tables','No real-user efficacy evidence','No approved production actions','No empirically calibrated weights','Some legal primary law requires reopening','No complete launch-jurisdiction regulatory modules'],
 'artifact_checks':{'xlsx_office_zip':'PASS','xlsx_10_sheets':'PASS','csv_json_rowcounts':'PASS','foreign_keys':'PASS','charts_created':'PASS' if all((BASE/n).stat().st_size>1000 for n in ['Sensitivity_Scenario_Comparison.png','Sensitivity_Winner_Frequency.png','Sensitivity_Score_Intervals.png']) else 'FAIL'}
}
with open(BASE/'Quality_Audit_Report.json','w') as f:json.dump(quality,f,indent=2)
with open(BASE/'DATA_DICTIONARY.md','w') as f:
    f.write('# FinAgent database data dictionary — reconstructed partial corpus\n\n')
    f.write('These are generated source-of-truth **CSV/JSON** tables, not the inaccessible prior deep-research ZIP. Workbook is a materialized export.\n\n')
    for t,rows in D.items():
        f.write(f'## {t} — {len(rows)} rows\n\nPrimary key: `{primary[t]}`. Columns: '+', '.join('`'+a+'`' for a in rows[0])+'.\n\n')
    f.write('Foreign keys: '+', '.join(f'`{a}.{b}` → `{c}.{primary[c]}`' for a,b,c in checks)+'.\n\n')
    f.write('VERIFIED claims have at least one directly retrieved original publisher/institutional source excerpt and a precise section. PENDING_ORIGINAL_REOPEN claims are excluded from the verified layer.\n')
with open(BASE/'README_FIRST.md','w') as f:
    f.write('''# FinAgent — actual generated database delivery (2026-11-01)\n\n## What is in this package\n\n- `FinAgent_Master_Knowledge_Base.xlsx`: **real populated** Excel workbook, 10 required sheets.\n- 13 relational CSV exports and `FinAgent_Normalized_Database.json`: same canonical rows.\n- `Sensitivity_Scenario_Comparison.png`, `Sensitivity_Winner_Frequency.png`, `Sensitivity_Score_Intervals.png`: **actual generated** charts; `weighting_scenarios.csv` and `weighting_winner_frequency.csv` provide numerical scenarios.\n- `Quality_Audit_Report.json`, `DATA_DICTIONARY.md`, and `build_finagent.py` for reconstruction.\n\n## Critical provenance and limitations\n\nThe earlier deep-research-generated ZIP was NOT present among accessible uploads. No claims are made about verifying or preserving those inaccessible CSV records. This is a new and intentionally **partial** reconstructed dataset grounded in the accompanying research report plus original institutional and academic content retrieved on 2026-11-01. Stable IDs are new within this rebuild.\n\nOnly directly checked claims are marked VERIFIED. Legal claims where EUR-Lex blocked a full original-page reopen are `PENDING_ORIGINAL_REOPEN`. Source titles and original URLs are included per row. A web result snippet was reviewed for some original publishers; full article text was not always available. This is a source-text review, **not a comprehensive scientific peer review**.\n\nAll 26 actions are templates, not approved instructions, and none may be automatically executed in production. Proposed rules and most formulas are product engineering and require review. Financial weights and friction functions are NOT empirically validated. All sensitivity figures use **hypothetical feature values**, random but reproducibly seeded weight variation, not real customer data.\n\nThe research remains below 40-60 sources and is not ready for autonomous financial advice. See Evidence_Gaps and `Quality_Audit_Report.json`.\n\n## Relational pathways\n\n`action_candidates.action_id` → `action_rule_mapping.rule_id` → `financial_rules.supporting_claim_ids` → `claim_source_mapping.source_id` → `sources.canonical_url`. There is also direct `action_evidence_mapping` for each action-claim-source link. A separate `action_formula_mapping` joins calculations.\n\n## How to inspect\n\nOpen the `.xlsx` and filter the first header row. Use `Open_Source_URL` links to open the original source pages. For machine processing, load `FinAgent_Normalized_Database.json` or per-table CSV. Inspect candidate action safety flags before integration.\n''')

# One final ZIP (do not archive itself)
zip_path=Path('/mnt/data/FinAgent_Final_Database_Package.zip')
with zipfile.ZipFile(zip_path,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=8) as z:
    for fp in sorted(BASE.iterdir()):
        if fp.is_file(): z.write(fp,arcname=fp.name)
with zipfile.ZipFile(zip_path) as z:
    assert z.testzip() is None
    for essential in ['FinAgent_Master_Knowledge_Base.xlsx','sources.csv','financial_claims.csv','action_candidates.csv','FinAgent_Normalized_Database.json','Sensitivity_Scenario_Comparison.png','Sensitivity_Winner_Frequency.png','Sensitivity_Score_Intervals.png']:
        assert essential in z.namelist(),essential
    names=z.namelist()
print(json.dumps({'zip_path':str(zip_path),'zip_size':zip_path.stat().st_size,'xlsx_size':out.stat().st_size,'number_files_in_zip':len(names),'counts':quality['counts'],'claim_statuses':quality['claim_status_counts'],'source_statuses':quality['source_retrieval_status_counts'],'verification':quality['artifact_checks']},indent=2))
