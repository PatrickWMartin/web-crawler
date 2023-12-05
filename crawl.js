const {JSDOM} = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){
    
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }
    const normalizeCurrentURL = normalizeURL(currentURL);
    if(pages[normalizeCurrentURL] > 0){
        pages[normalizeCurrentURL]++;
        return pages;
    }
    
    pages[normalizeCurrentURL] = 1;
    console.log(`Activly Crawling: ${currentURL}`);


    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399){
            console.log(`Error in fetching ${currentURL} returned status code ${resp.status}`)
            return pages
        }
        const contentType = resp.headers.get('content-type');
        if (!contentType.includes("text/html")){
            console.log(`non html response for ${currentURL}`)
            return pages
        }
        
        const htmlBody = await resp.text();

        const nextURLs = getURLsFromHTMl(htmlBody, baseURL);

        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages);
        }
        
   } catch (error) {
        console.log(`Error in fetching ${currentURL}`); 
   } 

   return pages;
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
