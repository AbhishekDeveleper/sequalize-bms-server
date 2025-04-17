import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Worker } from 'worker_threads';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * Runs a worker thread to process a single line of book data.
 */
function runWorker(line) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./../workers/worker.js', import.meta.url), {
            workerData: line,
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}
/**
 * Reads input file line by line, processes with worker, writes to output.
 */
async function processBooks(inputFile, outputFile) {
    const inputPath = path.join(__dirname, inputFile);
    const outputPath = path.join(__dirname, outputFile);
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`);
    }
    const readStream = fs.createReadStream(inputPath, { encoding: 'utf-8' });
    const writeStream = fs.createWriteStream(outputPath);
    const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });
    let processedCount = 0;
    for await (const line of rl) {
        try {
            const result = await runWorker(line);
            if (result) {
                writeStream.write(JSON.stringify(result) + '\n');
                processedCount++;
            }
        }
        catch (error) {
            console.error('Worker error:', error);
        }
    }
    writeStream.end();
    console.log(`Successfully processed ${processedCount} books.`);
    console.log(`Output written to ${outputFile}`);
}
// Uncomment to run directly
// processBooks('books.txt', 'output.txt');
export default processBooks;
