# Discovery question bank

Use the next question that changes a decision. Skip facts established by source material. Ask the buyer to confirm their interpretation when a source is outdated or ambiguous.

## Business and workload

- Which event starts the work? Who needs the result and what happens if it is late or wrong?
- Walk one recent real case from first contact to completion. What did people do outside the current software?
- What is the baseline, desired change, measurement window and result owner?
- Volumes now and at 12–24 months: cases/day, peak hour, concurrency, tenants, files and file size, geographic/language mix. What is measured and what is a forecast?
- Why build custom software? Which commercial tools were tried? Is the goal new capability, replacing a vendor, integration or lower operating burden?
- What deadline is externally fixed? What can move? What budget and currency may vendors use? What operating spend is acceptable?

## People, authority and work

- One operator or a team? Headcount, shifts, skills, hours of coverage, absences and supervisor span?
- Who owns queues, approvals, customer communication, finance and system configuration?
- Which roles can view, create, change, approve, override, delete and export each class of record? Which organization and ownership restrictions apply?
- Can someone approve their own changes? Which actions require another person's review?
- What work should people stop doing, and what judgment should they keep?
- If the only operator is absent, what work can wait and what requires cover?

## Workflows and admin controls

For each essential journey: trigger → inputs → validation → state transitions → decisions → output → reconciliation. Include entry/exit criteria and responsible people.

- Where does the next operator find their work? Who assigns it? What determines priority and overdue escalation?
- Search/filter, saved views, assignment/reassignment, approve/reject, correction, retry/cancel, override, bulk operations, configuration/versioning, reconciliation, exports, customer support and audit history: which are essential?
- For each admin action: permitted role, precondition, preview, reason capture, audit before/after, undo or compensation, and escalation. How will unauthorized attempts behave?
- What happens on duplicates, missing evidence, no match, partial completion, disputes, upstream outages, stale data or queue overload?
- What is the worst ordinary day? How does an operator see that it is happening and recover?

## Automation and AI

- Which steps are deterministic? Which need inference? Which actions can have irreversible consequences?
- Does AI suggest, draft for review or act autonomously? Who may authorize each transition?
- What evidence can the reviewer see? Can they correct the result and preserve the original decision?
- What does a false positive cost? A false negative? Where is abstention preferable?
- What reference cases represent real inputs, languages, customer cohorts and unusual failures? Who labels expected outcomes?
- What error/review burden is acceptable? How will the model/version be qualified and monitored? What stops or rolls it back?
- Review workload: cases/day × review fraction × minutes/review; compare with available operator minutes after other work. Example only: 1,000 × 20% × 4 = 800 review minutes/day. A two-hour allocation cannot cover that. Recompute at peaks and with the operator absent; don't turn the example into the buyer's target.

## Data and integrations

- Classes of data, owner, source of truth, retention, deletion, export and access? What evidence supports consent or another authorized basis?
- Where may processing, permanent storage, logs, backups and support access occur? Is any temporary external processing permitted?
- What do model/provider contracts actually permit for retention and training? Who verifies that? “No training” and “no retention” are separate requirements.
- Systems and owners; APIs/files/webhooks; reads/writes; schema/version; rates; retries; duplicate prevention; reconciliation and manual fallback?
- Which access, samples or provider agreements will the buyer supply, and by when?

## Launch, handover and procurement

- Go-live journeys, data totals, training, monitoring, support cover, rollback and named approvers?
- Existing behavior: keep/change/retire/unknown. Which baseline documents or masked replays support it?
- UAT people, hours/week, windows and decision turnaround? How does a missed buyer dependency change the schedule?
- Migration inventory, mappings, rehearsal, reconciled totals, cohorts, downtime, cutover authority and rollback conditions?
- Ownership of code, data, documentation, environments, deployment process and credentials? What is required for another supplier to operate it?
- Mandatory vendor gates; weighted criteria; a demonstration against the same scenarios; evidence required; scoring and decision authority?
- Comparable implementation/recurring/usage/hosting/support/migration/optional costs and volume sensitivity?
- Version, deadline/timezone, common Q&A/addenda, response sections, file format, submission route and proposal validity?
