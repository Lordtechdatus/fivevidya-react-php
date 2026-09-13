# Our Services card audit

All 24 pages and routes existed before this task. The old navigation registry's existing flag describes an earlier navigation task, not whether a page existed at the start of this change. No pages or routes were duplicated.

The original cards were description-toggle buttons with no navigation. They now use full-card React Router links, accessible labels and descriptions, native new-tab behavior, desktop hover and keyboard focus styling. Touch devices expose the description without requiring an extra tap. Existing shared header, footer, active categories and scroll reset are retained. Custom pages now share focused related links and the paired contact/quote CTA.

| Service | Existing page? | Existing route | Action |
| --- | --- | --- | --- |
| Topic and Research Proposal | Yes | /services/topic-and-research-proposal | Existing / Connected |
| Problem Statement | Yes | /services/problem-statement | Existing / Connected |
| Base Papers | Yes | /services/base-papers | Existing / Connected |
| Chapters Writing | Yes | /chapters-writing | Existing / Connected |
| Questionnaire and Experiments | Yes | /questionnaire-and-experiments | Existing / Connected |
| Implementation | Yes | /implementation | Existing / Connected |
| Analysis | Yes | /analysis | Existing / Connected |
| Editing | Yes | /editing | Existing / Connected |
| Formatting | Yes | /formatting | Existing / Connected |
| Journal Papers | Yes | /journal-papers | Existing / Connected |
| IEEE Papers | Yes | /ieee-papers | Existing / Connected |
| Thought Clearing | Yes | /thought-clearing | Existing / Connected |
| Development Editing | Yes | /development-editing | Existing / Connected |
| Research Design | Yes | /research-design | Existing / Connected |
| Review Article | Yes | /review-article | Existing / Connected |
| Empirical Article | Yes | /empirical-article | Existing / Connected |
| Technical Article | Yes | /technical-article | Existing / Connected |
| Qualitative Data Analysis | Yes | /qualitative-data-analysis | Existing / Connected |
| Quantitative Data Analysis | Yes | /quantitative-data-analysis | Existing / Connected |
| MATLAB Projects | Yes | /services/matlab-projects | Existing / Connected |
| Simulink Projects | Yes | /services/simulink-projects | Existing / Connected |
| Python Projects | Yes | /services/python-projects | Existing / Connected |
| Java Projects | Yes | /services/java-projects | Existing / Connected |
| ANSYS Projects | Yes | /services/ansys-projects | Existing / Connected |

Total Services: 24

Existing Pages Reused: 24

New Pages Created: 0

Broken Links Fixed: 24 non-navigating cards

Remaining Missing Pages: 0

Validation commands: node frontend/scripts/audit-service-cards.mjs; npm --prefix frontend run audit:navigation; npm --prefix frontend run build; node frontend/scripts/check-server.mjs. PHP fallback is exercised locally; Apache rewrite configuration is retained but requires mod_rewrite on the deployment host.
