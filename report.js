function sortPages(pages){
    const pageObject = Object.entries(pages);
    
    pageObject.sort((a,b) => {
        aHits = a[1];
        bHits = b[1];
        
        return bHits - aHits;
    });
    
    return pageObject;

}


module.exports = {
    sortPages
}