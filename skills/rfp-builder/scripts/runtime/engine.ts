import { z } from 'zod';

export const questions = [
  {id:'problem', round:0, title:'What business problem must change?', hint:'Describe the work, who suffers, a recent example, and the cost of leaving it unchanged.'},
  {id:'outcome', round:0, title:'What would success look like?', hint:'Give the current baseline, target, measurement window, and person who owns the result. Unknown values can stay open.'},
  {id:'workflow', round:0, title:'Walk through a real case today', hint:'From request to completion: actors, tools, handoffs, decisions, outputs, and where work gets stuck.'},
  {id:'scale', round:0, title:'How much work will it handle?', hint:'Current and expected volume, peak bursts, concurrent users, regions, languages, file sizes and seasonal changes. Include units.'},
  {id:'team', round:0, title:'Who will operate it?', hint:'One operator or a team? Headcount, shifts, hours, skills, backup cover, and which work each person owns.'},
  {id:'constraints', round:0, title:'What constraints are real?', hint:'Budget/currency, deadline and reason, existing systems, mandatory procurement rules, and decisions already fixed.'},
  {id:'roles', round:1, title:'Who can see and change what?', hint:'Customers, operators, finance, supervisors and administrators. Organization boundaries, record ownership, read/write/approve/export rights.'},
  {id:'future', round:1, title:'How should a case work after launch?', hint:'Describe the desired journey in business terms. Keep essential current behavior, deliberate changes and retirements separate.'},
  {id:'exceptions', round:1, title:'Describe the worst ordinary working day', hint:'Missing data, no match, duplicate request, disputes, provider outage, partial completion, expired consent and queue overflow. Name owners and deadlines.'},
  {id:'admin', round:1, title:'What must the operations console let people do?', hint:'Search, assign/reassign, approve/reject, retry, correct, override, configure, bulk act, reconcile and export. For each: permission, reason, audit, undo and escalation.'},
  {id:'automation', round:1, title:'What may software or AI decide?', hint:'Separate rules, AI suggestions and autonomous actions. For each name consequence, evidence shown, human decision owner, fallback and pause control. No invented confidence target.'},
  {id:'capacity', round:1, title:'Can the team absorb review work?', hint:'Estimated cases/day × review fraction × minutes/review. Compare to staffed review minutes. State estimates and include peak demand and absence cover.'},
  {id:'integrations', round:1, title:'What must connect?', hint:'Systems, owners, read/write operations, source of truth, API access, rate limits, retry/duplicate rules, failure recovery and reconciliation.'},
  {id:'data', round:1, title:'What data exists and where may it go?', hint:'Data classes, consent, jurisdictions/residency, processing/storage/logs/backups, retention/deletion, model-provider access and training/retention restrictions. Name unconfirmed legal decisions.'},
  {id:'launch', round:2, title:'What is required at go-live?', hint:'Testable journeys and reconciled data, access, training, monitoring, rollback and named sign-off. Specify optional later scope and exclusions.'},
  {id:'acceptance', round:2, title:'How will you prove the requirements work?', hint:'For each journey: input, expected output/state, failure/denial case, evidence, owner and test window. For AI: reference cases, error costs, cohorts and human review burden.'},
  {id:'uat', round:2, title:'Who can test, and when?', hint:'Named business roles, hours/week, dates, approval turnaround, sample-data owner and dependencies. Do not assume a fixed acceptance window.'},
  {id:'migration', round:2, title:'How will the business move safely?', hint:'Inventory, mappings, rehearsal, validation totals, cohorts, downtime tolerance, cutover authority and rollback criteria. Say if this is a new build.'},
  {id:'operations', round:2, title:'Who owns it after launch?', hint:'Service hours, incident severity/response needs, monitoring, backups and restoration tests, deployment access, documentation, code/data ownership and exit/handover.'},
  {id:'commercial', round:2, title:'How should vendors price comparable work?', hint:'Implementation, recurring software/model usage, hosting, support, migration, optional scope; expected volume and sensitivity; buyer dependencies and estimate assumptions.'},
  {id:'evaluation', round:2, title:'How will you choose?', hint:'Mandatory pass/fail gates, weighted scored criteria totaling 100%, evidence/demo expectations, decision owners and conflict rules. Keep vendor names out of criteria.'},
  {id:'procurement', round:2, title:'What are the response instructions?', hint:'Document version, Q&A dates/timezone, response deadline, format, submission route, common answers/addenda, required compliance matrix and proposal validity.'},
] as const;

