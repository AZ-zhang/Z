const fs=require('fs'),p='D:/个人/政治/考研政治学习小样.html';let s=fs.readFileSync(p,'utf8');function rep(a,b){if(!s.includes(a))throw Error(a);s=s.replace(a,b)}
rep('<script src="sample_work/学霸笔记物质观.js"></script>', '<script src="sample_work/学霸笔记运动观.js"></script><script src="sample_work/学霸笔记物质观.js"></script>');
rep("||p.startsWith('material:')", "||p.startsWith('motion-original:')||p==='motion-original-quiz'||p.startsWith('material:')");
rep('<small>原资料第 5—9 页 · 原文、图表与课后题</small><span class="arrow">打开笔记 →</span></button>', '<small>原资料第 5—9 页 · 原文、图表与课后题</small><span class="arrow">打开笔记 →</span></button><button class="choice" data-go="motion-original:9"><span class="tag">马原 / 唯物论</span><h2>运动观、时空观</h2><small>原资料第 9—14 页 · 原文、图表与课后题</small><span class="arrow">打开笔记 →</span></button>');
rep("page==='material-quiz'?materialQuiz():", "page==='material-quiz'?materialQuiz():page.startsWith('motion-original:')?motionOriginal(Math.max(9,Math.min(12,Number(page.slice(16))||9))):page==='motion-original-quiz'?motionOriginalQuiz():");
rep("page.startsWith('material:')?'note-material-'+page.slice(9):", "page.startsWith('material:')?'note-material-'+page.slice(9):page.startsWith('motion-original:')?'note-motion-original-'+page.slice(16):");
rep('bindMaterialQuiz();', 'bindMaterialQuiz();bindMotionOriginalQuiz();');
fs.writeFileSync(p,s,'utf8');
