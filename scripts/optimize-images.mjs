import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '../src/img');
const publicImgDir = path.join(__dirname, '../public/img');

// Ensure public/img directory exists
await fs.mkdir(publicImgDir, { recursive: true });

const optimizations = [
  // Hero image - critical for LCP
  {
    input: 'rec3pic.webp',
    outputs: [
      { name: 'hero-mobile.webp', width: 640, quality: 75 },
      { name: 'hero-tablet.webp', width: 1024, quality: 80 },
      { name: 'hero-desktop.webp', width: 1920, quality: 85 },
      { name: 'hero-mobile.avif', width: 640, quality: 65, format: 'avif' },
      { name: 'hero-tablet.avif', width: 1024, quality: 70, format: 'avif' },
      { name: 'hero-desktop.avif', width: 1920, quality: 75, format: 'avif' },
    ]
  },
  // Room images
  {
    input: 'rec9pic.webp',
    outputs: [
      { name: 'room-twin-mobile.webp', width: 640, quality: 75 },
      { name: 'room-twin-desktop.webp', width: 800, quality: 80 },
      { name: 'room-twin-mobile.avif', width: 640, quality: 65, format: 'avif' },
      { name: 'room-twin-desktop.avif', width: 800, quality: 70, format: 'avif' },
    ]
  },
  {
    input: 'rec11pic.webp',
    outputs: [
      { name: 'room-suite-mobile.webp', width: 640, quality: 75 },
      { name: 'room-suite-desktop.webp', width: 800, quality: 80 },
      { name: 'room-suite-mobile.avif', width: 640, quality: 65, format: 'avif' },
      { name: 'room-suite-desktop.avif', width: 800, quality: 70, format: 'avif' },
    ]
  },
  // Gallery images - optimize heavily
  {
    input: 'rec7pic.webp',
    outputs: [
      { name: 'gallery-7-thumb.webp', width: 800, quality: 70 },
      { name: 'gallery-7-full.webp', width: 1200, quality: 75 },
    ]
  },
  {
    input: 'rec4pic.webp',
    outputs: [
      { name: 'gallery-4-thumb.webp', width: 800, quality: 70 },
      { name: 'gallery-4-full.webp', width: 1200, quality: 75 },
    ]
  },
  {
    input: 'rec5pic.webp',
    outputs: [
      { name: 'gallery-5-thumb.webp', width: 800, quality: 70 },
      { name: 'gallery-5-full.webp', width: 1200, quality: 75 },
    ]
  },
  {
    input: 'rec6pic.webp',
    outputs: [
      { name: 'gallery-6-thumb.webp', width: 800, quality: 70 },
      { name: 'gallery-6-full.webp', width: 1200, quality: 75 },
    ]
  },
  {
    input: 'rec10pic.webp',
    outputs: [
      { name: 'gallery-10-thumb.webp', width: 800, quality: 70 },
      { name: 'gallery-10-full.webp', width: 1200, quality: 75 },
    ]
  },
  {
    input: 'rec13pic.webp',
    outputs: [
      { name: 'gallery-13-thumb.webp', width: 800, quality: 70 },
      { name: 'gallery-13-full.webp', width: 1200, quality: 75 },
    ]
  },
  // Easter egg - fin.png
  {
    input: 'fin.png',
    outputs: [
      { name: 'fin-optimized.webp', width: 256, quality: 75 },
    ]
  },
];

async function optimizeImage(inputPath, outputPath, options) {
  const { width, quality = 80, format = 'webp' } = options;
  
  try {
    let pipeline = sharp(inputPath).resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });

    if (format === 'avif') {
      pipeline = pipeline.avif({ quality, effort: 6 });
    } else {
      pipeline = pipeline.webp({ quality, effort: 6 });
    }

    await pipeline.toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✓ Created ${path.basename(outputPath)} (${sizeKB}KB)`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${path.basename(inputPath)}:`, error.message);
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  
  for (const { input, outputs } of optimizations) {
    const inputPath = path.join(imgDir, input);
    
    try {
      await fs.access(inputPath);
    } catch {
      console.warn(`⚠ Input file not found: ${input}`);
      continue;
    }

    console.log(`Processing ${input}...`);
    
    for (const output of outputs) {
      const outputPath = path.join(publicImgDir, output.name);
      await optimizeImage(inputPath, outputPath, output);
    }
    
    console.log('');
  }
  
  console.log('Image optimization complete!');
}

main().catch(console.error);
