var rp = require('request-promise');
var $ = require('cheerio');
var url = 'https://www.reddit.com/r/Watchexchange/new/';

var db = require('../database');

function getInfo(title, href) {
    var obj = {title : title, link : href, price : ""};
    return new Promise((resolve, reject) => {
        rp(href)
            .then(function (html) {
                let m = $.load(html).text().match(/\$((\d,?){1,8})/g);
                if (m) obj.price = m[0];
                resolve(obj);
            })
            .catch(function (error) {
                reject(error);
            })
    })
}

function scrape() {
    let title, href = "";
    db.connectToServer(function () {
        rp(url)
            .then(function (html) {
                console.log('successfully scraped');
                $("div[class~='Post']", html).each(function () {
                    href = 'https://www.reddit.com' + $(this).find("a[data-click-id='comments']").attr('href');
                    title = $(this).find("h2").text();
                    getInfo(title, href)
                        .then((obj) => {
                            db.addListing(obj);
                        })
                        .catch((error) => console.log(error));
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    });
    console.log('reddit done');
}

module.exports = scrape;