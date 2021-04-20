const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function generateThumbnail(directory, file, thumbnail) {
    const thumbnailFile = `${directory}/${file}${thumbnail}`
    console.log('Creating thumbnail for ' + file + ' - ' + thumbnailFile)
    sharp(`${directory}/${file}`)
        .resize(150, 150) 
        .toFile(thumbnailFile)
}

function generateOptimisedIntroImage(directory, file, opt) {
    const optFile = `${directory}/${file}${opt}`
    console.log('Creating optimised ' + file + ' - ' + optFile)
    sharp(`${directory}/${file}`)
        .resize(650, 300) 
        .toFile(optFile)
}

const file = process.argv[2];

if (!file) {
    console.error ('Please pass the image name.')
    console.error ('e.g. create-intro-image.js foo.jpg')
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

const optJpg = '-intro-image.jpg';
const optWebP = '-intro-image.webp';
const thumbnail = '-thumbnail.jpg';

generateThumbnail(directory, fileName, thumbnail)
generateOptimisedIntroImage(directory, fileName, optJpg)
generateOptimisedIntroImage(directory, fileName, optWebP)


