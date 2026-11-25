import {randomSource} from './config.js';
export function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);}
export function text(c,str,x,y,size=16,color='#ffe4b4',align='left'){c.fillStyle=color;c.font=`bold ${size}px monospace`;c.textAlign=align;c.textBaseline='middle';c.fillText(str,Math.round(x),Math.round(y));}
export function panel(c,x,y,w,h,fill='#162537',edge='#4c676d'){rect(c,x,y,w,h,edge);rect(c,x+2,y+2,w-4,h-4,fill);}
export function oval(c,x,y,rx,ry,color){for(let yy=-ry;yy<=ry;yy+=3){const width=Math.round(rx*Math.sqrt(1-yy*yy/(ry*ry)));rect(c,x-width,y+yy,width*2,3,color);}}
export function neon(c,str,x,y,size,color){c.save();c.shadowColor=color;c.shadowBlur=18;text(c,str,x,y,size,color,'center');c.shadowBlur=7;text(c,str,x,y,size,'#fff2e6','center');c.restore();}
export function steam(c,x,y,t,scale=1){c.save();c.globalAlpha=.42;for(let j=0;j<3;j++)for(let i=0;i<5;i++){const z=(i*9+t*13+j*11)%46;rect(c,x+(j-1)*13*scale+Math.sin(z*.16+j)*5*scale,y-z*scale,4*scale,7*scale,'#b4dfd7');}c.restore();}
export function food(c,id,x,y,k=1){
  c.save();c.translate(Math.round(x),Math.round(y));c.scale(k,k);
  if(id===0){for(let j=0;j<5;j++){rect(c,-19,-10+j*5,38,3,'#e4aa53');for(let i=0;i<5;i++)rect(c,-17+i*8,-12+j*5+(i%2)*2,6,3,'#ffe19a');}}
  if(id===1){oval(c,0,0,23,13,'#9a4e32');oval(c,0,-2,19,10,'#e8a34e');rect(c,-11,-7,16,3,'#ffd17c');}
  if(id===2){oval(c,0,0,20,13,'#8c4a44');oval(c,0,-2,17,11,'#e8a08a');oval(c,1,-2,10,7,'#b55d59');oval(c,1,-2,6,4,'#efbba0');rect(c,-13,-8,8,3,'#ffccaa');}
  if(id===3){oval(c,0,0,13,17,'#e9cbb1');oval(c,0,-2,11,14,'#fff4cf');oval(c,0,0,7,8,'#ef9e36');rect(c,-3,-4,5,4,'#ffda6a');}
  if(id===4){rect(c,-14,-20,27,35,'#173b37');rect(c,-11,-18,4,28,'#38705a');for(let i=0;i<4;i++)rect(c,-4,-15+i*7,13,2,'#426750');}
  if(id===5){for(let j=0;j<3;j++)for(let i=0;i<4;i++){rect(c,-17+i*10+(j%2)*3,-10+j*8,7,6,'#66a76d');rect(c,-15+i*10+(j%2)*3,-9+j*8,3,2,'#c2df8d');}}
  if(id===6){for(let i=0;i<4;i++){rect(c,-19+i*10,-13+(i%2)*6,7,27,'#b77b45');rect(c,-17+i*10,-12+(i%2)*6,3,23,'#e5bb79');}}
  c.restore();
}
export function bowl(c,x,y,items=[],k=1,t=0){
  c.save();c.translate(x,y);c.scale(k,k);
  oval(c,0,19,48,9,'#0b1723');rect(c,-32,1,64,22,'#c45c57');rect(c,-26,22,52,7,'#913e4e');rect(c,-16,29,32,4,'#edb195');
  for(let i=0;i<5;i++)rect(c,-29+i*13,9,6,7,'#ffe3bd');
  oval(c,0,0,45,17,'#f3d9b1');oval(c,0,0,39,13,items.includes(1)?'#b66a32':'#403646');
  if(items.includes(0)){c.save();c.scale(.9,.7);food(c,0,0,0);c.restore();}
  const positions={2:[-17,0],3:[14,-2],4:[23,-10],5:[0,8],6:[-25,-7]};
  for(const i of [4,6,2,3,5])if(items.includes(i)){const [xx,yy]=positions[i];food(c,i,xx,yy,.65);}
  rect(c,-42,-7,5,12,'#fff1cf');rect(c,-32,16,16,3,'#e78979');
  if(items.includes(1))steam(c,0,-20,t,.75);
  c.restore();
}
export function person(c,x,y,variant=0,chef=false,t=0){
  c.save();c.translate(x,y);const skin=['#eab18c','#c58e76','#f3c2a0','#dba37e'][variant%4],shirt=['#6e8fa3','#b06971','#81a591','#d7a858'][variant%4];
  rect(c,-23,52,46,15,'#101b2c');rect(c,-22,14,44,43,chef?'#ede7ce':shirt);rect(c,-29,23,9,29,skin);rect(c,20,23,9,29,skin);
  rect(c,-20,-23,40,40,skin);rect(c,-25,-17,7,22,skin);rect(c,19,-17,7,22,skin);rect(c,-21,-30,42,14,'#24202a');rect(c,-21,-20,7,12,'#24202a');
  if(chef){rect(c,-24,-25,48,9,'#f9f0d5');rect(c,21,-23,14,6,'#f9f0d5');rect(c,27,-17,7,17,'#e5d8b7');rect(c,-3,-25,9,9,'#bd4c52');rect(c,-10,16,20,41,'#fff3d7');rect(c,-22,39,44,5,'#ac4c51');}
  rect(c,-12,-7,5,5,'#292132');rect(c,8,-7,5,5,'#292132');rect(c,-8,5,17,3,'#793a3e');rect(c,-5,8,11,3,'#793a3e');rect(c,-19,1,7,3,'#df8c7d');rect(c,13,1,7,3,'#df8c7d');
  if(chef){rect(c,26,9+Math.sin(t*3)*3,7,27,'#b98259');rect(c,23,5+Math.sin(t*3)*3,13,9,'#ebbe7b');}
  else {rect(c,-17,30,33,5,skin);rect(c,8,14,3,28,'#e4b16b');rect(c,15,12,3,29,'#e4b16b');}
  c.restore();
}
const stars=Array.from({length:70},(_,i)=>{const r=randomSource(i*431+83);return [r()*1200,r()*170,r()*3];});
export function drawSky(c,t){
  rect(c,0,0,1200,800,'#0d142b');rect(c,0,0,1200,95,'#11172f');rect(c,0,95,1200,100,'#1b2442');
  for(const [x,y,p]of stars){const col=Math.sin(t*.8+p*5)>.1?'#90b4bf':'#536781';rect(c,x,y,3,3,col);if(p>2.6){rect(c,x-3,y+1,9,1,col);rect(c,x+1,y-3,1,9,col);}}
  oval(c,1055,77,42,42,'#e9db9d');oval(c,1073,61,36,36,'#11172f');rect(c,1024,93,8,5,'#bfbf8a');
  for(let i=0;i<25;i++){const r=randomSource(i*89);const h=22+r()*62;rect(c,i*52,190-h,46,h,'#101b31');if(i%3===0)rect(c,i*52+21,115-h,3,28,'#14203a');for(let j=0;j<3;j++)if(r()>.45)rect(c,i*52+9+j*11,180-h,4,7,'#3a4b5d');}
  rect(c,0,190,1200,610,'#111c2c');
}
function lantern(c,x,y,t){
  x+=Math.round(Math.sin(t*1.4+y)*2);rect(c,x-1,190,2,y-190,'#a16d52');c.save();c.shadowColor='#ed6259';c.shadowBlur=25;oval(c,x,y+20,18,25,'#c34250');c.restore();rect(c,x-19,y+8,38,24,'#df5b58');rect(c,x-12,y,5,40,'#f17e64');rect(c,x+8,y,4,40,'#b9394c');rect(c,x-13,y-6,26,6,'#593d45');rect(c,x-13,y+44,26,5,'#593d45');rect(c,x-1,y+49,3,11,'#e2ac71');text(c,'福',x,y+21,19,'#673140','center');
}
export function drawShop(c,s,t){
  drawSky(c,t);
  // A tiled roof and warm timber frame around the open night kitchen.
  rect(c,25,182,755,307,'#342c36');rect(c,48,212,710,259,'#634334');
  for(let y=215;y<470;y+=25){rect(c,49,y,710,2,'#77503a');for(let x=60;x<755;x+=82)rect(c,x+(y%2)*20,y,2,23,'#50382f');}
  rect(c,13,164,780,20,'#283a4c');rect(c,26,151,754,15,'#3e5362');for(let x=29;x<780;x+=26){rect(c,x,151,3,30,'#182638');rect(c,x+4,153,17,3,'#63727a');}rect(c,10,182,787,9,'#101b2a');
  rect(c,37,193,12,292,'#bb7b4c');rect(c,47,193,6,292,'#704731');rect(c,756,193,14,292,'#b47c4c');
  // Shelves, ceramic bowls, sauces and stock jars.
  for(let shelf=0;shelf<2;shelf++){
    const y=274+shelf*70;rect(c,77,y,290,9,'#b68050');rect(c,77,y+9,290,5,'#352b2b');
    for(let i=0;i<8;i++){const x=87+i*34;if((i+shelf)%3===0){bowl(c,x+9,y-15,[0],.24,t);}else{rect(c,x,y-32,15,30,i%2?'#548276':'#b17445');rect(c,x+3,y-38,9,8,'#202936');rect(c,x+2,y-19,11,12,'#edcf94');rect(c,x+6,y-16,3,6,'#a74a4b');}}
  }
  rect(c,408,216,257,11,'#bf7950');
  for(let i=0;i<5;i++){rect(c,414+i*50,227,47,55,'#a63c4a');rect(c,418+i*50,229,5,45,'#c55056');rect(c,414+i*50,277,43,5,'#7b2e40');}text(c,'ら ー め ん',536,253,27,'#f6d6b0','center');
  rect(c,674,220,62,103,'#253a42');panel(c,680,227,50,89,'#152c38','#65a997');text(c,'OPEN',705,246,13,'#8bdfcb','center');text(c,'夜',705,280,27,'#f1bc85','center');
  for(const x of [79,388,732])lantern(c,x,201,t);
  // Pots on the hob; the chef works behind the guest counter.
  rect(c,91,378,225,43,'#263741');rect(c,97,383,213,6,'#748087');
  for(let i=0;i<2;i++){const x=135+i*105;rect(c,x-28,352,58,37,'#617a7f');rect(c,x-24,357,8,25,'#94aaa5');oval(c,x+1,352,30,8,'#a5b5ad');oval(c,x+1,352,24,5,'#9c743f');rect(c,x-35,361,7,10,'#344853');rect(c,x+30,361,7,10,'#344853');steam(c,x,341,t+i);rect(c,x-20,394,42,5,'#e5a459');}
  person(c,501,345,0,true,t);
  rect(c,599,359,93,35,'#c59862');for(let i=0;i<5;i++)rect(c,606+i*16,365,5,20,'#7a543a');rect(c,596,393,101,7,'#e3b57c');
  rect(c,28,412,753,25,'#d49960');rect(c,28,437,753,10,'#714332');rect(c,37,447,734,59,'#885538');
  for(let i=0;i<12;i++)rect(c,40+i*62,450,3,53,'#5f3e32');rect(c,28,412,753,5,'#f1c084');
  const display=s.screen==='title'||s.screen==='over';
  for(let i=0;i<3;i++){
    const x=171+i*210;const order=s.orders.find(o=>o.seat===i);
    rect(c,x-20,518,8,29,'#725440');rect(c,x+13,518,8,29,'#725440');oval(c,x,510,33,12,'#3a2732');oval(c,x,505,33,10,'#c67e54');rect(c,x-25,514,50,6,'#764530');
    if(order||display){person(c,x,436,order?.mood??i,false,t);bowl(c,x+39,432,[0,1,2,3,5],.47,t+i);rect(c,x+24,408,35,3,'#e6c085');if(order&&s.screen==='play'){panel(c,x-35,377,70,23,'#192e39',i===s.orders[s.selected]?.seat?'#f8cc78':'#5d7373');text(c,`#${String(order.id).padStart(2,'0')}`,x,389,14,'#ffe1ac','center');}}
  }
  // Street-level reflections and timber floor.
  rect(c,0,550,1200,250,'#182733');for(let y=553;y<800;y+=18){rect(c,0,y,1200,2,'#223541');for(let x=0;x<1200;x+=130)rect(c,x+(y%3)*32,y,2,18,'#0f1e2a');}
}
