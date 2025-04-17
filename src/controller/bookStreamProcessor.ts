import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Processes a book line (expects a JSON object), validates and augments it.
 */
function processLine(line:any) {
  try {
    // Remove BOM and whitespace
    line = line.replace(/^\uFEFF/, '').trim();
    if (!line) return null;

    const book = JSON.parse(line);

    if (!book.title || !book.author || typeof book.pages !== 'number') {
      throw new Error('Invalid book format');
    }

    return {
      ...book,
      processedAt: new Date().toISOString(),
      isValid: true,
    };
  } catch (error:unknown) {
    console.error('Skipping invalid line:', line);
    console.error('Error:');
    return null;
  }
}

/**
 * Reads from input file and writes processed books to output using streams.
 */
async function processBooks(inputFile:string, outputFile:string) {
  const inputPath = path.join(__dirname, inputFile);
  const outputPath = path.join(__dirname, outputFile);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const readStream = fs.createReadStream(inputPath, { encoding: 'utf-8' });
  const writeStream = fs.createWriteStream(outputPath);

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity, // Handle both LF and CRLF
  });

  let processedCount = 0;

  for await (const line of rl) {
    const result = processLine(line);
    if (result) {
      writeStream.write(JSON.stringify(result) + '\n');
      processedCount++;
    }
  }

  writeStream.end();

  console.log(`Successfully processed ${processedCount} books.`);
  console.log(`Output written to ${outputFile}`);
}

// Example usage:
// processBooks('books.txt', 'output.txt');

export default processBooks;
