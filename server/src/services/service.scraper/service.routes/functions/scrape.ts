/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

// @ts-nocheck

import puppeteer from 'puppeteer';
import cheerio   from 'cheerio';
import pretty from 'pretty';

const delay = ( t ) => new Promise(resolve => setTimeout(resolve, t));


/**
 * @param Url 
 * @description scrape the reviews from a google business page using the pupeteteer package.
 * @returns an array of reviews.
**/


const scrollDown = async ( page ) => {
    const scrollable_section = '.review-dialog-list';
    await page.waitForSelector('.review-dialog-list');
    await page.evaluate( selector => {
        const scrollableSection = document.querySelector(selector);
        scrollableSection.scrollTop += 3000;
    }, scrollable_section);
}


async function scrapeGoogle ( Url : string ) {

    // launch page in a new window for testing / debuging.
    const browser = await puppeteer.launch({  headless: false });
    const page = await browser.newPage();
  
    // navigate to URL, accept google cookies and open the google reviews.
    await page.goto( Url );
    await page.click('#L2AGLb');

    // make sure google reviews popup class is correct. else state it is not.

    // open google reviews,
    await page.click("span.hqzQac a");

    // perform scrolling of review box.
    await scrollDown( page );

    // grab reviews once clicked popup is visible.
    const fetchedHTML = await page.waitForSelector('.P5Bobd').then( async ( ) => {
        console.log('waited for element to be visible');  
        return await page.$eval('.gws-localreviews__general-reviews-block', el => el.outerHTML);
    });

    // pass scraped data from pupeteer to cheerio.
    const $ = cheerio.load( fetchedHTML );

    const data = [ ];

    $('.WMbnJf').each( function ( element ) {
        data.push({
            name:   $( this ).find('.TSUbDb').text(),
            review: $( this ).find('.Jtu6Td').text(),
            stars:  $( this ).find('.EBe2gf').attr('aria-label'),
            avatar: $( this ).find('.lDY1rd').attr('src')
        });
    });

    return {
        data : data
    }
}

export default scrapeGoogle;