export const W = 1200, H = 800;
export const INGREDIENTS = [
  {name:'NOODLES',short:'noodles',color:'#f8ce75'},
  {name:'BROTH',short:'broth',color:'#e4a24f'},
  {name:'CHASHU',short:'pork',color:'#e99489'},
  {name:'EGG',short:'egg',color:'#ffdc74'},
  {name:'NORI',short:'nori',color:'#548879'},
  {name:'SCALLIONS',short:'scallion',color:'#91ce78'},
  {name:'MENMA',short:'menma',color:'#d8ad6c'}
];
export const RECIPES = [
  {name:'MOONLIGHT SHOYU',items:[0,1,2,3,5],price:180},
  {name:'GARDEN MISO',items:[0,1,3,4,5,6],price:210},
  {name:'CHASHU CLASSIC',items:[0,1,2,4,6],price:190},
  {name:'MIDNIGHT SPECIAL',items:[0,1,2,3,4,5,6],price:260}
];
export const STATIONS = INGREDIENTS.map((item,i)=>({...item,x:34+i*112,y:620,w:102,h:116}));
export const BUTTONS = ['START GAME','MENU','OPTIONS','EXIT'];
export function randomSource(seed=7){let n=seed>>>0;return()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};}
