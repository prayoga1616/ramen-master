let context;
const cues={
  add:{notes:[420,650],wave:'triangle',step:.045,decay:.09,volume:.035},
  bad:{notes:[150,110],wave:'sine',step:.085,decay:.13,volume:.045},
  serve:{notes:[523.25,659.25,783.99,1046.5],wave:'triangle',step:.075,decay:.24,volume:.04}
};
export function playSound(kind,muted){
  if(muted)return;
  try{
    context??=new (window.AudioContext||window.webkitAudioContext)();
    if(context.state==='suspended')context.resume().catch(()=>{});
    const cue=cues[kind]||cues.add;
    cue.notes.forEach((frequency,i)=>{
      const osc=context.createOscillator(),gain=context.createGain();
      const t=context.currentTime+.01+i*cue.step;
      osc.type=cue.wave;osc.frequency.setValueAtTime(frequency,t);
      // A brief attack softens clicks; the last serving note rings longer.
      const tail=cue.decay*(kind==='serve'&&i===cue.notes.length-1?1.5:1);
      gain.gain.setValueAtTime(.0001,t);
      gain.gain.linearRampToValueAtTime(cue.volume,t+.008);
      gain.gain.exponentialRampToValueAtTime(.0001,t+tail);
      osc.connect(gain);gain.connect(context.destination);
      osc.onended=()=>{osc.disconnect();gain.disconnect();};
      osc.start(t);osc.stop(t+tail+.01);
    });
  }catch{/* Audio is optional on browsers without an audio device. */}
}
