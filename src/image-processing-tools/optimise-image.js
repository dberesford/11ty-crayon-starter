const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function generateOptimisedImage(directory, file, opt) {
    const optFile = `${directory}/${file}${opt}`
    console.log('Creating optimised ' + file + ' - ' + optFile)
    sharp(`${directory}/${file}`)
        .resize(700, 500) 
        .toFile(optFile)
    return `${file}${opt}`
}

const file = process.argv[2];

if (!file) {
    console.error ('Please pass the image name.')
    console.error ('e.g. optimise-image.js ./src/posts/foo/foo.jpg')
    process.exit(-1)
}

if (!fs.existsSync(file)) {
    console.error('File does not exist: ' + file)
    process.exit(-1)
}

if (fs.lstatSync(file).isDirectory()) {
    console.error('File is a directory, please pass an image file name.')
    process.exit(-1)
}

const directory = path.dirname(file)
const fileName = path.basename(file)

const optJpg = '-700-500.jpg';
const optWebP = '-700-500.webp';

const jpgFile = generateOptimisedImage(directory, fileName, optJpg)
const webpFile = generateOptimisedImage(directory, fileName, optWebP)

const element = `
<picture>
  <source srcset="${webpFile}" type="image/webp">
  <source srcset="${jpgFile}" type="image/jpeg">
  <img alt="${fileName}" src="${jpgFile}" loading="lazy">
</picture>
`
console.log(element)

