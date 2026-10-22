const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const ctx={window:{}};vm.runInNewContext(fs.readFileSync('dist/events.js','utf8'),ctx);const data=ctx.window.STAGE_DATA,M=require('./dist/model.js'),all=M.sessions(data);
assert.match(data.start,/^\d{4}-\d{2}-\d{2}$/);assert.match(data.end,/^\d{4}-\d{2}-\d{2}$/);assert.ok(data.start<data.end);assert.ok(all.length);assert.equal(new Set(data.productions.map(p=>p.id)).size,data.productions.length);
assert.equal(M.sessions(data,{format:'reading'}).every(s=>s.production.category.includes('讀劇')),true);assert.equal(['musical','reading','other'].reduce((sum,format)=>sum+M.sessions(data,{format}).length,0),all.length);
for(const region of ['north','central','south'])assert.equal(M.sessions(data,{region}).length,all.filter(s=>s.production.region===region).length);
for(const city of new Set(data.productions.map(p=>p.city)))assert.equal(M.sessions(data,{city}).length,all.filter(s=>s.production.city===city).length);
assert.equal(M.sessions(data,{query:'__nothing_matches_this__'}).length,0);assert.equal(M.taipeiToday(new Date('2026-10-22T16:30:00Z')),'2026-10-23');assert.equal(M.taipeiToday(new Date('2026-10-22T15:30:00Z')),'2026-10-22');assert.equal(M.monthCells(2026,9).filter(c=>c.inMonth).length,31);assert.equal(M.monthCells(2027,0).filter(c=>c.inMonth).length,31);assert.equal(M.monthCells(2026,9)[0].key,'2026-09-27');
for(const p of data.productions){for(const field of ['id','productionId','title','city','venue','summary','sourceUrl','ticketUrl'])assert.ok(p[field],`${p.id}: ${field}`);assert.ok(['north','central','south'].includes(p.region));assert.equal(new URL(p.sourceUrl).protocol,'https:');assert.equal(new URL(p.ticketUrl).protocol,'https:');assert.ok(p.sessions.length);const seen=new Set();for(const s of p.sessions){assert.ok(s.date>=data.start&&s.date<=data.end);assert.equal(M.dateKey(M.parseDate(s.date)),s.date);assert.match(s.time,/^(?:[01]\d|2[0-3]):[0-5]\d$/);const key=s.date+'T'+s.time;assert.ok(!seen.has(key),`Duplicate ${p.id} ${key}`);seen.add(key)}}
for(const g of M.groupSessions(all)){assert.equal(g.times.length,all.filter(s=>s.production.id===g.production.id&&s.date===g.date).length)}
assert.equal(M.sessions(data,{query:'愛就愛吧'}).length,10);assert.equal(M.sessions(data,{query:'Love Any Way'}).length,10);assert.equal(M.sessions(data,{query:'愛就愛吧'}).filter(s=>s.date==='2026-10-25'&&s.time==='12:00').length,0);

assert.equal(M.defaultCity,'臺北市');
const writeMusical=M.sessions(data,{query:'大家都怎麼做音樂劇'});
assert.equal(writeMusical.length,4);assert.equal(M.sessions(data,{query:'大家都怎么做音乐剧'}).length,4);
assert.deepEqual(Array.from(writeMusical,s=>s.date+'T'+s.time),['2026-11-06T19:30','2026-11-07T14:30','2026-11-07T19:30','2026-11-08T14:30']);
assert.ok(writeMusical.every(s=>s.production.city==='臺北市'&&M.performanceFormat(s.production)==='musical'));
for(let i=1;i<all.length;i++)assert.ok(all[i-1].date+'T'+all[i-1].time<=all[i].date+'T'+all[i].time,'Sessions must be chronological, with no pinned titles');
const reversed={...data,productions:[...data.productions].reverse()};assert.deepEqual(Array.from(M.sessions(reversed),s=>s.date+'T'+s.time),Array.from(all,s=>s.date+'T'+s.time));

console.log(`PASS: ${all.length} verified sessions; ${new Set(data.productions.map(p=>p.productionId)).size} works; required data, dates, unique sessions, region/city filters, timezone, month grid and grouping checks.`);
