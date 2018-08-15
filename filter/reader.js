const pdfreader = require("pdfreader")

let rows = []
let content = []
let pdfobjects = {}
let words = []
let sent = ''
/*
pdfobjects = {
    1 : 'atila rangel araujo',
    2 : 'gustavo gomes da silva',
    3 : 'jose araujo'
}
*/
let find = {}
let p = 0

let validate = true
let validate_list = []


const organizeRows = rows => {
  return Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .reduce((acc, elm) => {
      return [...acc, (rows[elm] || []).join("").toLowerCase()]
    }, [])
}
const createList = (page_p, object) => {
    object[page_p - 1] = content.reduce((acc, elm) => acc += (elm), '')
    return object
}
const matchItem = (objects, index, item) => {
    if (!objects[index].includes(item)) {
        delete pdfobjects[index]
        // console.log('Aqui não existe::::::::::', item, index)
    }
    // else {
    //     console.log('Aqui existe::::::::::', item, index)
    // }
}
const organizeItem = (object, index, input) => {
        if (object.includes(input[0])){
            let x = object.indexOf(input[0])
            let list = object.slice(x-500, x+500)
            sent +=` ${list}`
          }
}

const pdfReaderMain = (file, input) =>
    new Promise((resolve, reject) =>
        new pdfreader.PdfReader()
            .parseBuffer(file, (err, item) => {
                if (err){
                  return resolve(sent)
                }
                if (!item) {
                    input.map(item => {
                        Object.keys(pdfobjects).map((elm) => {
                            matchItem(pdfobjects, elm, item)
                        })
                    })
                    Object.keys(pdfobjects).map((elm) => {
                        organizeItem(pdfobjects[elm], elm, input)
                    })
                    return resolve(sent)
                }
                if (item.page) {
                    content = organizeRows(rows)
                    pdfobjects = createList(item.page, pdfobjects)
                    p++
                    rows = []
                }
                else if (item.text) {
                    // accumulate text items into rows object, per line
                    (rows[item.y] = rows[item.y] || []).push(item.text)
                }
            })
)

module.exports = pdfReaderMain, sent
