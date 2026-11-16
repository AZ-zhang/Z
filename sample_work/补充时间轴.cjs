const fs=require('fs'); const p='考研政治学习小样.html'; let s=fs.readFileSync(p,'utf8');
s=s.replace(/<script>\r?\n'use strict';/, "<script src=\"sample_work/时间轴补充.js\"></script><script>\n'use strict';");
const needle='for(const [id,v] of Object.entries(laterStudy))eventStudy[id]={background:v[0],focus:v[1]};';
if(!s.includes(needle)||!s.includes('时间轴补充.js')) throw Error('insertion point missing');
s=s.replace(needle,needle+`\nfor(const [id,date,title,body,focus] of window.timelineSupplement){events.push({id,date,title,body:[body]});eventStudy[id]={background:'结合前后历史进程理解这一节点。',focus};}\nevents.sort((a,b)=>(a.id==='base'?'1927.10.08':a.date).localeCompare(b.id==='base'?'1927.10.08':b.date,'zh-CN',{numeric:true}));`);
s=s.replace('笔记、历史时间节点及时间轴与史纲导图的关联仍在整理。','笔记及时间轴与史纲导图的关联仍在整理。').replace('当前仅收录少量历史节点，完整时间轴及史纲导图关联仍在整理和校对。','时间轴依据现有资料并补充重要节点，覆盖 1840—2022 年；与史纲导图的关联仍在整理。').replace('根据《史纲毛中特时间轴》整理；部分日期参照权威党史资料校正','依据现有时间轴资料整理并补充；参照党史资料核对');fs.writeFileSync(p,s);

