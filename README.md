# googleReview_scraper ( Typescript , Puppeteer ).

API developed in TS uses Puppeteer to scrape the google reviews of a business.
 1. opens a new headless browser navigating to a busness page on google.
 2. accepts the cookies popup window.
 2. clicks the 'read reviews' popup and scrolls down to trigger the loading and display of more reviews.
 3. scrapes the HTML for the reviews and is loaded into Cheerio.
 4. cheerio loops through HTML and constructs review JSON for API.


https://user-images.githubusercontent.com/46296577/200371644-647061c1-4931-45cd-b07a-918126a8143b.mp4


## issues.

- Used puppeteer to do click events but found querying the data to not work. I had to wait for the element to be visible even though both the click and query were await async.
- Puppeteer is quite hard to do Dom manipulation so I managed to get the HTML and load with Cheerio.
- Found using Cheerio with typescript quite challenging. Issues like “this” in for loops and such.
- Not sure how to get more content to load by triggering scroll down of a page element.
- Simulating a scroll does not fetch the latest data. We simulate a scroll but it wont do it multiple times + we can’t fetch newly added content once scrolled.

## What needs to be done.

- [x]  Pass some dummy html containing divs with child elements to cheerio and grab the children and save the data. Push this data to an array.
- [x]  Simulate element scroll for puppeteer.
- [ ]  Use mutation observer for scroll triggering refetching.
- [ ]  Figure way to get newest content.


```javascript
{
  "data": [
    {
      "name": "Christine Locock",
      "review": "Service was excellent, staff were polite and friendly, and offered helpful advice for maintenance of windows and improving of insulation on the doors. The price seemed fairly competitive (though I'm not an expert) and the 2 year guarantee gives extra peace of mind.  Very happy and will definitely  use them again.",
      "stars": "Rated 5.0 out of 5,",
      "avatar": "https://lh3.googleusercontent.com/a/ALm5wu1kVNOaR603q_ghB4wJCprtlKagt-NbjMZH3o-u=s40-c-c0x00000000-cc-rp-mo-br100"
    },
    {
      "name": "Singing Stars",
      "review": "Absolutely fabulous service from wonderful Christine. She is so polite, helpful & efficient.  Amazing George who was very professional & helpful & did an excellent job.  Fairly priced & very reliable too.  I will definitely highly recommend them & always use them in the future.",
      "stars": "Rated 5.0 out of 5,",
      "avatar": "https://lh3.googleusercontent.com/a/ALm5wu0z6K5VOAzOHfootrWLqUQ_e98Rk58gOwuap19U=s40-c-c0x00000000-cc-rp-mo-br100"
    },
    {
      "name": "Anne Fisher",
      "review": "We had a window that wasn’t fitting properly. This company came, discovered the problem, gave me a fair price and then carried out the repair in a timely manner. Very pleasant guys.Would recommend them.",
      "stars": "Rated 5.0 out of 5,",
      "avatar": "https://lh3.googleusercontent.com/a/ALm5wu1njmqWVeNwdKgaUb0VC09cJhazr2-zGWCtkZQE=s40-c-c0x00000000-cc-rp-mo-br100"
    }
  ]
}
```
