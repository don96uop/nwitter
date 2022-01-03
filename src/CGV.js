const request = require('request');
// const cheerio = require('cheerio');

    request("http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=206%2C04%2C06&theaterCode=0090&date=20220104",
    function(err,res,body){
        if(err) throw err;
        console.log('body: ', body);

    });