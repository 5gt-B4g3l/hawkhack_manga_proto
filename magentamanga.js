//general skeleton of NoteSequence's for project, creating a sad NoteSequence and happy NoteSequence and code to integrate MusicVAE (very far from complete)
//add to header of webpage:
<script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0"></script>

//sad music base NoteSequence:
SAD_BGM = {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 1
  };

  player = new mm.Player();
  
  player.start(SAD_BGM);
  player.stop();


//happy music base NoteSequence:
HAPPY_BGM ={
    notes: [
        {pitch: 55, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 1
};

player - new mm.Player();

player.start(HAPPY_BGM);
player.stop();

//MusicVAE base:
// Initialize the model.
music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
music_vae.initialize();

// Create a player to play the sampled sequence.
vaePlayer = new mm.Player();

function playVAE() {
  if (vaePlayer.isPlaying()) {
    vaePlayer.stop();
    return;
  }
  music_vae
  .sample(1, vae_temperature)
  .then((sample) => vaePlayer.start(sample[0]));
}

//template for interpolation if we go that route, using sad bgm as example
function playInterpolation() {
    if (vaePlayer.isPlaying()) {
      vaePlayer.stop();
      return;
    }
    // MusicVAE requires quantized melodies, quantize first.
    const sad1 = mm.sequences.quantizeNoteSequence(SAD_BGM, 4);
    const sad2 = mm.sequences.quantizeNoteSequence(SAD_BGM2, 4);
    music_vae
    .interpolate([sad1, sad2], 4)
    .then((sample) => {
      const concatenated = mm.sequences.concatenate(sample);
      vaePlayer.start(concatenated);
    });
  }


