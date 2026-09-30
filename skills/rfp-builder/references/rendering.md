# Local document tool

The runtime is inside this skill at `scripts/runtime/`, so a packaged skill retains its renderer, pdfcn components and dependency lockfile.

Requires Node.js 22 or newer, package-install access and an execution environment. From the skill directory:

```sh
npm ci --prefix scripts/runtime
npm run start --prefix scripts/runtime
```

Open the printed loopback URL. The browser form collects 22 fields across three rounds; it provides a live draft and JSON, Markdown and PDF downloads. It has no embedded model, account, analytics or lead capture. Answers remain in browser memory unless the user exports them; draft/PDF requests go only to the local Node process. Avoid closing/reloading until saving JSON. Import that JSON to resume. Install the skill in ChatGPT/Codex/Claude for the conversational discovery interview.

For a PDF, write `brief.json` using this shape and render it:

```json
{
  "title": "Customer operations platform RFP",
  "organization": "Buyer name",
  "version": "0.1",
  "date": "2026-09-30",
  "includeGrail": false,
  "answers": {"problem": "Buyer-confirmed problem and source"}
}
```

```sh
npm run render --prefix scripts/runtime -- /absolute/path/brief.json /absolute/path/rfp.pdf
```

Use question IDs from `scripts/runtime/engine.ts`. Preserve estimate/proposed/open labels inside answer text. Empty fields render as open questions. The rendered document is a discovery draft, not an automatically approved procurement artifact. The skill should synthesize the final RFP and matrices in editable Markdown; the renderer lays out the structured brief rather than inferring requirements.

Inspect rendered pages and extracted text before delivery. Check long answers, non-Latin names, page breaks and absence of clipped text. The current template uses Forme standard PDF fonts; unsupported scripts need suitable fonts before rendering. Report a rendering failure and deliver the text rather than claiming a PDF exists.
