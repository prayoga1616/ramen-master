import {INGREDIENTS,STATIONS,BUTTONS} from './config.js';
import {isReady} from './sim.js';
import {rect,text,panel,neon,food,bowl,drawShop} from './world.js';
export const MENU_RECTS=BUTTONS.map((_,i)=>({x:850,y:263+i*57,w:278,h:44}));
export function drawOrderBoard(c,s){
  panel(c,802,170,370,378,'#12242f','#b48b61');rect(c,811,179,352,37,'#29464c');
  text(c,'ORDER BOARD',828,198,21,'#ffe0a0');text(c,'←  →',1145,198,18,'#8edac7','right');
  for(let i=0;i<3;i++){
    const o=s.orders[i],y=226+i*103,selected=i===s.selected;
    panel(c,814,y,346,94,selected?'#304b4b':'#1b303a',selected?'#f3ce80':'#42565b');
    if(!o){text(c,'WAITING FOR A GUEST',987,y+44,15,'#668080','center');continue;}
    const color=o.remaining<15?'#fa8181':'#8ed9be';
    text(c,`#${String(o.id).padStart(2,'0')}  ${o.recipe.name}`,826,y+16,15,selected?'#ffdd9b':'#b8c8bf');
    text(c,`${Math.ceil(o.remaining)}s`,1148,y+16,16,color,'right');
    const list=o.recipe.items;
    list.forEach((id,j)=>{const x=838+j*44;food(c,id,x,y+47,.47);if(selected&&s.bowl.includes(id)){rect(c,x+7,y+48,13,13,'#93d5a2');text(c,'✓',x+13,y+55,12,'#193e37','center');}});
    text(c,`SEAT ${o.seat+1}`,827,y+76,11,'#a6b5ac');
    rect(c,891,y+72,254,6,'#10252f');rect(c,891,y+72,254*Math.min(1,o.remaining/o.limit),6,color);
  }
}
function drawHeader(c,s){
  rect(c,24,17,1152,28,'#0d1c2b');text(c,'MIDNIGHT KITCHEN  /  夜の台所',39,31,13,'#8eacae');
  text(c,s.screen==='play'?`DAY ${String(s.day).padStart(2,'0')}   •   ${Math.ceil(s.dayTime)}s TO SUNRISE`:'HANDCRAFTED BOWLS. HAPPY SOULS.',1160,31,13,'#d6c397','right');
  panel(c,212,56,776,78,'#152039','#38435b');rect(c,222,62,756,2,'#945376');rect(c,222,127,756,2,'#479eac');
  neon(c,'RAMEN',450,97,55,'#ff71b2');neon(c,'MASTER',706,97,55,'#63dfdf');
  text(c,'ラーメン  •  THE CITY SLEEPS. THE BROTH DOESN’T.',600,148,12,'#e0ba9a','center');
  if(s.screen==='play'){
    text(c,`¥ ${s.score.toLocaleString()}`,55,93,21,'#ffcf7f');text(c,`TIPS ¥${s.tips}`,55,118,12,'#94c7bb');
    text(c,`${s.combo}x COMBO`,1154,87,19,'#88e4d0','right');text(c,'♥'.repeat(Math.max(0,s.hearts))+'♡'.repeat(s.lost>0?Math.max(0,5-s.hearts):0),1154,115,22,'#f58296','right');
  }
}
export function drawKitchen(c,s,t){
  panel(c,23,558,1154,219,'#273d43','#b18459');rect(c,29,564,1142,46,'#182d37');
  text(c,'KITCHEN',43,582,19,'#f6d193');text(c,s.messageTime>0||s.shot?s.message:'MATCH A TICKET • NOODLES → BROTH → TOPPINGS',230,583,13,'#a7d6c4');
  text(c,'[P] PAUSE',1157,583,12,'#a1b1b0','right');
  for(let i=0;i<7;i++){
    const p=STATIONS[i],added=s.bowl.includes(i),needed=s.orders[s.selected]?.recipe.items.includes(i);
    panel(c,p.x,p.y,p.w,p.h,'#634c3e',added?'#a6d6a4':needed?'#cba16b':'#806a57');
    rect(c,p.x+5,p.y+5,p.w-10,69,'#372f32');rect(c,p.x+8,p.y+7,p.w-16,4,'#957254');
    if(i===1){rect(c,p.x+27,p.y+29,49,33,'#72817e');rect(c,p.x+31,p.y+30,7,28,'#bac2aa');food(c,1,p.x+51,p.y+26,.95);}else{rect(c,p.x+13,p.y+26,75,37,'#bbb59b');rect(c,p.x+18,p.y+30,65,28,'#d4c9a4');food(c,i,p.x+51,p.y+44,i===4?.8:1.05);}
    rect(c,p.x+5,p.y+5,20,20,added?'#8ecb9c':'#dfb77d');text(c,added?'✓':String(i+1),p.x+15,p.y+16,14,'#253b3a','center');
    text(c,p.name,p.x+p.w/2,p.y+88,i===5?12:13,'#ffdfaa','center');text(c,added?'ADDED':needed?'CLICK TO ADD':'OPTIONAL',p.x+p.w/2,p.y+105,10,added?'#a8e1a8':'#c0a78b','center');
  }
  panel(c,832,616,328,117,'#20333d',isReady(s)?'#91dcc0':'#5d7778');
  text(c,isReady(s)?'PLATE READY TO SERVE':s.bowl.length?'BOWL IN PROGRESS':'YOUR EMPTY BOWL',996,632,13,isReady(s)?'#a2e5c6':'#c2b99e','center');
  bowl(c,995,683,s.bowl,1.28,t);
  if(!s.shot&&s.flash>0&&s.action&&s.bowl.includes(s.action-1)){
    const from=STATIONS[s.action-1],progress=1-s.flash/.25;
    food(c,s.action-1,from.x+51+(995-from.x-51)*progress,655-Math.sin(progress*Math.PI)*92,1-progress*.3);
  }
  if(s.bowl.length){rect(c,1051,659,54,4,'#e6bd79');rect(c,1051,668,54,4,'#e6bd79');}
  const o=s.orders[s.selected];
  text(c,`[R] RESET BOWL`,49,757,12,'#d3b391');text(c,'1–7 ADD  •  ← → SELECT ORDER',420,757,12,'#b2c2b5','center');
  panel(c,835,742,321,26,isReady(s)?'#84c6ac':'#375458',isReady(s)?'#b5edcb':'#657f7e');
  text(c,`[E] SERVE${o?' TO SEAT '+(o.seat+1):''}`,996,756,14,isReady(s)?'#193b36':'#c2d1c0','center');
  text(c,'FRESH NOODLES • SLOW BROTH • ONE MORE HAPPY CUSTOMER',600,790,10,'#738c91','center');
}
function drawTitle(c,s,t){
  panel(c,802,201,370,339,'#152735','#9b815e');text(c,'THE MIDNIGHT SHIFT',987,230,18,'#edc78e','center');
  MENU_RECTS.forEach((r,i)=>{panel(c,r.x,r.y,r.w,r.h,i===s.menu?'#a64e65':'#213d48',i===s.menu?'#f3a8b4':'#5f7d80');text(c,(i===s.menu?'▸ ':'')+BUTTONS[i],r.x+r.w/2,r.y+23,18,i===s.menu?'#fff0c8':'#b8d8ce','center');});
  text(c,'↑ ↓ CHOOSE   •   ENTER CONFIRM',987,516,11,'#8caaa9','center');
  panel(c,38,577,1124,190,'#152a35','#726a58');
  bowl(c,163,681,[0,1,2,3,4,5,6],1.75,t);
  text(c,'A LITTLE SHOP. A LONG NIGHT.',325,618,27,'#ffcf8c');
  text(c,'Keep the broth warm and the city fed.',325,654,18,'#b7d6ca');
  text(c,'Build each bowl. Beat the clock. Find your rhythm.',325,682,16,'#a1bcba');
  text(c,'1–7 INGREDIENTS     ← → ORDERS     E SERVE',325,725,14,'#e6b48e');
  text(c,'OPEN UNTIL THE LAST BOWL',600,790,10,'#738c91','center');
}
function drawModal(c,s){
  c.fillStyle='#070e20dc';c.fillRect(0,165,1200,635);
  panel(c,258,231,684,440,'#152b37','#c6a077');
  const title=s.screen==='over'?'THE LAST BOWL':s.paused?'SHIFT PAUSED':s.panel==='menu'?'THE RAMEN NOTEBOOK':s.panel==='options'?'OPTIONS':'SEE YOU NEXT SHIFT';
  text(c,title,600,275,29,'#f6cd8d','center');
  if(s.screen==='over'){
    text(c,`EARNINGS  ¥${s.score}`,600,338,30,'#a5e1c5','center');text(c,`BOWLS SERVED ${s.served}   •   DAYS REACHED ${s.day}`,600,398,17,'#ddc6a2','center');text(c,`TIPS ¥${s.tips}   •   BEST COMBO ${s.bestCombo}x`,600,437,17,'#ddc6a2','center');text(c,'Every great chef starts with one bowl.',600,497,16,'#93b6b5','center');
  }else if(s.panel==='menu'){
    const lines=['1. Choose a ticket with ← → or click it.','2. Add 1 noodles, then 2 broth.','3. Add the toppings shown on that ticket.','4. Press E or click SERVE for your guest.','R clears a bowl. Exact recipes earn tips.','Chain perfect bowls. Survive the rush!'];lines.forEach((line,i)=>text(c,line,301,332+i*39,16,i<4?'#e4d6b6':'#91c7b7'));
  }else if(s.panel==='options'){
    text(c,`SOUND EFFECTS: ${s.muted?'OFF':'ON'}`,600,364,23,'#a3deca','center');text(c,'Press M or click here to toggle sound',600,409,16,'#d5c6a9','center');text(c,'Controls: keyboard + mouse',600,467,17,'#a1bdb9','center');
  }else text(c,s.paused?'The broth can wait a moment.':'Your stool will be waiting.',600,398,21,'#a7cebf','center');
  panel(c,391,595,418,44,'#355551','#91bda6');text(c,s.screen==='over'?'ENTER • TRY ANOTHER SHIFT':'ENTER / ESC • BACK TO SHOP',600,618,16,'#f6ddaf','center');
}
export function render(c,s){
  const t=s.shot?8:s.time+(s.screen==='title'?performance.now()/1000:0);
  c.imageSmoothingEnabled=false;drawShop(c,s,t);drawHeader(c,s);
  if(s.screen==='title')drawTitle(c,s,t);else {drawOrderBoard(c,s);drawKitchen(c,s,t);}
  if(s.dayNotice>0){panel(c,256,300,475,89,'#182d37','#eac78b');text(c,`DAY ${s.day} • THE NIGHT GETS BUSIER`,494,345,20,'#ffe0a0','center');}
  if(s.panel||s.paused||s.screen==='over')drawModal(c,s);
}
