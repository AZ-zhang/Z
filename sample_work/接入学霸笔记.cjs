const fs=require('fs');
const file='D:/个人/政治/考研政治学习小样.html';
let s=fs.readFileSync(file,'utf8');
function replace(a,b){if(!s.includes(a))throw Error('missing '+a.slice(0,100));s=s.replace(a,b)}
replace("||p.startsWith('event:')", "||p.startsWith('note-page:')||p.startsWith('event:')");
replace('<small>原资料第 2 页 · 4 道练习；后续页面待还原</small>', '<small>原资料第 2 页 · 4 道练习</small>');
replace('打开笔记 →</span></button></div>`}', '打开笔记 →</span></button><button class="choice" data-go="note-page:3"><span class="tag">学霸笔记 / 后续内容</span><h2>原书第 3—14 页</h2><small>原页阅读 · 圈画标记 · 按页翻阅</small><span class="arrow">继续阅读 →</span></button></div>`}');
replace('已按原资料重做第 2 页；后续页面尚待逐页还原。</span><button class="primary" id="startquiz">', '已按原资料重做第 2 页。</span><button class="subtle" data-go="note-page:3">继续阅读第 3 页 →</button><button class="primary" id="startquiz">');
let fn=`function notePage(n){n=Math.max(3,Math.min(14,n));let image=String(n).padStart(2,'0');return header('学霸笔记',\`原资料第 \${n} 页 / 共 14 页 · 原页阅读\`,'notes')+sheet('note-source-'+n,\`<div class="map-source-page"><img class="map-source-image" src="sample_work/学霸笔记原页/page-\${image}.png" width="1565" height="2200" alt="学霸笔记原资料第 \${n} 页"></div>\`,false,\`<div class="actions">\${n===3?'<button class="subtle" data-go="note">← 上一页：第 2 页</button>':\`<button class="subtle" data-go="note-page:\${n-1}">← 上一页</button>\`}<label>跳转到 <select id="note-page-select" aria-label="选择笔记页码">\${Array.from({length:12},(_,i)=>\`<option value="\${i+3}" \${n===i+3?'selected':''}>第 \${i+3} 页</option>\`).join('')}</select></label>\${n<14?\`<button class="primary" data-go="note-page:\${n+1}">下一页 →</button>\`:'<span class="status">已到原资料末页</span>'}</div>\`)}\n`;
replace('function note(){',fn+'function note(){');
replace("page==='note'?note():", "page==='note'?note():page.startsWith('note-page:')?notePage(Number(page.slice(10))||3):");
replace("page==='note'?'note-philosophy-original-2':", "page==='note'?'note-philosophy-original-2':page.startsWith('note-page:')?'note-source-'+page.slice(10):");
replace("let exp=document.querySelector('#export');", "let noteSelect=document.querySelector('#note-page-select');if(noteSelect)noteSelect.onchange=()=>go('note-page:'+noteSelect.value);let exp=document.querySelector('#export');");
fs.writeFileSync(file,s,'utf8');