const ids = new Set<string>(questions.map(q=>q.id));
const headings:Record<string,string>={problem:'Business problem',outcome:'Outcomes and measurement',workflow:'Current business workflow',scale:'Workload and scale',team:'Operating team and coverage',constraints:'Constraints and dependencies',roles:'Roles, permissions and boundaries',future:'Desired workflows',exceptions:'Exceptions and recovery',admin:'Operations console and admin actions',automation:'Automation and AI authority',capacity:'Human review capacity',integrations:'Integrations and sources of truth',data:'Data and security boundaries',launch:'Launch scope and exclusions',acceptance:'Acceptance and qualification',uat:'Buyer testing commitment',migration:'Migration, cutover and rollback',operations:'Support, ownership and exit',commercial:'Commercial response',evaluation:'Vendor evaluation',procurement:'Submission instructions'};
export const BriefSchema = z.object({
  title:z.string().trim().min(1).max(200),
  organization:z.string().trim().max(200).default(''),
  version:z.string().max(40).default('0.1'),
  date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).default(()=>new Date().toISOString().slice(0,10)),
  answers:z.record(z.string().refine(k=>ids.has(k),'Unknown question ID'),z.string().max(16000)),
  includeGrail:z.boolean().default(false),
  requirements:z.array(z.object({id:z.string().min(1).max(40),requirement:z.string().min(1).max(8000),priority:z.enum(['must','should','optional','proposed']),source:z.string().max(500),owner:z.string().max(200),acceptance:z.string().max(8000)})).max(200).default([]),
  criteria:z.array(z.object({criterion:z.string().min(1).max(500),weight:z.number().min(0).max(100),evidence:z.string().max(2000)})).max(30).default([]),
  openDecisions:z.array(z.object({question:z.string().min(1).max(2000),owner:z.string().max(200),impact:z.string().max(2000)})).max(100).default([]),
}).superRefine((b,ctx)=>{
  if(b.criteria.length&&Math.abs(b.criteria.reduce((n,c)=>n+c.weight,0)-100)>.001)ctx.addIssue({code:'custom',message:'Evaluation weights must total 100%',path:['criteria']});
  if(new Set(b.requirements.map(r=>r.id)).size!==b.requirements.length)ctx.addIssue({code:'custom',message:'Requirement IDs must be unique',path:['requirements']});
});
export type Brief = z.infer<typeof BriefSchema>;
export function assess(raw: unknown){
  const brief=BriefSchema.parse(raw);
  const missing=questions.filter(q=>!brief.answers[q.id]?.trim());
  return {brief, missing:missing.map(q=>q.id), status:missing.length?'DISCOVERY DRAFT':'BUYER REVIEW REQUIRED', answered:questions.length-missing.length,total:questions.length};
}
export function frontier(raw:unknown){
  const {brief}=assess(raw);
  const round=questions.find(q=>!brief.answers[q.id]?.trim())?.round;
  return round===undefined?[]:questions.filter(q=>q.round===round&&!brief.answers[q.id]?.trim());
}
export function sections(raw:unknown){
  const {brief}=assess(raw);
  return questions.map((q,i)=>({id:q.id,title:`${i+1}. ${headings[q.id]}`,body:brief.answers[q.id]?.trim()||`OPEN — Buyer input required. ${q.hint}`}));
}
export function markdown(raw:unknown){
  const a=assess(raw);const b=a.brief;
  const cell=(s:string)=>s.replaceAll('|','\\|').replaceAll('\n','<br>');
  const matrix=b.requirements.length?'\n| ID | Requirement | Priority | Source | Owner | Acceptance | Vendor response |\n| --- | --- | --- | --- | --- | --- | --- |\n'+b.requirements.map(r=>`| ${[r.id,r.requirement,r.priority,r.source,r.owner,r.acceptance,'Comply / Partial / Exception / Not offered; evidence'].map(cell).join(' | ')} |`).join('\n'):'OPEN — Atomic requirements and buyer acceptance matrix have not been supplied.';
  const criteria=b.criteria.length?'\n## Weighted evaluation\n\n'+b.criteria.map(c=>`- ${c.criterion}: ${c.weight}%. Evidence: ${c.evidence}`).join('\n'):'';
  return `# ${b.title}\n\n${b.organization||'Organization not yet specified'} · Version ${b.version} · ${b.date}\n\n**${a.status}**\n\nThis document records buyer-provided answers. Completion of fields does not verify facts or authorize issue. Explicit assumptions, contradictions and open decisions should be reviewed by the buyer.\n\n`+sections(b).map(s=>`## ${s.title}\n\n${s.body}\n`).join('\n')+`\n## Requirement and response matrix\n\nRespond to each atomic requirement with Comply / Partial / Exception / Not offered, evidence and cost impact.\n${matrix}\n${criteria}\n## Open decisions\n\n${a.missing.length?a.missing.map(id=>`- ${id}: buyer input required`).join('\n'):'All questionnaire fields answered; buyer review of facts, assumptions, acceptance criteria and issue authority remains required.'}\n`+b.openDecisions.map(d=>`- ${d.question} Owner: ${d.owner||'unassigned'}. Impact: ${d.impact}`).join('\n')+(b.includeGrail?'\n## Optional discovery review\n\nCreated using RFP Builder by Grail. You may independently compare vendors or ask [Grail](https://grail.computer) to review the discovery brief. No data is sent to Grail by this tool.\n':'');
}
