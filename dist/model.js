(function(root){
  const defaultCity='臺北市';
  const regions = {north:'北部', central:'中部', south:'南部'};
  const cityRegions={'臺北市':'north','臺北':'north','台北市':'north','台北':'north','新北市':'north','新北':'north','桃園市':'north','桃園':'north','新竹市':'north','新竹縣':'north','苗栗縣':'central','臺中市':'central','台中市':'central','台中':'central','臺中':'central','彰化縣':'central','南投縣':'central','雲林縣':'central','嘉義市':'south','嘉義縣':'south','臺南市':'south','台南市':'south','高雄市':'south','高雄':'south','屏東縣':'south'};
  function pad(n){return String(n).padStart(2,'0')}
  function dateKey(d){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}
  function parseDate(s){const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12)}
  function taipeiToday(now=new Date()){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);return ['year','month','day'].map(t=>p.find(x=>x.type===t).value).join('-')}
  function monthCells(y,m){const first=new Date(y,m,1,12),start=new Date(y,m,1-first.getDay(),12);const size=Math.ceil((first.getDay()+new Date(y,m+1,0).getDate())/7)*7;return Array.from({length:size},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return {key:dateKey(d),day:d.getDate(),inMonth:d.getMonth()===m}})}
  function performanceFormat(p){return (p.category||'').includes('讀劇')?'reading':/選粹|Show Musical/.test(p.category||'')?'other':'musical'}
  function sessions(data,filters={}){const q=(filters.query||'').trim().toLocaleLowerCase();return data.productions.filter(p=>(!filters.format||filters.format==='all'||performanceFormat(p)===filters.format)&&(!filters.region||filters.region==='all'||p.region===filters.region)&&(!filters.city||filters.city==='all'||p.city===filters.city)&&(!q||[p.title,p.subtitle,p.venue,p.city,p.category,p.summary,...(p.keywords||[])].join(' ').toLocaleLowerCase().includes(q))).flatMap(p=>p.sessions.filter(s=>s.date>=data.start&&s.date<=data.end).map(s=>({...s,production:p}))).sort((a,b)=>(a.date+'T'+a.time).localeCompare(b.date+'T'+b.time)||a.production.title.localeCompare(b.production.title))}
  function groupSessions(list){const groups=[];list.forEach(s=>{let g=groups.find(x=>x.production.id===s.production.id&&x.date===s.date);if(!g){g={production:s.production,date:s.date,times:[]};groups.push(g)}g.times.push(s.time)});return groups}
  const api={defaultCity,regions,cityRegions,pad,dateKey,parseDate,taipeiToday,monthCells,performanceFormat,sessions,groupSessions};root.StageModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
