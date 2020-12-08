import Tone from "tone";

// double scale so we can arrpegiate to a second octave
const scale = ["C","D","E","F","G","A","B"]
const octave = 4
const bass_octave = 2 
const transpose = 5

export function gen_music(){
  var synth = new Tone.Synth().toMaster()
  var bass_synth = new Tone.Synth().toMaster()

  var notes = [1,3,5,7,5,3].map( n=> n-1 ) // 1-based is easier to write
  var i = 0

  const loop = new Tone.Loop( (time) => {
    const note = scale[notes[i]]
    const note_1 = note + ((notes[i]>7)?octave+1:octave);
    synth.triggerAttackRelease(note_1, 0.1, time);

    i = (i + 1) % notes.length
    if( i == 0 ){ // finish cycle, then transpose notes
      bass_synth.triggerAttackRelease( note + bass_octave, 2, time )
      notes = notes.map( n => ( n + transpose ) % scale.length )
    }
  },'8n').start(0)

  Tone.Transport.toggle();

  return Tone.Transport;
}