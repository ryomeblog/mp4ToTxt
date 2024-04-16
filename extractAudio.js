const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const transcribeAudio = require("./transcribeAudio");

function extractAudio(videoPath, outputFolder) {
  const audioPath = path.join(outputFolder, "audio.wav");
  ffmpeg(videoPath)
    .output(audioPath)
    .audioCodec("pcm_s16le") // Linear PCM format
    .audioChannels(1) // Mono channel
    .audioFrequency(16000) // Sample rate
    .on("end", () => {
      console.log("Audio extraction complete.");
      transcribeAudio(audioPath, outputFolder);
    })
    .on("error", (err) => {
      console.error("Error:", err);
    })
    .run();
}

module.exports = extractAudio;
