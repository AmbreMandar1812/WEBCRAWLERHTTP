const {normalizeURL,getURLSfromHTML} = require('./crawl.js')
const {test,expect} = require('@jest/globals')

test('normalizeURL strip protocol',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
 

test("getURLS from HTML absolute", () => {
  const inputHTMLBody = `
  <html>
   <body> 
    <a href = "https://blog.boot.dev/path">
      Blog Boot DEV
    </a>
   </body>
  </html>
  `
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLSfromHTML(inputHTMLBody,inputBaseURL);
  const expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getURLS from HTML relative", () => {
  const inputHTMLBody = `
  <html>
   <body> 
    <a href = "/path/">
      Blog Boot DEV
    </a>
   </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLS from HTML both ", () => {
  const inputHTMLBody = `
  <html>
   <body> 
    <a href = "https://blog.boot.dev/path1/">
      Blog Boot DEV 1
    </a>
    <a href = "/path2/">
      Blog Boot DEV 2
    </a>
   </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLS from HTML invalid", () => {
  const inputHTMLBody = `
  <html>
   <body> 
    <a href = "invalid">
      Blog Boot DEV
    </a>
   </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});