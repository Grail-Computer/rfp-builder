import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { assess, markdown, questions } from './engine';
import { pdf } from './render';

const port=Number(process.env.PORT||4318);
const server=createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.headers.origin && req.headers.origin!==`http://127.0.0.1:${port}` && req.headers.origin!==`http://localhost:${port}`){res.writeHead(403);res.end('Origin not allowed');return;}
  try{
    if(req.method==='GET'&&req.url==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(await readFile(new URL('./web.html',import.meta.url)));return;}
    if(req.method==='GET'&&req.url==='/questions'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(questions));return;}
    if(req.method==='POST'&&(req.url==='/draft'||req.url==='/pdf')){
      let bytes=0;const chunks:Buffer[]=[];
      for await(const chunk of req){bytes+=chunk.length;if(bytes>400000){res.writeHead(413);res.end('Brief too large');return;}chunks.push(chunk);}
      const raw=JSON.parse(Buffer.concat(chunks).toString());
      if(req.url==='/pdf'){res.setHeader('Content-Type','application/pdf');res.setHeader('Content-Disposition','attachment; filename="rfp-draft.pdf"');res.end(await pdf(raw));}
      else{res.setHeader('Content-Type','application/json');const a=assess(raw);res.end(JSON.stringify({markdown:markdown(raw),status:a.status,missing:a.missing,answered:a.answered,total:a.total}));}return;
    }
    res.writeHead(404);res.end('Not found');
  }catch{res.writeHead(400);res.end('Invalid brief or document render failed. Check the input and retry.');}
});
server.listen(port,'127.0.0.1',()=>console.log(`RFP Builder: http://127.0.0.1:${port}`));
