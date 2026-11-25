let context;
export function playSound(kind,muted){
  if(muted)return;
  try{
    context??=new (window.AudioContext||window.webkitAudioContext)();
    if(context.state==='suspended')context.resume();
    const notes=kind==='serve'?[523,659,784,1047]:kind==='bad'?[150,110]:[420,650];
    notes.forEach((frequency,i)=>{const osc=context.createOscillator(),gain=context.createGain(),t=context.currentTime+i*.065;osc.type='square';osc.frequency.value=frequency;gain.gain.setValueAtTime(.035,t);gain.gain.exponentialRampToValueAtTime(.001,t+.12);osc.connect(gain);gain.connect(context.destination);osc.start(t);osc.stop(t+.13);});
  }catch{/* Audio is optional on browsers without an audio device. */}
}
