import {RECIPES,randomSource} from './config.js';
export function createGame(seed=7,shot='') {
  const s={seed,random:randomSource(seed),shot,screen:shot&&shot!=='start'?'play':'title',menu:0,panel:'',muted:false,paused:false,time:0,day:1,dayTime:90,score:0,tips:0,combo:0,bestCombo:0,served:0,lost:0,hearts:5,orders:[],selected:0,bowl:[],nextId:1,spawn:5,flash:0,message:'WELCOME TO THE MIDNIGHT SHIFT',messageTime:4,action:0,dayNotice:0};
  if(shot&&shot!=='start'){
    s.day=2;s.score=2480;s.tips=320;s.combo=4;s.served=12;s.dayTime=67;
    for(let i=0;i<3;i++)addOrder(s,i);
    s.orders[0].remaining=36;s.orders[1].remaining=28;s.orders[2].remaining=49;
    if(shot==='assemble')s.bowl=[0,1,2];
    if(shot==='serve')s.bowl=[...s.orders[0].recipe.items];
    s.message=shot==='serve'?'PERFECT BOWL!  •  E TO SERVE':shot==='assemble'?'FINISH THE BOWL  •  EGG + SCALLIONS':'THREE HUNGRY GUESTS. YOUR KITCHEN IS READY.';
  }
  return s;
}
export function addOrder(s,recipeIndex){
  if(s.orders.length>=3)return;
  const recipe=RECIPES[recipeIndex??Math.floor(s.random()*Math.min(4,2+s.day))];
  const limit=Math.max(24,58-s.day*3);
  const used=s.orders.map(o=>o.seat);const seat=[0,1,2].find(n=>!used.includes(n));
  s.orders.push({id:s.nextId++,recipe,seat,remaining:limit,limit,mood:Math.floor(s.random()*4)});
}
export function startGame(s){const muted=s.muted;Object.assign(s,createGame(s.seed));s.muted=muted;s.screen='play';addOrder(s,0);s.message='1 NOODLES → 2 BROTH → TOPPINGS → E SERVE';}
export function notify(s,message){s.message=message;s.messageTime=3;s.flash=0.25;}
export function isReady(s){const o=s.orders[s.selected];return !!o&&o.recipe.items.length===s.bowl.length&&o.recipe.items.every(i=>s.bowl.includes(i));}
export function ingredient(s,i){
  if(s.screen!=='play'||s.paused||s.shot)return '';
  if(!s.orders.length){notify(s,'NEXT GUEST IS ON THEIR WAY');return 'bad';}
  if(s.bowl.includes(i)){notify(s,'ALREADY ADDED • R TO RESET BOWL');return 'bad';}
  if((i===1&&!s.bowl.includes(0))||(i>1&&!s.bowl.includes(1))){notify(s,'START WITH NOODLES, THEN POUR THE BROTH');return 'bad';}
  s.bowl.push(i);s.action=i+1;s.flash=.4;
  notify(s,isReady(s)?'READY TO SERVE!  •  PRESS E':'INGREDIENT ADDED • MATCH THE ORDER TICKET');return 'add';
}
export function serve(s){
  if(s.shot||s.paused||s.screen!=='play')return '';
  if(!isReady(s)){notify(s,'CHECK THE TOPPINGS • R CLEARS THE BOWL');return 'bad';}
  const o=s.orders[s.selected];s.combo++;s.bestCombo=Math.max(s.combo,s.bestCombo);
  const tip=Math.round(o.remaining/o.limit*80)*(1+Math.floor(s.combo/3));
  const points=o.recipe.price+tip+s.combo*20;s.score+=points;s.tips+=tip;s.served++;
  s.orders.splice(s.selected,1);s.selected=Math.max(0,s.selected-1);s.bowl=[];
  s.spawn=Math.min(s.spawn,2);notify(s,`OISHII!  +${points}  •  TIP +${tip}  •  ${s.combo} COMBO`);return 'serve';
}
export function updateGame(s,dt){
  if(s.shot||s.paused||s.screen!=='play')return;
  s.time+=dt;s.flash=Math.max(0,s.flash-dt);s.messageTime=Math.max(0,s.messageTime-dt);s.dayNotice=Math.max(0,s.dayNotice-dt);
  s.dayTime-=dt;s.spawn-=dt;
  if(s.spawn<=0){addOrder(s);s.spawn=Math.max(3,9-s.day);}
  for(let i=s.orders.length-1;i>=0;i--){s.orders[i].remaining-=dt;if(s.orders[i].remaining<=0){s.orders.splice(i,1);s.lost++;s.hearts--;s.combo=0;s.selected=Math.min(s.selected,Math.max(0,s.orders.length-1));notify(s,'GUEST LEFT • KEEP AN EYE ON THE TIMERS');}}
  if(s.dayTime<=0){s.day++;s.dayTime=90;s.hearts=Math.min(5,s.hearts+1);s.dayNotice=4;notify(s,`DAY ${s.day} • FASTER ORDERS, BIGGER TIPS`);}
  if(s.hearts<=0)s.screen='over';
}
