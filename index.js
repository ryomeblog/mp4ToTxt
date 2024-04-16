const extractAudio = require("./extractAudio");

const videoPath = process.argv[2];
const outputFolder = process.argv[3];

if (!videoPath || !outputFolder) {
  console.error("Usage: node index.js <videoPath> <outputFolder>");
  process.exit(1);
}

extractAudio(videoPath, outputFolder);
