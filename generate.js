const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');

const postImages = ({ redImage, blackImage }) => {
  const postData = {};
  if (redImage) postData.redImage = `data:image/png;base64,${redImage}`;
  if (blackImage) postData.blackImage = `data:image/png;base64,${blackImage}`;
  console.log('Start uploading');
  return axios.post('http://192.168.0.161:9999/imagesUpload', postData)
    .then((res) => {
      console.log('Update status:', res.data);
    })
    .catch(console.error);
};

(async () => {
  // installation
  // https://samiprogramming.medium.com/puppeteer-on-raspbian-nodejs-3425ccea470e
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium-browser',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 880, height: 528 });
  await page.goto(`file://${__dirname}/dist/index.html`, { waitUntil: 'networkidle2' });
  // await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
  await page.evaluate(async () => {
    document.querySelector('.rootContainer').classList.add('red');
    document.querySelector('.rootContainer').classList.remove('black');
  });
  await page.screenshot({ path: './redImage.png' });

  await page.evaluate(async () => {
    document.querySelector('.rootContainer').classList.remove('red');
    document.querySelector('.rootContainer').classList.add('black');
  });
  await page.screenshot({ path: './blackImage.png' });

  await browser.close();

  const blackImage = fs.readFileSync('./blackImage.png');
  const base64BlackImage = new Buffer.from(blackImage).toString('base64');

  const redImage = fs.readFileSync('./redImage.png');
  const base64RedImage = new Buffer.from(redImage).toString('base64');
  return postImages({ redImage: base64RedImage, blackImage: base64BlackImage });
})();
