/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { puppeteerLoadPage , puppeteerWaitandRetrieve } from '../service.routes/functions/puppeteer';
import { googleAcceptCookies , googleOpenReviews , googleScrapeReviews } from '../service.routes/functions/page';
import { describe, expect, test } from '@jest/globals';

import { pageElementSelectors } from '../service.routes/functions/page';

const url = "https://www.google.com/search?authuser=3&sxsrf=ALiCzsZU-v8k1AsgbzkHUFPT634TZNQmig%3A1667666384799&q=UPVC%20Window%20and%20Door%20Repairs&stick=H4sIAAAAAAAAAONgU1I1qDAxMTA0Mkm1SEsxsjQxSLS0MqhIM0lNMUtJMTVLsjRLM0gzX8QqExoQ5qwQnpmXkl-ukJiXouCSn1-kEJRakJhZVAwAsWaQAkgAAAA&mat=CR5vQE98A5AJ&ved=2ahUKEwif2OCzvZf7AhWCSkEAHQiVDUoQrMcEegQIERAG";


describe('scraper tests', () => {

    let page;

    beforeEach( async ( ) => {
        page = await puppeteerLoadPage({ Url : url , headless: true });
    });

    afterEach( async () => {
        await page.close();
    });
    
    // can accept cookies
    // can open rewviews.
    // can get html. 
    // html contains correct elements.

    test('can click and cookies popup', async ( ) => {
        const test_boolean = await googleAcceptCookies({ page , debugging: false });
        expect( test_boolean ).toBe(true);
    });

    test('can then open google reviews' , async ( ) => {
        await googleAcceptCookies({ page , debugging: false });
        const test_boolean = await googleOpenReviews( page );
        expect( test_boolean ).toBe(true);
    });

    test('can scrape reviews using stored selectors' , async ( ) => { 
        await googleAcceptCookies({ page , debugging: false });
        await googleOpenReviews( page );

        // grab reviews once clicked popup is visible.
        const html = await puppeteerWaitandRetrieve( page , { 
            waitForSelector: pageElementSelectors.htmlToScrape.waitForSelector , 
           retreiveSelector: pageElementSelectors.htmlToScrape.retreiveSelector
        });
        const reviews = await googleScrapeReviews( html ); 
        expect( reviews.length).toBeGreaterThan(0);
    });
});