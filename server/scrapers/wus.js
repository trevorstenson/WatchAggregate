var rp = require('request-promise');
var $ = require('cheerio');
var url = 'https://forums.watchuseek.com/f29/i1.html';

var db = require('../database');

function getInfo(title, href) {
    let obj = {title: title, link: href, price: ""};
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
                $("div[class='rating0 nonsticky']", html).each(function () {
                    href = $(this).find("a[class='title']").attr('href');
                    title = $(this).find("a[class='title']").text();
                    getInfo(title, href)
                        .then((obj) => {
                            db.addListing(obj);
                        })
                        .catch((error) => console.log(error));
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    });
    console.log('wus done');
}

module.exports = scrape;