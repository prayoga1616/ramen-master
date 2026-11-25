import {createGame,updateGame} from './sim.js';
import {render} from './render.js';
import {bindInput} from './input.js';
const canvas=document.getElementById('game');
const err=document.getElementById('err');
function report(error){err.textContent=String(error?.stack||error);const c=canvas.getContext('2d');c.fillStyle='#8c254a';c.fillRect(0,760,1200,40);c.fillStyle='#fff';c.font='16px monospace';c.fillText(String(error?.message||error),15,785);}
window.addEventListener('error',e=>report(e.error||e.message));
window.addEventListener('unhandledrejection',e=>report(e.reason));
const params=new URLSearchParams(location.search);
const shot=['start','orders','assemble','serve'].includes(params.get('shot'))?params.get('shot'):'';
const state=createGame(Number(params.get('seed')||7),shot);
bindInput(canvas,state);canvas.focus();
let last=performance.now();
function frame(now){try{const dt=Math.min(.05,(now-last)/1000);last=now;updateGame(state,dt);render(canvas.getContext('2d'),state);requestAnimationFrame(frame);}catch(error){report(error);}}
requestAnimationFrame(frame);
