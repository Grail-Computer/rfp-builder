# RFP package

## Document order

1. Document control: buyer, title, version/date, scope, status and issuing authority.
2. Business problem, present workflow, baseline and desired outcomes.
3. Volume and scale profile, assumptions and constraints.
4. Intended operating model: people, coverage, roles, authority and review capacity.
5. Workflows and requirements, grouped by business journey.
6. Admin and human review: queues, actions, evidence, audit, reversibility and failure recovery.
7. Automation/AI boundaries, error costs, evaluation and rollout evidence.
8. Data, security, integrations and buyer-confirmed obligations.
9. Scope: launch essentials, later options, exclusions and current behavior to preserve/change/retire.
10. Delivery, buyer dependencies, testing, migration, launch and rollback.
11. Ownership, support and exit/handover.
12. Vendor response instructions, comparable pricing and evaluation.
13. Open decisions, assumptions, requirement matrix and relevant appendices.

## Atomic requirement example

| ID | Requirement | Priority | Source/status | Owner | Acceptance | Vendor response |
| --- | --- | --- | --- | --- | --- | --- |
| OPS-014 | A permitted supervisor can reassign an overdue case to an eligible operator in the same organization, with a reason and recorded before/after ownership. | Proposed must-have | Discovery Q9 / buyer confirmation pending | Operations lead | Masked case, permitted reassignment succeeds; cross-organization and unauthorized attempts fail; audit retains original owner and reason. | Comply / Partial / Exception / Not offered; evidence and cost impact |

Use separate children for authority, reassignment and audit if they need different acceptance or ownership. This example is not a universal requirement. Do not invent requirements from missing answers.

## Registers

Decision ledger: ID | decision | status | source/version | owner | consequence/dependencies.

Assumption/open issue register: ID | assumption/question | impact | owner | evidence needed | due date if supplied | blocker or deferrable.

Change/addendum register: version | date | author/authority | changed requirements | reason | vendor communication state. Keep operative clarifications separate from superseded attachments.

## Evaluation

First confirm mandatory gates. Then agree scored criteria and weights totaling 100%. Example for discussion only: workflow/operations fit 30%; evidence and acceptance 25%; ownership/support 20%; delivery/dependencies 15%; total cost 10%. The buyer may change all weights. Each criterion needs a 0–5 score description and observable evidence. Request the same workflow demonstration, failure scenario and cost assumptions from every vendor. Never bake the publisher's own product or staffing model into the rubric.

## Ready for issue

The buyer confirms the operative scope, all mandatory decisions, acceptance evidence/owners, achievable UAT commitment, procurement instructions and approval to issue. Record unresolved optional items. Preserve estimates and proposed contractual language as such. A PDF or a field-completion percentage cannot grant readiness.
