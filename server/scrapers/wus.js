var rp = require('request-promise');
var $ = require('cheerio');
var url = 'https://forums.watchuseek.com/f29/i1.html';

var db = require('../database');

//gets necessary information from listing page and returns that through a promise
function getInfo(title, href) {
    let obj = {title: title, link: href, price: ""};
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

//scrapes wus forum new page for listings and gets all information
function scrape() {
    let title, href = "";
    db.connectToServer(function () {
        rp(url)
            .then(function (html) {
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