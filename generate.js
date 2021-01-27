const puppeteer = require('puppeteer');
var fs = require("fs");
const axios = require('axios');

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

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 880, height: 528 });
    await page.goto('file://C:/Users/libik/Desktop/IT/repos/imagesGenerateFromHtml/template.html');
    await page.evaluate(() => {
      document.querySelector('body').classList.add('black')
    });
    await page.waitForSelector('.weatherCast');

    await page.screenshot({ path: './blackImage.png'})


    await page.screenshot({ path: './redImage.png'})

    await browser.close();

    const blackImage = fs.readFileSync('./blackImage.png');
    const base64BlackImage = new Buffer.from(blackImage).toString('base64');

    const redImage = fs.readFileSync('./redImage.png');
    const base64RedImage = new Buffer.from(redImage).toString('base64');
    return postImages({ redImage: base64RedImage, blackImage: base64BlackImage })

})();