var rp = require('request-promise');
var $ = require('cheerio');
var url = 'https://www.reddit.com/r/Watchexchange/new/';
var db = require('../database');

//gets necessary information from listing page and returns that through a promise
function getInfo(title, href) {
    var obj = {title : title, link : href, price : ""};
    return new Promise((resolve, reject) => {
        rp(href)
            .then(function (html) {
                let m = $.load(html).text().match(/\$((\d,?){1,8})/g);
                if (m) obj.price = m[0].replace('$','');
                resolve(obj);
            })
            .catch(function (error) {
                reject(error);
            })
    })
}

//scrapes reddit new page for listings and gets all information
function scrape() {
    let title, href = "";
    db.connectToServer(function () {
        rp(url)
            .then(function (html) {
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