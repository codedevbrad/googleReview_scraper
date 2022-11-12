/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import cheerio from 'cheerio';


const pageElementSelectors = {
    cookieAccept: "#L2AGLb" , 
     reviewModal: "span.hqzQac a" ,
     htmlToScrape: {
         waitForSelector: '.P5Bobd' , 
        retreiveSelector: '.gws-localreviews__general-reviews-block'
     },
     review: {
          nameSelector: '.TSUbDb' ,
        reviewSelector: '.Jtu6Td' ,
         starsSelector: '.EBe2gf' , 
        avatarSelector: '.lDY1rd' , 
     }
}


async function googleAcceptCookies ({ page , debugging }) {
     // navigate to URL, accept google cookies and open the google reviews.
     // first, check if element exists
     const canClick = await page.$( pageElementSelectors.cookieAccept );

     if ( canClick !== null ) {
        console.log('can accept cookies');
        // navigate to URL, accept google cookies and open the google reviews.
        await page.click( pageElementSelectors.cookieAccept );
        return true;
    }
    return false;
}


async function googleOpenReviews( page ) {
     // open google reviews.
     const canOpen = await page.$( pageElementSelectors.reviewModal );
     if ( canOpen !== null ) {
        console.log('can open modal to view reviews');
        await page.click( pageElementSelectors.reviewModal );
        return true;
    }
    return false;
}


async function googleScrapeReviews( html ) {
     // pass scraped data from pupeteer to cheerio.
     const $ = cheerio.load( html );

     const data = [ ];
 
     $('.WMbnJf').each( function ( ) {
         data.push({
             name:   $( this ).find( pageElementSelectors.review.nameSelector   ).text(),
             review: $( this ).find( pageElementSelectors.review.reviewSelector ).text(),
             stars:  $( this ).find( pageElementSelectors.review.starsSelector  ).attr('aria-label'),
             avatar: $( this ).find( pageElementSelectors.review.avatarSelector ).attr('src')
         });
     });
     
     return data;
}

export {
    googleAcceptCookies , googleOpenReviews , googleScrapeReviews , pageElementSelectors 
}