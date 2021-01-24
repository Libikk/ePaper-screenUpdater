var fs = require("fs");
const nodeHtmlToImage = require('node-html-to-image')
  var htmlFile = fs.readFileSync("./template.html", "utf-8");

  nodeHtmlToImage({
    html: htmlFile,
    content: [
      { color: 'red', name: 'Pierre', output: './imageBlack.png' },
      { name: 'Paul', output: './imageRed.png' }
    ]
  })
  .then((e) => {
    console.log('The image was created successfully!', e)
    var nodeHtmlToImage = Buffer.from(e, 'base64'); // Ta-da
    const base64 = nodeHtmlToImage.toString('base64');
    console.log('🚀 ~ file: generate.js ~ line 23 ~ .then ~ base64', base64);
    // return require('fs').rename('./image.png', './image.bmp', (err) => {
    //   console.log('🚀 ~ file: generate.js ~ line 22 ~ returnrequire ~ err', err);
    // })
    const image = fs.readFileSync('./imageRed.png');
    const base64Image = new Buffer.from(image).toString('base64');
    console.log('🚀 ~ file: generate.js ~ line 22 ~ .then ~ base64Image', base64Image);
  })
  .then(e => {
    console.log('🚀 ~ file: generate.js ~ line 29 ~ e', e);

  })
  .catch(console.error)
