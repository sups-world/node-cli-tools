import fs from "fs";
import path from "path";

const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
};

const filePath = process.argv[2];

if (!filePath) {
  console.log("Please provide a file to watch");
  process.exit(1);
}

//Implementing filter
const filterArgIndex = process.argv.indexOf("--filter");
const filter = filterArgIndex !== -1 ? process.argv[filterArgIndex + 1] : null;

const absolutePath = path.resolve(filePath);

console.log(`👀 Watching: ${absolutePath}`);
if (filter) {
  console.log(`🔍 Filter active: ${filter}`);
}

let lastSize = 0;

function watchThisFile() {
  try {
    const stats = fs.statSync(absolutePath);
    const newSize = stats.size;

    if (newSize > lastSize) {
      const stream = fs.createReadStream(absolutePath, {
        start: lastSize,
        end: newSize,
      });

      stream.on("data", (chunk) => {
        // process.stdout.write(chunk.toString());
        const text = chunk.toString();
        const lines = text.split("\n");

        lines.forEach((line) => {
          if (!line) return;

          // if (!filter || line.includes(filter)) {
          //   console.log(line);
          // }
          let output = line;
          if (line.includes("ERROR")) {
            output = colors.red(line);
          } else if (line.includes("WARN")) {
            output = colors.yellow(line);
          } else if (line.includes("INFO")) {
            output = colors.green(line);
          }

          if (!filter || line.includes(filter)) {
            console.log(output);
          }
        });
      });

      lastSize = newSize;
    }
  } catch (error) {
    console.log("File not found or inaccessible !!");
  }
}

//check every 500ms
setInterval(watchThisFile, 500);

// watchThisFile();
