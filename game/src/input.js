import {STATIONS} from './config.js';
import {ingredient,serve,startGame,notify} from './sim.js';
import {MENU_RECTS} from './render.js';
import {playSound} from './sfx.js';
export function bindInput(canvas,s){
  const sound=kind=>kind&&playSound(kind,s.muted);
  function menuAction(){
    if(s.menu===0)startGame(s);else s.panel=['','menu','options','exit'][s.menu];sound('add');
  }
  function select(delta){if(s.orders.length)s.selected=(s.selected+delta+s.orders.length)%s.orders.length;}
  function closeModal(){if(s.screen==='over'){startGame(s);return;}s.panel='';s.paused=false;}
  window.addEventListener('keydown',e=>{
    const key=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' ','enter'].includes(key))e.preventDefault();
    if(key==='m'){s.muted=!s.muted;return;}
    if(s.panel||s.paused||s.screen==='over'){if(key==='enter'||key==='escape'||key==='p')closeModal();return;}
    if(s.screen==='title'){
      if(key==='arrowdown')s.menu=(s.menu+1)%4;
      if(key==='arrowup')s.menu=(s.menu+3)%4;
      if(key==='enter'||key===' ')menuAction();return;
    }
    if(key==='escape'||key==='p'){s.paused=!s.paused;return;}
    if(key==='arrowleft'||key==='arrowup')select(-1);
    if(key==='arrowright'||key==='arrowdown')select(1);
    if(key>='1'&&key<='7'&&!e.repeat)sound(ingredient(s,Number(key)-1));
    if(key==='e'&&!e.repeat)sound(serve(s));
    if(key==='r'&&!s.shot){s.bowl=[];notify(s,'CLEAN BOWL • A FRESH START');sound('add');}
  });
  function point(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*1200/r.width,y:(e.clientY-r.top)*800/r.height};}
  const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  canvas.addEventListener('pointermove',e=>{const p=point(e);canvas.style.cursor='pointer';if(s.screen==='title'&&!s.panel){const i=MENU_RECTS.findIndex(r=>inside(p,r));if(i>=0)s.menu=i;}});
  canvas.addEventListener('pointerdown',e=>{
    canvas.focus();const p=point(e);
    if(s.panel||s.paused||s.screen==='over'){
      if(s.panel==='options'&&p.y>320&&p.y<480){s.muted=!s.muted;return;}
      if(p.y>=580&&p.y<650)closeModal();return;
    }
    if(s.screen==='title'){const i=MENU_RECTS.findIndex(r=>inside(p,r));if(i>=0){s.menu=i;menuAction();}return;}
    if(p.x>1060&&p.y>564&&p.y<606){s.paused=true;return;}
    const i=STATIONS.findIndex(r=>inside(p,r));if(i>=0)sound(ingredient(s,i));
    if(p.x>=814&&p.x<=1160&&p.y>=226&&p.y<529){const idx=Math.floor((p.y-226)/103);if(s.orders[idx])s.selected=idx;}
    if(p.x>835&&p.y>738&&p.y<774)sound(serve(s));
    if(p.x<211&&p.y>738&&p.y<774&&!s.shot){s.bowl=[];notify(s,'CLEAN BOWL • A FRESH START');}
  });
}
