
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'src/assets');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const IGNORE_DIRS = ['node_modules', '.git'];

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                await processDirectory(filePath);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (EXTENSIONS.includes(ext)) {
                const webpPath = filePath.replace(ext, '.webp');

                // Conditions to process:
                // 1. File > 100KB (likely needs resizing/compression)
                // 2. OR it is the logo (needs explicit optimization)
                if (stat.size > 100 * 1024 || file.includes('logo')) {
                    console.log(`Processing: ${file} (${(stat.size / 1024).toFixed(2)} KB)`);

                    try {
                        // Resize to max width 1920px (Full HD) - significant size reduction
                        // Quality 80 is a good balance
                        await sharp(filePath)
                            .resize(1920, null, {
                                withoutEnlargement: true, // Don't scale up small images
                                fit: 'inside'
                            })
                            .webp({ quality: 80, effort: 6 }) // effort 6 = better compression
                            .toFile(webpPath);

                        // Visual feedback
                        const newStat = fs.statSync(webpPath);
                        const savings = ((stat.size - newStat.size) / stat.size * 100).toFixed(1);
                        console.log(`✓ Optimized: ${path.basename(webpPath)} - Saved ${savings}%`);
                    } catch (err) {
                        console.error(`Error processing ${file}:`, err);
                    }
                }
            }
        }
    }
}

console.log("Starting aggressive image optimization (Resize + WebP)...");
processDirectory(ASSETS_DIR).then(() => {
    console.log("Optimization complete!");
}).catch(err => {
    console.error("Script failed:", err);
});
