var fs = require("fs");
const axios = require('axios');
const nodeHtmlToImage = require('node-html-to-image')
const htmlFile = fs.readFileSync("./template.html", "utf-8");

const postImages = ({ redImage, blackImage }) => {
  const postData = {};
  if (redImage) postData.redImage = `data:image/png;base64,${redImage}`
  if (blackImage) postData.blackImage = `data:image/png;base64,${blackImage}`

  return axios.post('http://192.168.0.161:9999/imagesUpload',postData )
  .then((res) => {
    if (res.statusCode === 200) {
      console.log('Update completed')
    } else {
      console.log('jakis kurwa error', res)
    }
  })
  .catch(console.error);

}


  nodeHtmlToImage({
    html: htmlFile,
    content: [
      { isRed: true, name: 'Pierre', output: './imageBlack.png' },
      { isRed: false, name: 'Paul', output: './imageRed.png' }
    ]
  })
  .then((e) => {
    console.log('The image was created successfully!', e)



    const imageBlack = fs.readFileSync('./imageBlack.png');
    const base64ImageBlack = new Buffer.from(imageBlack).toString('base64');

    const imageRed = fs.readFileSync('./imageRed.png');
    const base64ImageRed = new Buffer.from(imageRed).toString('base64');
    return postImages({ redImage:base64ImageRed, imageBlack: base64ImageBlack })
  })
  .then(e => {
  console.log('🚀 ~ file: generate.js ~ line 29 ~ e', e);


  })
  .catch(console.error)
