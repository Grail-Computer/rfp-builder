import React from 'react';
import { Document, Page, Fixed, serialize } from '@formepdf/react';
import { renderPdf } from '@formepdf/core';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Heading } from './registry/bases/forme/components/heading/heading';
import { Text } from './registry/bases/forme/components/text/text';
import { Section } from './registry/bases/forme/components/section/section';
import { PdfcnThemeProvider } from './registry/bases/forme/components/theme-provider';
import { PageNumber } from './registry/bases/forme/components/page-number/page-number';
import { assess, sections } from './engine';

export async function pdf(raw:unknown){
  const a=assess(raw);const b=a.brief;
  const doc=<PdfcnThemeProvider><Document title={b.title} author={b.organization||'Buyer'}>
    <Page size="A4" style={{padding:48}}>
      <Text variant="sm" color="#20594f">REQUEST FOR PROPOSAL</Text>
      <Heading level={1}>{b.title}</Heading>
      <Text>{b.organization||'Organization not yet specified'}</Text>
      <Text variant="sm">Version {b.version} · {b.date} · {a.status}</Text>
      <Section variant="callout"><Text>Describe the business you want to operate. Define the work, the people, the exceptions, and the evidence that proves it runs.</Text></Section>
      <Heading level={2}>Document control</Heading>
      <Text>{a.answered} of {a.total} discovery fields answered. This is a buyer review draft. Facts, assumptions, acceptance criteria and authority to issue remain subject to review.</Text>
      <Heading level={2}>Contents</Heading>
      {sections(b).map(s=><Text key={s.id} variant="xs" noMargin style={{fontSize:9,lineHeight:1.15}}>{s.title}</Text>)}
    </Page>
    <Page size="A4" style={{padding:48}}>
      <Text variant="sm" color="#20594f">{b.title} / {b.version}</Text>
      {sections(b).map(s=><Section key={s.id} spacing="sm">
        <Heading level={2} style={{fontSize:18,marginTop:10,marginBottom:8,fontFamily:"Times-Roman"}}>{s.title}</Heading>
        {s.body.split(/\n\n+/).map((p,i)=><Text key={i} variant="sm" style={{fontSize:10,lineHeight:1.45,marginBottom:8}}>{p}</Text>)}
      </Section>)}
      <Fixed position="footer"><PageNumber format="Page {page} / {total}" /></Fixed>
    </Page>
    <Page size="A4" style={{padding:48}}><Heading level={2}>Vendor response and open decisions</Heading>
      <Text variant="sm">Respond to each atomic requirement with Comply / Partial / Exception / Not offered. Include evidence, delivery dependency, assumption and cost impact. Separate implementation, recurring usage, hosting, support, migration and optional work.</Text>
      <Text variant="sm">Requirement matrix: ID | Requirement | Priority | Source/version | Owner | Acceptance evidence | Vendor response.</Text>
      {!b.requirements.length&&<Text variant="sm">OPEN — Atomic requirements and acceptance matrix have not been supplied.</Text>}
      {b.requirements.map(r=><Section key={r.id} variant="card">
        <Heading level={3}>{r.id} · {r.priority.toUpperCase()}</Heading>
        <Text variant="sm">{r.requirement}</Text>
        <Text variant="xs">Source: {r.source || 'Not specified'} · Owner: {r.owner || 'Not assigned'}</Text>
        <Text variant="sm">Acceptance: {r.acceptance || 'OPEN — acceptance evidence required'}</Text>
        <Text variant="xs">Vendor: Comply / Partial / Exception / Not offered. Attach evidence and cost impact.</Text>
      </Section>)}
      {!!b.criteria.length&&<Heading level={3}>Weighted evaluation</Heading>}
      {b.criteria.map((c,i)=><Text key={i} variant="sm">{c.criterion} — {c.weight}%. Evidence: {c.evidence}</Text>)}
      <Heading level={3}>Open decisions</Heading>
      <Text variant="sm">{a.missing.length?a.missing.join(', '):'All fields answered. Buyer approval and evidence review remain required.'}</Text>
      {b.openDecisions.map((d,i)=><Text key={i} variant="sm">{d.question} · Owner: {d.owner||'unassigned'}. Impact: {d.impact}</Text>)}
      {b.includeGrail&&<Text variant="sm">Optional discovery review: Grail · https://grail.computer. You may compare vendors independently. No data is sent to Grail by this tool.</Text>}
    </Page>
  </Document></PdfcnThemeProvider>;
  return Buffer.from(await renderPdf(JSON.stringify(serialize(doc))));
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  const [, ,input,output]=process.argv;
  if(!input||!output){console.error('Usage: npm run render -- brief.json output.pdf');process.exit(1);}
  const bytes=await pdf(JSON.parse(await readFile(input,'utf8')));
  await mkdir(dirname(output),{recursive:true});await writeFile(output,bytes);
  console.log(`Saved ${output} (${bytes.length} bytes)`);
}
