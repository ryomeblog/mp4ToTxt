const vosk = require("vosk");
const fs = require("fs");
const path = require("path");

function transcribeAudio(audioPath, outputFolder) {
  vosk.setLogLevel(0); // ログレベルの設定
  const modelPath = "./vosk-model-ja-0.22";
  const model = new vosk.Model(modelPath);
  const rec = new vosk.Recognizer({ model: model, sampleRate: 16000 });

  const stream = fs.createReadStream(audioPath);
  const results = [];

  stream.on("data", (chunk) => {
    if (rec.acceptWaveform(chunk)) {
      results.push(rec.result());
    }
  });

  stream.on("end", () => {
    results.push(rec.finalResult());
    rec.free();
    model.free();

    const transcription = results.map((r) => r.text).join("\n");
    const outputPath = path.join(outputFolder, "transcription.txt");
    fs.writeFileSync(outputPath, transcription, "utf8");
    console.log("Transcription saved:", outputPath);
  });
}

module.exports = transcribeAudio;
