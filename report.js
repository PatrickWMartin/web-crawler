function sortPages(pages){
    const pageObject = Object.entries(pages);
    
    pageObject.sort((a,b) => {
        aHits = a[1];
        bHits = b[1];
        
        return bHits - aHits;
    });
    
    return pageObject;

}

function printReport(pages){
    console.log("==========================");
    console.log("REPORT");
    console.log("==========================");

    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages){
        const url = sortedPage[0];
        const numOfHits = sortedPage[1];

        console.log(`Found ${numOfHits} links to page: ${url}`);
    }

    console.log("==========================");
    console.log("END REPORT");
    console.log("==========================");
}


module.exports = {
    sortPages,
    printReport
}