const fs=require('fs');const file='考研政治学习小样.html';let s=fs.readFileSync(file,'utf8');
s=s.replace('<script src="sample_work/导图检索.js"></script>', '<script src="sample_work/导图检索.js"></script><script src="sample_work/导图续篇.js"></script>');
s=s.replace('data-go="map-full:20">下一张：图谱第 15 页', 'data-go="map-text:15">下一张：图谱第 15 页');
s=s.replace("page.startsWith('map-full:')?fullMap", "page.startsWith('map-text:')&&continuedMaps[Number(page.slice(9))]?continuedMap(Number(page.slice(9))):page.startsWith('map-full:')?fullMap");
s=s.replace("page.startsWith('map-full:')?'full-map-page-'", "page.startsWith('map-text:')?'map-text-'+page.slice(9):page.startsWith('map-full:')?'full-map-page-'");
fs.writeFileSync(file,s);
