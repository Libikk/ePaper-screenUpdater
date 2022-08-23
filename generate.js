const puppeteer = require("puppeteer");
const Jimp = require("jimp");
const path = "../e-Paper/RaspberryPi_JetsonNano/python/myImages";

(async () => {
  // installation
  // https://samiprogramming.medium.com/puppeteer-on-raspbian-nodejs-3425ccea470e
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: "/usr/bin/chromium-browser",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 880, height: 528 });
  await page.goto(`file://${__dirname}/build/index.html`, {
    waitUntil: "networkidle2",
  });
  // await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
  await page.evaluate(async () => {
    document.querySelector(".rootContainer").classList.add("red");
    document.querySelector(".rootContainer").classList.remove("black");
  });
  await page.screenshot({ path: `./redImage.png` });

  await page.evaluate(async () => {
    document.querySelector(".rootContainer").classList.remove("red");
    document.querySelector(".rootContainer").classList.add("black");
  });
  await page.screenshot({ path: `./blackImage.png` });

  await browser.close();

  // todo resolve this crap
  Jimp.read("./redImage.png", (err, lenna) => {
    if (err) throw err;
    return lenna.writeAsync(`${path}/redImage.bmp`); // save
  });

  Jimp.read("./blackImage.png", (err, lenna) => {
    if (err) throw err;
    return lenna.writeAsync(`${path}/blackImage.bmp`); // save
  });
  await new Promise((r) => setTimeout(r, 5000));
  // todo resolve this crap
})();
