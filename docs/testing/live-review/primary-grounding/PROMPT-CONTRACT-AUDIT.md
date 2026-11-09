# System prompt and runtime contract audit

Reviewed the eleven shared beta prompts and the separate local prototype Assistant. D-021 changes the primary generation and checking boundary.

- **Classification v3.** Reads transaction amounts, currencies and dates from the input. Returns classification fields only. The application retains the original transaction and validates its ID.
- **Pattern v2.** Returns findings, limitations and questions with observation IDs. The application builds the stored summary from validated findings. It labels unconfirmed interpretations separately.
- **Behavior v3.** Returns evidence-linked findings and questions about stated goals. The application builds the stored summary from validated findings. Financial actions belong to the Primary Generator.
- **Debt v3.** Returns debt IDs and focus labels. The application writes the explanation using deterministic figures. The previous prompt asked the model to explain the report while its schema only accepted labels.
- **Primary v8.** Returns three structured proposals from PI and applicable verified AS. Directly supportive claims can be cited. A safe PI-grounded review may use an empty claim list. Clarifications use distinct recorded information gaps. Explicit ISO dates must appear in cited PI.
- **Semantic Checker v5.** Compares proposals with PI and all applicable verified excerpts, including the association between dates and individual facts. A contradiction requires a specific supplied reference. An unavailable check or missing material fact yields NEEDS_DATA. The prompt receives no execution options from the catalog.
- **Catalog Selector v3.** Returns selected IDs and an empty rationale map for schema compatibility. The runtime uses the existing candidate rationale and amounts. The selector is called only when all three primary proposals are REJECTED.
- **Complexity v3.** Returns four contextual effort factors. The code applies the scoring formula and uses catalog baselines when factors are UNKNOWN. Baselines are not facts about a user's situation.
- **Conversation Memory v2.** Returns cited entries and a draft summary. The application constructs the stored summary from validated entries. Memory remains contextual.
- **Assistant Records v3.** Returns an intent and selected fact IDs. The application renders those facts or routes a general question to the second call.
- **Assistant General v2.** Receives the current question and returns plain text for general or navigation requests. It receives no financial records.
- **Local prototype Assistant.** Receives a minimized snapshot, decision summary and selected catalog evidence. It returns text and the application assembles reference IDs. This is a separate local question endpoint.

The runtime validates output structure and reference IDs. Semantic accuracy still depends on the model and the supplied evidence.
