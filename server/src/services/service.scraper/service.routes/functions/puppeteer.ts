/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import puppeteer from 'puppeteer';


async function puppeteerLoadPage ( { Url , headless } ) {
    // launch page in a new window for testing / debuging.
    const browser = await puppeteer.launch({ headless: headless });
    const page = await browser.newPage();
    await page.goto( Url );
    return page;
}

const puppeteerScrollDown = async ( page , scrollBarSelector ) => {
    const scrollable_section = scrollBarSelector;
    await page.waitForSelector( scrollBarSelector );
    await page.evaluate( selector => {
        const scrollableSection = document.querySelector(selector);
        scrollableSection.scrollTop += 3000;
    } , scrollable_section);
}


async function puppeteerWaitandRetrieve( page , { waitForSelector , retreiveSelector } ) {
    const fetchedHTML = await page.waitForSelector( waitForSelector ).then( async ( ) => { 
        return await page.$eval( retreiveSelector , el => el.outerHTML);
    });
    return fetchedHTML;
}

export {
    puppeteerLoadPage , puppeteerScrollDown , puppeteerWaitandRetrieve
}