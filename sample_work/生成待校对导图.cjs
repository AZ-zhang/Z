const fs=require('fs');
const rows=fs.readFileSync('sample_work/导图识别.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
const data={};
for(const row of rows){if(row.page<24||row.page>140)continue;data[row.page-5]=(row.lines||[]).map(x=>x.text.replace(/\s+/g,'')).filter(Boolean)}
fs.writeFileSync('sample_work/导图文字草稿.js','const draftMapLines='+JSON.stringify(data)+';\nconst escapeDraft=s=>s.replace(/[&<>"\x27]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\\\"":"&quot;","\x27":"&#39;"}[c]));\nfor(const [page,lines] of Object.entries(draftMapLines)){continuedMaps[page]={title:`图谱第 ${page} 页 · 识别草稿`,draft:true,body:`<div class="branch"><strong>机器识别文字 · 顺序与内容待校对</strong><p>此页为自动识别草稿，可能存在错字、遗漏和分支错序；学习时请对照原图。</p>${lines.map(line=>`<p>${escapeDraft(line)}</p>`).join("")}</div>`}}\n');
let f='考研政治学习小样.html',s=fs.readFileSync(f,'utf8');
s=s.replace('<script src="sample_work/导图续篇.js"></script>','<script src="sample_work/导图续篇.js"></script><script src="sample_work/导图续篇17.js"></script><script src="sample_work/导图文字草稿.js"></script>');
s=s.replace("let mapSelect=document.querySelector('#map-page-select');", "let textMapSelect=document.querySelector('#text-map-select');if(textMapSelect)textMapSelect.onchange=()=>go('map-text:'+textMapSelect.value);let mapSelect=document.querySelector('#map-page-select');");
fs.writeFileSync(f,s);
