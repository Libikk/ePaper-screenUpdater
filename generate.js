var fs = require("fs");
const axios = require('axios');
const nodeHtmlToImage = require('node-html-to-image')
const htmlFile = fs.readFileSync("./template.html", "utf-8");

const postImages = ({ redImage, blackImage }) => {
  // const postData = {};
  // if (redImage) postData.redImage = `data:image/png;base64,${redImage}`
  // if (blackImage) postData.blackImage = `data:image/png;base64,${blackImage}`

  // return axios.post('http://192.168.0.161:9999/imagesUpload',postData )
  // .then((res) => {
  //   if (res.statusCode === 200) {
  //     console.log('Update completed')
  //   } else {
  //     console.log('jakis kurwa error', res)
  //   }
  // })
  // .catch(console.error);

}


  nodeHtmlToImage({
    html: htmlFile,
    content: [
      { isRed: false, output: './blackImage.png', lastUpdated: new Date().toLocaleString() },
      { isRed: true, output: './redImage.png' }
    ]
  })
  .then((e) => {
    console.log('The image was created successfully!', e)
    const blackImage = fs.readFileSync('./blackImage.png');
    const base64BlackImage = new Buffer.from(blackImage).toString('base64');

    const redImage = fs.readFileSync('./redImage.png');
    const base64RedImage = new Buffer.from(redImage).toString('base64');
    return postImages({ redImage: base64RedImage, blackImage: base64BlackImage })
  })
  .catch(console.error)
