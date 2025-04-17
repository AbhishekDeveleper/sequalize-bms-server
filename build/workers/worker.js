import { parentPort, workerData } from 'worker_threads';
function processLine(line) {
    try {
        line = line.replace(/^\uFEFF/, '').trim();
        if (!line)
            return null;
        const book = JSON.parse(line);
        if (!book.title || !book.author || typeof book.pages !== 'number') {
            throw new Error('Invalid book format');
        }
        return {
            ...book,
            processedAt: new Date().toISOString(),
            isValid: true,
        };
    }
    catch (error) {
        return null;
    }
}
const result = processLine(workerData);
parentPort?.postMessage(result);
