import { argv } from 'node:process';
import fs from 'fs';
import path from 'path';

//URL for scraping memes
const scrapeSource = 'https://memegen-link-examples-upleveled.netlify.app/';

let digitCount = 0;
let bottomText = '';
let topText = '';
let memePicture = '';

//if folder 'memes' doesn´t exist, create one
if (!fs.existsSync('memes')) {
  fs.mkdirSync('memes');
} else {
  //check existing files to make sure that id is incremented correctly
  const files = fs.readdirSync('memes');

  const file = files.forEach((f) => {
    let maxCount = 0;

    const number = parseInt(f);

    if (number > maxCount) {
      maxCount = number;
    } else {
      //debugging
      console.log(maxCount);
      digitCount = maxCount + 1;
    }
  });
}

//check if there are arguments when running index.js
//and make sure they are complete (top, bottom, picture)
if (argv.length > 4) {
  //assign arguments to variables
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

  //debugging
  //console.log(sourceUrl);

  const response = await fetch(sourceUrl);
  const buffer = await response.arrayBuffer();

  const fileName = String(digitCount + 1).padStart(2, '0') + '.jpg';
  const filePath = path.join('memes', fileName);
  fs.writeFileSync(filePath, Buffer.from(buffer));
} else {
  //no arguments
  const response = await fetch(scrapeSource);
  const html = await response.text();

  const regex = /<img[^>]*src="([^"]+)"/g;

  const imageUrls = [];
  let match;

  let progressCounter = 0;

  while ((match = regex.exec(html)) !== null) {
    if (imageUrls.length === 10) {
      break;
    }

    imageUrls.push(match[1]);
    progressCounter += 10;
    console.log(`Progress: ${progressCounter}%`);
  }

  //debugging
  //console.log(imageUrls);

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const fileName = String(digitCount + i + 1).padStart(2, '0') + '.jpg';
    const filePath = path.join('memes', fileName);

    fs.writeFileSync(filePath, Buffer.from(buffer));
  }
}
