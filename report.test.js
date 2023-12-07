const { sortPages } = require('./report.js');
const {test, expect} = require('@jest/globals');

test('test sortPages', ()=>{
    const input = {
        'https://test.com': 3,
        'https://test2.com': 2,
        'https://test3.com': 5,
    };

    const actual = sortPages(input);
    const expected = [['https://test3.com', 5], ["https://test.com", 3], ['https://test2.com', 2]];
    expect(actual).toEqual(expected);
});
