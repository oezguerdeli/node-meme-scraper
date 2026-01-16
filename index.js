import { argv } from 'node:process';
import fs from 'fs';
import path from 'path';

//URL for scraping memes
const scrapeSource = 'https://memegen-link-examples-upleveled.netlify.app/';

//just as an example for customizing meme
const exampleCustomMeme =
  'https://memecomplete.com/custom/?key=https://api.memegen.link/images/success/when_you_say_youre_just_going_for_a_light_jog/but_end_up_running_for_your_life.jpg&editing=true';

//first goal, scraping the first 10 images and save it in the folder /memes with 2 digits like 01.jpg, 02.jpg

//check if folder 'memes' exists
const downloadDirectory = path.join(process.cwd(), 'memes');

//if folder 'memes' doesn´t exist, create one
if (!fs.existsSync(downloadDirectory)) {
  fs.mkdirSync(downloadDirectory);
}

if (argv[2] === undefined) {
  // Random color will be used with random hue and luminosity
} else if (argv.length === 3) {
  // Hue is taken from command line, luminosity is random
  inputHue = argv[2];
} else if (argv.length > 3) {
  // Hue and luminosity is taken from command line
  inputLuminosity = argv[3];
  inputHue = argv[2];
}
