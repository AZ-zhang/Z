const fs=require('fs');const p='考研政治学习小样.html';let s=fs.readFileSync(p,'utf8');
const key="events.sort((a,b)=>(a.id==='base'?'1927.10.08':a.date).localeCompare(b.id==='base'?'1927.10.08':b.date,'zh-CN',{numeric:true}));\nfunction timelineMapPage";
const extra=`for (const e of events) { if(e.id==='offensive') e.date='1947.07'; if(e.id==='emancipate')e.date='1978.12.13'; if(e.id==='plenum113')e.date='1978.12.18—22'; }
`;
if(!s.includes(key))throw Error('missing key');s=s.replace(key,extra+key);
s=s.replace("excerpt=source===undefined?'':window.timelineSourceSections[source];",`excerpt=source===undefined?'':window.timelineSourceSections[source].replace(/^[^\\r\\n]*(?:\\r?\\n|$)/,'').trim();
if(id==='early')excerpt=excerpt.replace('建档问题','建党问题');
if(id==='july')excerpt=excerpt.replace('民发动秋收起义','发动秋收起义');
if(id==='north')excerpt=excerpt.replace('失败原因：','大革命失败的原因：');
if(id==='land47')excerpt='原资料在此处内容不完整，请结合图谱原页复习。';
if(id==='plenum116')excerpt=excerpt.replace('活的灵魂活的灵魂:', '活的灵魂：');
if(id==='cpc13')excerpt=excerpt.replace('系统闸述','系统阐述');`);
const old=`<h3>相关图谱</h3><p>以下为相关章节的整理内容；图谱覆盖范围可能大于当前事件。</p>\${continuedMaps[n]?continuedMaps[n].body:''}<p><button class="subtle" data-go="map-full:\${n+5}">查看图谱原页（PDF 第 \${n+5} 页）→</button></p>`;
const replacement=`<h3>相关图谱</h3><p>查看相关章节原图，结合标题定位本节点；该页也包含其他知识点。</p><p><button class="subtle" data-go="map-full:\${n+5}">查看图谱相关章节（PDF 第 \${n+5} 页）→</button></p>`;
if(!s.includes(old))throw Error('old not found');s=s.replace(old,replacement);
s=s.replace('以下为资料识别文字，可能存在错字；日期和细节请与原资料核对。','以下根据时间轴资料识别整理；已省略原资料标题中的日期，存在个别识别错误时请以原资料为准。');
fs.writeFileSync(p,s,'utf8');
