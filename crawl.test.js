const { normalizeURL } = require('./crawl.js');
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