const fs = require('fs')
const axios = require('axios')
const pdfReaderMain = require('./filter/reader')
const request = require('./request/request')
let count
let url
let input = ['edital'].map(y => y.toLowerCase())
//3000 -> 3824

let preTrend = {}
let stop_words = JSON.parse(fs.readFileSync('stop_words.json', 'utf8'))
// let allwords = fs.readFile('allwords.json')

module.exports.allTrends = (url) => {
  request(url)
    .then(file=>{
      console.log(`Diário ${url.slice(-4)}`)
      return pdfReaderMain(file, input)
            .then(clear => {
              clear = clear.replace(/[^a-zA-Z ]/g, "")
              clear = clear.split(' ').filter(elm=> !(stop_words.includes(elm)))
              return JSON.stringify(clear)
            })
            .then(content =>{
              fs.writeFile("allwords.json", content, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!")
              })
            })

            // .then(data=>{
            // 	data.map(elm=>{
            // 		if (Object.keys(preTrend).includes(elm)) {
            // 			preTrend[elm] += 1
            // 		} else {
            // 			preTrend[elm] = 0
            // 		}
            // 	})
            // 	return (preTrend)
            // })
    })
    // .then(pre=> {
    // 	preTrend = Object.keys(pre).map((elm)=> [elm, pre[elm]])
    // 	perTren  = preTrend.sort((a, b) => {return a[1] - b[1]})
    // 	perTren  = preTrend.reverse()
    // 	console.log(preTrend)
    // })
}
