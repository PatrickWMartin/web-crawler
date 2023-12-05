const {JSDOM} = require('jsdom');

async function crawlPage(currentURL){
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399){
            console.log(`Error in fetching ${currentURL} returned status code ${resp.status}`)
            return
        }
        const contentType = resp.headers.get('content-type');
        if (contentType.includes("text/html")){
            console.log(`non html response for ${currentURL}`)
        }
        console.log(await resp.text());
        
   } catch (error) {
        console.log(`Error in fetching ${currentURL}`); 
   } 
}

function getURLsFromHTMl(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    for (const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href); 
            } catch (error) {
                console.log("Invalid URL")
            }
        }else{
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href); 
            } catch (error) {
                console.log("Invalid URL")
            }
        }
    }
    return urls;
}

function normalizeURL(urlSting){
    const urlObj = new URL(urlSting)

    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1);
    }
    return hostPath;

}

module.exports = {
    normalizeURL,
    getURLsFromHTMl,
    crawlPage

}
