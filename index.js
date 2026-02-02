import fs from 'node:fs';
import path from 'node:path';

//  URL for scraping memes
const scrapeSource = 'https://memegen-link-examples-upleveled.netlify.app/';
const digitCount = 0;

//  if folder 'memes' doesn´t exist, create one
if (!fs.existsSync('memes')) {
  fs.mkdirSync('memes');
}

//  no arguments
const resp = await fetch(scrapeSource);
const html = await resp.text();

const regex = /<img[^>]*src="([^"]+)"/g;

const imageUrls = [];
let match;

let progressCounter = 0;

while ((match = regex.exec(html)) !== null) {
  if (imageUrls.length === 10) {
    break;
  }

  const cleanUrl = match[1];
  imageUrls.push(cleanUrl);
  progressCounter += 10;
  console.log(`Progress: ${progressCounter}%`);
  console.log(cleanUrl);
}

for (let i = 0; i < imageUrls.length; i++) {
  const imageUrl = imageUrls[i];
  console.log(imageUrl);

  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const fileName = String(digitCount + i + 1).padStart(2, '0') + '.jpg';
  const filePath = path.join('memes', fileName);

  fs.writeFileSync(filePath, Buffer.from(buffer));
}
