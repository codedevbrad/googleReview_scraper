/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { puppeteerLoadPage , puppeteerScrollDown , puppeteerWaitandRetrieve } from './puppeteer'; 
import { googleAcceptCookies , googleOpenReviews , googleScrapeReviews } from './page';

import { pageElementSelectors } from '../functions/page';


/**
 * @param Url 
 * @description scrape the reviews from a google business page using the pupeteteer package.
 * @returns an array of review objects { name : string , review: string , stars: string , avatar: string }.
**/


async function scrapeGoogle ({ url } : { url : string }) {
  
    // launch page in a new window for testing / debuging.
    const page = await puppeteerLoadPage({ Url : url , headless: false });
    
    // navigate to URL, accept google cookies and open the google reviews.
    await googleAcceptCookies({ page : page , debugging: false });
    // open google reviews modal,
    await googleOpenReviews( page );
    // scroll down the page to load more reviews.
    await puppeteerScrollDown( page , '.review-dialog-list' );
     // grab reviews once clicked popup is visible.
    const html = await puppeteerWaitandRetrieve( page , { 
         waitForSelector: pageElementSelectors.htmlToScrape.waitForSelector , 
        retreiveSelector: pageElementSelectors.htmlToScrape.retreiveSelector
    });

    const reviews = await googleScrapeReviews( html ); 

    return {
        data : reviews
    }
}

export default scrapeGoogle;