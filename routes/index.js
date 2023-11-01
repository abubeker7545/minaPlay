/* eslint no-console: off */
var express = require("express");
var fs = require("fs");
var router = express();
var cors = require("cors");
const axios = require("axios");
const puppeteer = require("puppeteer");
const sleep = require("sleep-promise");

/* eslint no-console: on */
router.get("/news", async (req, res) => {
  try {
    console.log(req.query.url);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://minaplay.com/');
    await sleep(5000);
    await page.screenshot({ path: "homepage.png" , fullPage: true});
    const [button2] = await page.$x("//button[contains(., 'Login')]");
    if (button2) {
      await button2.click();
    }
    await sleep(5000);
    await page.screenshot({ path: "signin.png", fullPage: true });
    const [button1] = await page.$x("//button[contains(., 'I understand')]");
    if (button1) {
      await button1.click();
    }
    console.log('singup page loaded')
    await page.type("#email", "abubekermubarek7545@gmail.com");
    await page.type("#password", "mubark7545");
    await page.click('[type="submit"]');
    console.log('submited')
    // await page.waitForNavigation()
    await sleep(10000);
    await page.screenshot({ path: "logged.png" , fullPage: true});
    // const paragraphs = await page.evaluate(() => {
    //   const status = document.querySelector('h1[class="my-2 font-bold text-start"]');

    //  console.log(status);
    // });
    await page.click('[class="w-full aspect-video overflow-hidden rounded-xl "]');
    await sleep(30000);
    await page.screenshot({ path: "video.png" , fullPage: true});
    console.log('oppend')
    const [button3] = await page.$x("//button[contains(., 'Play')]");
    if (button3) {
      await button3.click();
    }
    
    await sleep(100000);
    await page.screenshot({ path: "count.png" , fullPage: true});
    const status = document.querySelector('iframe[id="player"]');
    console.log(status);

    // const [title] = await page.$x("//iframe[contains(., 'player')]");
    // console.log(title);
    await sleep(10000);
    await browser.close();
  } catch (err) {
    console.log("error", err);
    res.header("Access-Control-Allow-Origin", "*");
    res.end(req.query.url);
  }
});

module.exports = router;
  1111