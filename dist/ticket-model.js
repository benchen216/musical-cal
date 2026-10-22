(function(root){
'use strict';
function offerState(offer,now=new Date()){
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 if(offer.endsOn&&today>offer.endsOn)return 'expired';
 const end=offer.endsAt?Date.parse(offer.endsAt):NaN,start=offer.startsAt?Date.parse(offer.startsAt):NaN;
 if(Number.isFinite(end)&&now.getTime()>end)return 'expired';
 if(Number.isFinite(start)&&now.getTime()<start)return 'upcoming';
 return ['expired','current','upcoming'].includes(offer.status)?offer.status:'unknown';
}
const labels={expired:'已結束',current:'核對時有效・購票前請再確認',upcoming:'尚未開始',unknown:'期限／狀態未確認'};
const api={offerState,labels};root.TicketModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
