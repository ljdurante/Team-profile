const axios = require("axios");
const fs = require("fs");
const path = require("path");
const puppeteer= require("puppeteer");

const askQuestion = require("./questions");
const generateHTML = require("./generateHTML");
 
async function apiCall(username,color){
   
    const queryURl = `https://api.github.com/users/${username}`;
    const response = await axios.get(queryURl);



    const queryURL1 = `https://api.github.com/users/${username}/starred`;
    const response1 = await axios.get(queryURL1);

    

    await generateHTML(username,color,response,response1);

  
const generatePDF = async (color, generateHTML) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        path: `${username}-PDF.pdf`,
        format: `A4`
    };

    const contentHtml = await fs.readFileSync(path.resolve(__dirname, `${username}.html`)).toString('utf-8');
    await page.setContent(contentHtml);
    await page.waitForSelector('main');

    await page.pdf(options);
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    await page.close();
    await browser.close();

}


generatePDF();

};

module.exports = apiCall;