const fs = require('fs')
const nedb = require('nedb')
const axios = require('axios')
const pdfReaderMain = require('./filter/reader')
const request = require('./request/request')
let count
let url
let input = ['edital'].map(y => y.toLowerCase())
//3000 -> 3824

let preTrend = {}
let stop_words = JSON.parse(fs.readFileSync('stop_words.json', 'utf8'))
/*
[
{'Atila': 3},
{'Seila': 1}
]
*/

// while (count =< 3827) {
//
// 	count++
// }



const allTrends = (url) =>
	new Promise((resolve, reject) =>
		request(url)
			.then(file=>{
				console.log(`Diário ${url}`)
				return pdfReaderMain(file, input)
							.then(clear => {
								clear = clear.split(" ").filter(elm=> !(stop_words.includes(elm)))
								return resolve(clear)
							})
							// .then(data=>{
							// 	data.map(elm=>{
							// 		if (Object.keys(preTrend).includes(elm)) {
							// 			preTrend[elm] += 1
							// 		} else {
							// 			preTrend[elm] = 0
							// 		}
							// 	})
							// 	return resolve(preTrend)
							// })
			})
			// .then(pre=> {
			// 	preTrend = Object.keys(pre).map((elm)=> [elm, pre[elm]])
			// 	perTren  = preTrend.sort((a, b) => {return a[1] - b[1]})
			// 	perTren  = preTrend.reverse()
			// 	return resolve(preTrend)
			// })
)

count = 3820
while(count < 3827){
  url = `http://doweb.rio.rj.gov.br/ler_pdf.php?page=0&edi_id=${count}`
  console.log(count)
  allTrends(url).then(d=>console.log(d))
  count++
}
// while (count <= 3827) {
//
// }

// axios.get('adsadasdada')
// .then(file => pdfReaderMain(file))
