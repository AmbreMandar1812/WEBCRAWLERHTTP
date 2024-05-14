//Three Process to write test 
// 1. Stub out the function to test

// 2. Write the test for the function

// 3. Go back and implement the meat of the function

const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {

  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  
  console.log(`crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return pages;
    }
    htmlBody = await resp.text();
  } catch (err) {
    console.log(err.message);
  }

  const nextURLs = getURLSfromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages); //recursively calling the function for different links on the page.
  }

  return pages;
}

function getURLSfromHTML(inputBody,baseURL){
    const urls = []
    const dom = new JSDOM(inputBody)
    const urlElements = dom.window.document.querySelectorAll("a");
    // urlElements.push()
    for(const urlElement of urlElements){
        if(urlElement.href.slice(0,1) === '/'){
            try{
                const urlObj = new URL(`${baseURL}${urlElement.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`Error in the relative getURLSfromHTML ${err.message}`)
            }
        }else{
            try {
              const urlObj = new URL(`${urlElement.href}`);
              urls.push(urlObj.href);
            } catch (err) {
              console.log(
                `Error in the absolute getURLSfromHTML ${err.message}`
              );
            }
        }
    }
    return urls
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return `${urlObj.hostname}${urlObj.pathname}`;
}

module.exports = { normalizeURL, getURLSfromHTML, crawlPage };