//Three Process to write test 
// 1. Stub out the function to test

// 2. Write the test for the function

// 3. Go back and implement the meat of the function

const {JSDOM} = require('jsdom')

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

module.exports = { normalizeURL,getURLSfromHTML };