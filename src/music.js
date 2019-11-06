import WebMidi from "webmidi";

export function gen_music(){
    WebMidi.enable(function (err) {
        if (err) {
          console.log("WebMidi could not be enabled.", err);
        } else {
          console.log("WebMidi enabled!");
        }
    });
    console.log(WebMidi.outputs);
    const output = WebMidi.outputs[0];

    if(output){
        const BPM = 120;
        const beat_ms = ((60/BPM) * 1000);
        const measure = 4;

        // TODO play arpeggios and walk the circle of fifths? not sure
        function playMeasure(){
            output.playNote("C3",1)
                  .playNote("E3",1, {time:WebMidi.time+beat_ms})
                  .playNote("G3",1, {time:WebMidi.time+beat_ms*2})
                  .playNote("E3",1, {time:WebMidi.time+beat_ms*3})
        }

        playMeasure();
        setInterval( playMeasure, beat_ms * measure );
    }
}