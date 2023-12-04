const {JSDOM} = require('jsdom');

function getURLsFromHTMl(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    for (const linkElement of linkElements){
        urls.push(normalizeURL(linkElement.href));
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
    getURLsFromHTMl

}
