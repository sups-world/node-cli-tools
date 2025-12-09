# LogWatch

A lightweight, real-time command line tool built with Node.js to monitor log files as they grow.

It works like `tail -f` but includes extra developer-friendly features like filtering, colored output, and interactive controls.

---

## Features

- Real-time log streaming
- Incremental file reads for better performance
- Keyword filtering
- Colored log output
- Pause / Resume controls
- Zero external dependencies

---

## How It Works

LogWatch continuously checks the size of a file and only reads the **new bytes** that were added since the last check.  
This makes it efficient even for very large log files.

It uses:

- Node.js file streams
- Event-driven stdin handling
- Byte offset tracking

---

## Installation/Usage

1. Make the file executable first:

```bash
chmod +x logwatch.js
```

2. Run the watcher

```bash
./logwatch.js app.log
```

3. With filtering

```bash
./logwatch.js app.log --filter INFO
```

4. Keyboard controls while running the tool:

```plaintext
| Key | Action               |
| --- | -------------------- |
| p   | Pause log streaming  |
| r   | Resume log streaming |
| q   | Quit the program     |

```

5. Open a new terminal and test as follows:

```bash
echo "[INFO] Server started" >> app.log
echo "[WARN] High memory usage" >> app.log
echo "[ERROR] Database connection failed" >> app.log
```

The new logs added to the file appears.

---

## Learning Outcome

This project helped me understand:

- Event-driven architecture in Node.js

- File streaming and performance optimization

- Raw terminal input handling

- Real-world CLI tool design

---

## Glossary

`#!/usr/bin/env node`

This line (shebang) allows the script to be executed directly from the terminal. It tell the OS to use "node" to run the file.
This allows us to run the file as :

```bash
./logwatch.js
```

instead of

```bash
node logwatch.js
```

---

`process.argv;`

Node.js reads command-line arguments with this.

---

`fs.statSync();`

This function fetches information about the file. Here it is used for file size, to detect new logs.

---

`fs.createReadStream()`
It is used to read files in small chunks instead of reading the entire file at once.
Here it is used with

```js
start:lastSize,
end:newSize
```

This reads only the new part of the file, making the program faster and memory-efficient.

---

### Streams

A stream is a way to process data over time instead of loading everything into memory.

This project uses streams to handle large log files efficiently.

---

### Raw Mode ( `process.stdin.setRawMode(true)`)

Raw mode makes the terminal send keypresses immediately to the program without waiting for Enter.

This is how the project captures:

- p for pause

- r for resume

- q for quit

---

### ANSI Color Codes

These are special characters used to add colors in the terminal.

This project uses them to highlight:

- ERROR in red : `\x1b[31m`

- WARN in yellow : `\x1b[33m`

- INFO in green : `\x1b[32m`

---

### Event-Driven Architecture

Instead of waiting for things using await, this project uses events.

Examples:

- File changes trigger stream events

- Keypresses trigger input events

This makes the CLI responsive and efficient.

---

### Byte Offset Tracking ( `lastSize` )

The variable lastSize keeps track of how many bytes have already been read from the file.

This allows the program to read only the new data every time.
