//Three Process to write test 
// 1. Stub out the function to test
function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
    return `${urlObj.hostname}${urlObj.pathname}`
}

module.exports = {normalizeURL}
// 2. Write the test for the function

// 3. Go back and implement the meat of the function