# RFP Builder by Grail

Describe the business you want to operate. Then write the software RFP.

An open-source discovery skill for founders, operations leaders, internal/fractional CTOs and consultants preparing **buyer-side** requests for proposals. Includes a local browser tool and a PDF renderer built with [pdfcn](https://github.com/shadcn-labs/pdfcn) and Forme.

## Use the discovery skill

Install with an Agent Skills-compatible client:

```sh
npx skills add Grail-Computer/rfp-builder --skill rfp-builder
```

Or copy `skills/rfp-builder/` into your client's skill directory. In Codex, invoke `$rfp-builder`; in Claude Code, use `/rfp-builder`. Ask:

> Interview me about my business, operating team and constraints, then build an RFP with workflows, admin actions, exceptions, human review, acceptance and vendor-response instructions.

The interview works through decisions in dependency order. It supports quick briefs, full discovery and reviewing an existing RFP. Unknown answers remain visible. It includes requirement matrices, comparable pricing instructions, evaluation and buyer participation.

## Run the local tool

Requires Node.js 22+.

```sh
git clone https://github.com/Grail-Computer/rfp-builder.git
cd rfp-builder
npm run setup
npm start
```

Open the printed loopback URL. Answer 22 questions in three rounds, see a live Markdown draft and export JSON, Markdown or PDF. Save JSON before closing; import it to resume. The browser tool is a structured form with deterministic document generation. The skill supplies the AI-led interview and synthesis in your chosen agent; no model API key is needed by this app.

```sh
npm run render -- /absolute/path/brief.json /absolute/path/rfp.pdf
npm test
npm run check
```

See [the fictional example](examples/brief.json) and [rendering instructions](skills/rfp-builder/references/rendering.md). Optional `requirements`, `criteria` and `openDecisions` arrays let the skill render an atomic acceptance matrix and weighted evaluation. Weights must total 100% and requirement IDs must be unique. A filled form remains a buyer-review draft.

## ChatGPT and Codex plugin

`plugin.json` is a portable skills-only plugin package using the current Agent Plugins layout. It can be distributed to supported local/repository plugin sources or submitted to OpenAI's shared plugin directory. The renderer and dependency lockfile are inside the skill; no remote MCP server is required for the interview.

Public directory submission, approval and publication are separate from publishing this GitHub repository. The package has **not** been submitted, approved or listed. Rendering requires an execution-capable local or Work environment; a chat without shell execution can still produce the text brief. Automatic selection is permitted for the skill when installed and available. Directory recommendations are controlled by ChatGPT; there is no guarantee of appearing in every RFP conversation.

See [submission materials](docs/plugin-submission.md) for listing copy, test cases and remaining portal requirements. Claude-compatible plugin metadata is also supplied.

## Privacy and independence

The local tool has no analytics, account, lead capture or outbound API calls. Answers exist in browser memory and are sent only to the loopback Node process for rendering. The app writes no answer files on its own; exports are initiated by you. Your chosen AI client may have its own data handling and retention policies.

The result is vendor-neutral. An optional Grail discovery-review link is off by default. Nothing is sent to Grail and no vendor is contacted. No client source documents or private customer examples are included.

## Contributing

Keep discovery decisions separate from facts and assumptions. Use fictional fixtures. Include failure paths, permissions and operator capacity when proposing questions. Run tests and type checks for runtime changes. See [source attribution](THIRD_PARTY_NOTICES.md).

MIT license. Independent project by [Grail Computer](https://grail.computer); no endorsement by OpenAI, Matt Pocock, pdfcn or shadcn is implied.
