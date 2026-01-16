import { argv } from 'node:process';
import fs from 'fs';
import path from 'path';

//URL for scraping memes
const scrapeSource = 'https://memegen-link-examples-upleveled.netlify.app/';

//just as an example for customizing meme
const exampleCustomMeme =
  'https://memecomplete.com/custom/?key=https://api.memegen.link/images/success/when_you_say_youre_just_going_for_a_light_jog/but_end_up_running_for_your_life.jpg&editing=true';

//first goal, scraping the first 10 images and save it in the folder /memes with 2 digits like 01.jpg, 02.jpg

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
      digitCount = maxCount;
    }
  });
}

//check if there are arguments when running index.js
//and make sure they are complete (top, bottom, picture)
if (argv.length > 4) {
  //assign arguments to variables
  bottomText = argv[2];
  topText = argv[3];
  memePicture = argv[3];
} else {
  //no arguments
}
