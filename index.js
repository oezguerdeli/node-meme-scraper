import fs from 'node:fs';
import path from 'node:path';
import { argv } from 'node:process';

//  URL for scraping memes
const scrapeSource = 'https://memegen-link-examples-upleveled.netlify.app/';

let digitCount = 0;
let bottomText = '';
let topText = '';
let memePicture = '';

//  if folder 'memes' doesn´t exist, create one
if (!fs.existsSync('memes')) {
  fs.mkdirSync('memes');
} else {
  //  check existing files to make sure that id is incremented correctly
  const files = fs.readdirSync('memes');

  files.forEach((f) => {
    let maxCount = 0;

    const number = parseInt(f);

    if (number > maxCount) {
      maxCount = number;
    } else {
      //  debugging
      console.log(maxCount);
      digitCount = maxCount + 1;
    }
  });
}

//  check if there are arguments when running index.js
//  and make sure they are complete (top, bottom, picture)
if (argv.length > 4) {
  //  assign arguments to variables
  bottomText = argv[2];
  topText = argv[3];
  memePicture = argv[4];

  const sourceUrl =
    'https://memecomplete.com/edit/images/' +
    memePicture +
    '/' +
    topText +
    '/' +
    bottomText +
    '.jpg';

  const resp = await fetch(sourceUrl);
  const buffer = await resp.arrayBuffer();

  const fileName = String(digitCount + 1).padStart(2, '0') + '.jpg';
  const filePath = path.join('memes', fileName);
  fs.writeFileSync(filePath, Buffer.from(buffer));
} else {
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

    const cleanUrl = match[1].split('?')[0];
    imageUrls.push(cleanUrl);
    progressCounter += 10;
    console.log(`Progress: ${progressCounter}%`);
    //  console.log(cleanUrl);
  }

  //  debugging
  //  console.log(imageUrls);

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const fileName = String(digitCount + i + 1).padStart(2, '0') + '.jpg';
    const filePath = path.join('memes', fileName);

    fs.writeFileSync(filePath, Buffer.from(buffer));
  }
}
