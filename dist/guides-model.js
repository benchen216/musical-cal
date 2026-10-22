(function(root){
'use strict';
const norm=value=>String(value||'').normalize('NFKC').replace(/臺/g,'台').toLocaleLowerCase().trim();
const matches=(query,parts)=>!norm(query)||norm(parts.filter(Boolean).join(' ')).includes(norm(query));
function venues(list,filters={}){return list.filter(v=>(!filters.district||filters.district==='all'||v.district===filters.district)&&matches(filters.query,[v.name,v.hallName,v.district,v.address,v.format,v.capacityText]));}
function companies(list,filters={}){return list.filter(c=>(!filters.focus||filters.focus==='all'||c.focusTags.some(tag=>tag.includes(filters.focus)))&&matches(filters.query,[c.name,c.entityType,c.city,c.summary,...c.focusTags]));}
const api={norm,venues,companies};root.GuideModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
