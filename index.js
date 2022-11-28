const express = require('express')
const request = require('request')

const cheerio = require('cheerio')
const fs = require('fs')

var url;

var title, release, rating

var json = { title: "", release: "", rating: ""}


const app = express()

app.get('/scrape', (req, res) => {
    // scraping code

    url = "https://www.imdb.com/title/tt0107290/"

    request(url, function (error, response, html){
        var $ = cheerio.load(html)

        $(".title_wrapper").filter(function () {
            var data = $(this)
            
            title = data.children().first().text()
            console.log(title)

            json.title = title   
        })

        $("#titleYear").filter(function (){
            var data = $(this)

            release = data.children().first().text()

            console.log(release)
            json.release = release 
            
        })
    })
})

app.listen(5000, function () {
    console.log("Server is listing on Port 5000")
})