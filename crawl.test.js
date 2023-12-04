const { normalizeURL,getURLsFromHTMl } = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip protocol', () => {
  const input = "https://test.com/test";
  const actual = normalizeURL(input);
  const expected = "test.com/test";
  expect(actual).toEqual(expected);
})

test('normalizeURL trim trailing slash', () => {
    const input = "https://test.com/test/";
    const actual = normalizeURL(input);
    const expected = "test.com/test";
    expect(actual).toEqual(expected);
  })

test('normalizeURL capitals in hostname', () => {
    const input = "https://TeSt.cOm/test/";
    const actual = normalizeURL(input);
    const expected = "test.com/test";
    expect(actual).toEqual(expected);
  })


test('normalizeURL strip protcol', () => {
    const input = "http://TeSt.cOm/test/";
    const actual = normalizeURL(input);
    const expected = "test.com/test";
    expect(actual).toEqual(expected);
  })

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://test.com/test">Test Website</a>
        </body>
    </html>
    `
    const baseURL = "https://test.com";
    const actual = getURLsFromHTMl(inputHTMLBody, baseURL);
    const expected = ["https://test.com/test"];
    expect(actual).toEqual(expected);
  })

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/test">Test Website</a>
        </body>
    </html>
    `
    const baseURL = "https://test.com";
    const actual = getURLsFromHTMl(inputHTMLBody, baseURL);
    const expected = ["https://test.com/test"];
    expect(actual).toEqual(expected);
  })

test('getURLsFromHTML multipleUrls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://test.com/test1">Test Website</a>
            <a href="/test2">Test Website</a>
        </body>
    </html>
    `
    const baseURL = "https://test.com";
    const actual = getURLsFromHTMl(inputHTMLBody, baseURL);
    const expected = ["https://test.com/test1","https://test.com/test2"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalidURL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="test">Test Website</a>
        </body>
    </html>
    `
    const baseURL = "https://test.com";
    const actual = getURLsFromHTMl(inputHTMLBody, baseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})