const fs=require('fs'),base='D:/个人/政治/sample_work/';function crop(page,x,y,w,h,vx,vy,vw,vh){return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="xMidYMid meet"><image href="sample_work/学霸笔记插图/page-${page}-0.jpg" x="0" y="0" width="1385" height="1039"/></svg>`}function edit(f,pairs){let s=fs.readFileSync(base+f,'utf8');for(const [a,b] of pairs){if(!s.includes(a))throw Error('missing '+a);s=s.replace(a,b)}fs.writeFileSync(base+f,s,'utf8')}
edit('学霸笔记物质观.js',[
['<text x="115" y="162" class="diag-icon">🍎</text>',crop(6,90,100,105,80,90,145,175,185)],
['<text x="280" y="162" class="diag-icon">🍌</text>',crop(6,255,100,105,80,320,165,180,170)],
['<text x="585" y="162" class="diag-icon">🍍</text>',crop(6,565,100,105,80,910,135,155,205)],
['<text x="750" y="162" class="diag-icon">🫐</text>',crop(6,730,100,105,80,1120,190,180,145)],
['<text x="95" y="435">🪨</text>',crop(6,80,375,100,80,85,575,180,165)],
['<text x="260" y="435">📱</text>',crop(6,250,375,80,80,335,570,120,160)],
['<text x="430" y="435">💨</text>',crop(6,410,375,100,80,475,580,220,145)],
['<text x="725" y="435">📡</text>',crop(6,705,370,100,85,1085,575,190,160)] ]);
edit('学霸笔记运动观.js',[
['<text x="65" y="228" class="diag-icon">🕰️</text>',crop(10,55,160,90,90,40,300,175,190)],
['<text x="190" y="228" class="diag-icon">⌛</text>',crop(10,180,160,90,90,250,300,120,195)],
['<text x="310" y="228" class="diag-icon">🪑</text>',crop(10,305,160,90,90,400,325,210,180)],
['<text x="520" y="235" class="diag-icon">😓</text>',crop(10,485,145,140,110,650,225,330,300)],
['<text x="520" y="360" class="diag-icon">😄</text>',crop(10,485,282,140,110,665,565,420,305)],
['<text x="800" y="235" class="diag-icon">🕰️</text>',crop(10,780,160,90,90,1185,235,135,150)],
['<text x="800" y="360" class="diag-icon">🕰️</text>',crop(10,780,285,90,90,1185,590,135,150)],
['<text x="80" y="150" class="diag-icon">👶</text><text x="165" y="150" class="diag-icon">🧑</text><text x="250" y="150" class="diag-icon">🧓</text>',crop(11,55,78,300,90,35,110,590,150)],
['<text x="180" y="325" class="diag-icon">🧍</text>',crop(11,170,270,80,100,220,430,90,210)],
['<rect x="495" y="94" width="350" height="300" rx="36" fill="#142e47"/><text x="580" y="245" class="diag-large">🌌</text><text x="720" y="320" class="diag-icon">🌍</text>',crop(11,495,94,350,260,710,90,660,530)] ]);
