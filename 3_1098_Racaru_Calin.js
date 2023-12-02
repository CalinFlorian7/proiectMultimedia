// const { doc } = require('prettier')

const optionsCountry = [
    'BE',
    'BG',
    'CZ',
    'DK',
    'DE',
    'EE',
    'IE',
    'EL',
    'ES',
    'FR',
    'HR',
    'IT',
    'CY',
    'LV',
    'LT',
    'LU',
    'HU',
    'MT',
    'NL',
    'AT',
    'PL',
    'PT',
    'RO',
    'SI',
    'SK',
    'FI',
    'SE',
]
let globalData = []
console.log('globalDataaaaa: ', globalData)
let svg = document.getElementById('histogram')
const combomoxCountry = document.getElementById('combobox1')
optionsCountry.sort((a, b) => a.localeCompare(b))
optionsCountry.forEach((option) => {
    const element = document.createElement('option')
    element.value = option
    element.textContent = option
    combomoxCountry.appendChild(element)
})

const optionsYear = Array.from(
    { length: 2022 - 2000 + 1 },
    (_, index) => 2000 + index
)
const combomoxYear = document.getElementById('combobox2')
optionsYear.forEach((option) => {
    const element = document.createElement('option')
    element.value = option
    element.textContent = option
    combomoxYear.appendChild(element)
})
const optionsIndex = new Map()
optionsIndex.set(
    'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
    'GDP per capita in PPS'
)

optionsIndex.set('demo_mlexpec?sex=T&age=Y1', 'Life expectancy at birth')
optionsIndex.set('demo_pjan?sex=T&age=TOTAL', 'Population')
const indexNames = new Map()
indexNames.set('sdg_08_10', 'GDP per capita in PPS')
indexNames.set('demo_mlexpec', 'Life expectancy at birth')
indexNames.set('demo_pjan', 'Population')
const keysArray = Array.from(indexNames.keys())
keysArray.forEach((key) => {
    // console.log(key)
})
const sortedCountries = optionsCountry.sort((a, b) => a.localeCompare(b))
comboboxIndex = document.getElementById('combobox3')
optionsIndex.forEach((option) => {
    const element = document.createElement('option')
    element.value = option
    element.textContent = option
    comboboxIndex.appendChild(element)
})
const button1 = document.getElementById('button1')
button1.addEventListener('click', function () {
    // fetchDataYear(combomoxYear.value)
    fetchData().then(() => {
        createTableForYear(combomoxYear.value)
    })
})
// button1.addEventListener('onmouseover', function () {
//     console.log('esti peste butonul 1')
//     var tool = document.createElement('div')
//     var text = document.createElement('span')
//     text.innerHTML = 'buton!!!!!!!'
//     tool.appendChild(text)
//     btn = document.getElementById('btn-table')
//     btn.appendChild(tool)
// })
// button1.onmousemove = function (event) {
//     console.log('esti peste butonul 1')
//     var tool = document.createElement('div')
//     var text = document.createElement('span')
//     text.innerHTML = 'buton!!!!!!!'
//     let pozX = event.pageX
//     let pozY = event.pageY
//     tool.style.position = 'absolute'
//     tool.style.left = pozX + 'px'
//     tool.style.top = pozY + 'px'
//     console.log('poz span: ', pozX, pozY)
//     console.log('pozX: ', event.pageX)
//     console.log('pozY: ', event.pageY)
//     tool.appendChild(text)
//     btn = document.getElementById('btn-table')
//     btn.appendChild(tool)
// }
const button2 = document.getElementById('button2')
button2.addEventListener('click', function () {
    // const key = Array.from(optionsIndex.entries()).find(
    //     ([key, value]) => value === comboboxIndex.value
    // )
    const key = getMapKeyByValue(indexNames, comboboxIndex.value)
    console.log('cheia', key)
    console.log('tara:', combomoxCountry.value, 'cheia:', '|', key, '|')

    fetchDataCountryIndex(combomoxCountry.value, key)

    // if (key) fetchDataCountryIndex(combomoxCountry.value, key[0])
})
const button3 = document.getElementById('button3')
button3.addEventListener('click', function () {
    console.log('buton 3 apasat')
    fetchDataBubbleChart()
})
function getMapKeyByValue(map, valueMap) {
    let keyrez
    for (const [key, value] of map.entries()) {
        if (value === valueMap) keyrez = key
    }
    return keyrez
}
// async function fetchData() {
//     const Url =
//         'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data'
//     const datasets = [
//         'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
//         'demo_mlexpec?sex=T&age=Y1',
//         'demo_pjan?sex=T&age=TOTAL',
//     ]
//     let jsonData
//     const format = 'JSON'
//     const lang = 'EN'
//     const countries = [
//         'BE',
//         'BG',
//         'CZ',
//         'DK',
//         'DE',
//         'EE',
//         'IE',
//         'EL',
//         'ES',
//         'FR',
//         'HR',
//         'IT',
//         'CY',
//         'LV',
//         'LT',
//         'LU',
//         'HU',
//         'MT',
//         'NL',
//         'AT',
//         'PL',
//         'PT',
//         'RO',
//         'SI',
//         'SK',
//         'FI',
//         'SE',
//     ]
//     let variabila = 12
//     const dataResult = []

//     // Define an array of years (from 2000 to 2018)
//     const years = Array.from({ length: 16 }, (_, index) => 2007 + index)

//     // Create an array of promises for each combination of dataset, year, and country
//     const promises = datasets.flatMap((dataset) =>
//         years.flatMap((year) => {
//             const apiRequestUrl = `${Url}/${dataset}&format=${format}&lang=${lang}&time=${year}&geo=${countries.join(
//                 '&geo='
//             )}`
//             return fetch(apiRequestUrl)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('API request failed')
//                     }
//                     return response.json()
//                 })
//                 .then((data) => {
//                     dataResult.push({ dataset, year, data })
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         })
//     )

//     Promise.all(promises)
//         .then(() => {
//             variabila = 10
//             dataResult.forEach((result) => {
//                 const dataFormatted = []
//                 // console.log('dataResult:', dataResult);
//                 dataResult.forEach((result) => {
//                     const datasetInfo = result.dataset
//                     const year = result.year
//                     const datasetData = result.data
//                     const indicator = datasetInfo.split('?')[0]
//                     countries.forEach((country, index) => {
//                         const valoare = parseFloat(datasetData.value[index])
//                         const valoareNonNull =
//                             valoare !== null ? parseFloat(valoare) : 0
//                         const dataPoint = {
//                             tara: country,
//                             an: year.toString(),
//                             indicator: indicator,
//                             valoare: valoareNonNull,
//                         }
//                         dataFormatted.push(dataPoint)
//                     })
//                 })
//                 // folosesti dataFormatted pentru grafic

//                 jsonData = JSON.stringify(dataFormatted, null, 2)
//                 console.log(jsonData)
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }

// fetchData()

async function createTableForYear(inputYear) {
    // fetchData().then(() => {
    const year = inputYear // Set the year you want to fetch
    let count = 0
    let sum = 0
    let dataFormatted = globalData.concat()
    // dataFormatted = dataFormatted.filter(
    //     (data) => data.an === year.toString()
    // )
    console.log('dataFormatted: ', dataFormatted)

    // console.log('dataFormatted: ', dataFormatted)
    // let filteredData = dataFormatted.filter((data) => data.an === year.toString())
    // console.log('dataformatttedfiltered', filteredData)
    let table = document.getElementById('table')
    if (count == 0 && table.children.length == 0) {
        count++
        console.log('count: ', count)
        // let table = document.getElementById('table')
        table.style.visibility = 'visible'
        const tableRow = document.createElement('tr')

        const headerCountry = document.createElement('th')
        headerCountry.textContent = 'Country'
        headerCountry.style.border = '1px solid black'
        tableRow.appendChild(headerCountry)
        optionsIndex.forEach((option) => {
            const header = document.createElement('th')
            header.textContent = option
            header.style.border = '1px solid black'
            tableRow.appendChild(header)
        })

        table.appendChild(tableRow)

        sortedCountries.forEach((country) => {
            const tableRow = document.createElement('tr')
            tableRow.id = country
            const tableHeader = document.createElement('th')
            tableHeader.textContent = country
            tableHeader.style.border = '1px solid black'
            tableRow.appendChild(tableHeader)
            optionsIndex.forEach((option) => {
                const tableData = document.createElement('td')
                tableData.className = 'td'
                tableData.textContent = '0'
                tableData.style.border = '1px solid black'
                tableRow.appendChild(tableData)
            })
            table.appendChild(tableRow)
        })
    }
    console.log('s-a creat tabelu!')
    // const table = document.getElementById('table')
    const rows = table.getElementsByTagName('tr')

    console.log('lungime data', dataFormatted.length)
    dataFormatted.forEach((dataPoint) => {
        // console.log('an :', dataPoint.an, 'type :', typeof dataPoint.an)
        // console.log('inputYear :', inputYear, 'type :', typeof inputYear)
        // console.log('asta e anul: ' + dataPoint.an)
        // console.log('an: ', dataPoint.an)
        if (dataPoint.an === year.toString()) {
            const row = rows.namedItem(dataPoint.tara)
            const cells = row.getElementsByClassName('td')
            const index = keysArray.indexOf(dataPoint.indicator)
            console.log('valoare index: ', index)
            //map indexi pt nume
            // const cell = cells.namedItem(dataPoint.indicator)
            const cell = cells[index]

            // cell.textContent = dataPoint.valoare
            cell.textContent = dataPoint.valoare === 0 ? '-' : dataPoint.valoare

            // cell.style.backgroundColor = 'red'
            colorCell(cell, dataPoint.valoare, sum)
        }
        // } else console.log('nu e anul: ')
    })
    // })
}

async function fetchDataYear(inputYear) {
    const Url =
        'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data'
    const datasets = [
        'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
        'demo_mlexpec?sex=T&age=Y1',
        'demo_pjan?sex=T&age=TOTAL',
    ]
    const year = inputYear // Set the year you want to fetch

    const format = 'JSON'
    const lang = 'EN'
    const countries = [
        'BE',
        'BG',
        'CZ',
        'DK',
        'DE',
        'EE',
        'IE',
        'EL',
        'ES',
        'FR',
        'HR',
        'IT',
        'CY',
        'LV',
        'LT',
        'LU',
        'HU',
        'MT',
        'NL',
        'AT',
        'PL',
        'PT',
        'RO',
        'SI',
        'SK',
        'FI',
        'SE',
    ]

    const dataResult = []

    for (const dataset of datasets) {
        const apiRequestUrl = `${Url}/${dataset}&format=${format}&lang=${lang}&time=${year}&geo=${countries.join(
            '&geo='
        )}`
        try {
            const response = await fetch(apiRequestUrl)
            if (!response.ok) {
                throw new Error('API request failed')
            }
            const data = await response.json()
            dataResult.push({ dataset, year, data })
        } catch (error) {
            console.log(error)
        }
    }
    let count = 0
    let sum = 0
    dataResult.forEach((result) => {
        const dataFormatted = []
        const datasetInfo = result.dataset
        const year = result.year
        const datasetData = result.data
        const indicator = datasetInfo.split('?')[0]

        countries.forEach((country, index) => {
            const valoare = parseFloat(datasetData.value[index])
            const valoareNonNull = !isNaN(valoare) ? valoare : 0
            const dataPoint = {
                tara: country,
                an: year.toString(),
                indicator: indicator,
                valoare: valoareNonNull,
            }
            sum += valoareNonNull

            dataFormatted.push(dataPoint)
        })
        let table = document.getElementById('table')
        if (count == 0 && table.children.length == 0) {
            count++
            // let table = document.getElementById('table')
            table.style.visibility = 'visible'
            const tableRow = document.createElement('tr')

            const headerCountry = document.createElement('th')
            headerCountry.textContent = 'Country'
            headerCountry.style.border = '1px solid black'
            tableRow.appendChild(headerCountry)
            optionsIndex.forEach((option) => {
                const header = document.createElement('th')
                header.textContent = option
                header.style.border = '1px solid black'
                tableRow.appendChild(header)
            })

            table.appendChild(tableRow)

            sortedCountries.forEach((country) => {
                const tableRow = document.createElement('tr')
                tableRow.id = country
                const tableHeader = document.createElement('th')
                tableHeader.textContent = country
                tableHeader.style.border = '1px solid black'
                tableRow.appendChild(tableHeader)
                optionsIndex.forEach((option) => {
                    const tableData = document.createElement('td')
                    tableData.className = 'td'
                    tableData.textContent = '0'
                    tableData.style.border = '1px solid black'
                    tableRow.appendChild(tableData)
                })
                table.appendChild(tableRow)
            })
        }

        // const table = document.getElementById('table')
        const rows = table.getElementsByTagName('tr')
        dataFormatted.forEach((dataPoint) => {
            const row = rows.namedItem(dataPoint.tara)
            const cells = row.getElementsByClassName('td')
            const index = keysArray.indexOf(dataPoint.indicator)
            console.log('valoare index: ', index)
            //map indexi pt nume
            // const cell = cells.namedItem(dataPoint.indicator)
            const cell = cells[index]

            // cell.textContent = dataPoint.valoare
            cell.textContent = dataPoint.valoare === 0 ? '-' : dataPoint.valoare
            // cell.style.backgroundColor = 'red'
            colorCell(cell, dataPoint.valoare, sum)
        })
        const jsonData = JSON.stringify(dataFormatted, null, 2)
        console.log(jsonData)

        // You can save the data to a file here if needed.
        // fs.writeFile('data.json', jsonData, (err) => {
        //     console.log(err || 'Data written to file');
        // });
    })
}

// fetchDataYear(2019)
function colorCell(cell, value, sum) {
    sum = sum / optionsCountry.length
    const distance = Math.abs(value - sum)
    const normalizedDistance = distance / (sum * 2)
    const red = 255 * (1 - normalizedDistance)
    const green = 255 * normalizedDistance
    const color = `rgb(${red},${green},0)`
    if (value !== 0) cell.style.backgroundColor = color
    else cell.style.backgroundColor = 'white'
}
async function fetchData() {
    const Url =
        'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data'
    const datasets = [
        'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
        'demo_mlexpec?sex=T&age=Y1',
        'demo_pjan?sex=T&age=TOTAL',
    ]
    const format = 'JSON'
    const lang = 'EN'
    const countries = [
        'BE',
        'BG',
        'CZ',
        'DK',
        'DE',
        'EE',
        'IE',
        'EL',
        'ES',
        'FR',
        'HR',
        'IT',
        'CY',
        'LV',
        'LT',
        'LU',
        'HU',
        'MT',
        'NL',
        'AT',
        'PL',
        'PT',
        'RO',
        'SI',
        'SK',
        'FI',
        'SE',
    ]
    let variabila = 12
    const dataResult = []

    const years = Array.from({ length: 16 }, (_, index) => 2007 + index)

    for (const dataset of datasets) {
        for (const year of years) {
            const apiRequestUrl = `${Url}/${dataset}&format=${format}&lang=${lang}&time=${year}&geo=${countries.join(
                '&geo='
            )}`
            try {
                const response = await fetch(apiRequestUrl)
                if (!response.ok) {
                    throw new Error('API request failed')
                }
                const data = await response.json()
                dataResult.push({ dataset, year, data })
            } catch (error) {
                console.log(error)
            }
        }
    }

    try {
        variabila = 10
        const dataFormatted = []
        dataResult.forEach((result) => {
            const datasetInfo = result.dataset
            const year = result.year
            const datasetData = result.data
            const indicator = datasetInfo.split('?')[0]
            countries.forEach((country, index) => {
                const valoare = parseFloat(datasetData.value[index])
                // const valoareNonNull =
                const valoareNonNull = !isNaN(valoare) ? valoare : 0
                //     valoare !== null ? parseFloat(valoare) : 0
                const dataPoint = {
                    tara: country,
                    an: year.toString(),
                    indicator: indicator,
                    valoare: valoareNonNull,
                }
                globalData.push(dataPoint)
                dataFormatted.push(dataPoint)
            })
        })
        // console.log(dataFormatted)
        // const jsonData = JSON.stringify(dataFormatted, null, 2)
        // console.log(jsonData)
        // fs.writeFile('data.json', jsonData, (err) => {
        //     console.log(err || 'Data written to file');
        // });
    } catch (error) {
        console.log(error)
    }
}

fetchData()
console.log('globalDataAfterFetch: ', globalData)

async function fetchDataCountryIndex(country, index) {
    const Url =
        'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data'
    const datasets = [
        'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
        'demo_mlexpec?sex=T&age=Y1',
        'demo_pjan?sex=T&age=TOTAL',
    ]
    const format = 'JSON'
    const lang = 'EN'
    const countries = [
        'BE',
        'BG',
        'CZ',
        'DK',
        'DE',
        'EE',
        'IE',
        'EL',
        'ES',
        'FR',
        'HR',
        'IT',
        'CY',
        'LV',
        'LT',
        'LU',
        'HU',
        'MT',
        'NL',
        'AT',
        'PL',
        'PT',
        'RO',
        'SI',
        'SK',
        'FI',
        'SE',
    ]
    let variabila = 12
    const dataResult = []

    const years = Array.from({ length: 16 }, (_, index) => 2007 + index)

    for (const dataset of datasets) {
        for (const year of years) {
            const apiRequestUrl = `${Url}/${dataset}&format=${format}&lang=${lang}&time=${year}&geo=${countries.join(
                '&geo='
            )}`
            try {
                const response = await fetch(apiRequestUrl)
                if (!response.ok) {
                    throw new Error('API request failed')
                }
                const data = await response.json()
                dataResult.push({ dataset, year, data })
            } catch (error) {
                console.log(error)
            }
        }
    }

    try {
        variabila = 10
        const dataFormatted = []
        dataResult.forEach((result) => {
            const datasetInfo = result.dataset
            const year = result.year
            const datasetData = result.data
            const indicator = datasetInfo.split('?')[0]
            countries.forEach((country, index) => {
                const valoare = parseFloat(datasetData.value[index])
                // const valoareNonNull =
                //     valoare !== null ? parseFloat(valoare) : 0
                const valoareNonNull = !isNaN(valoare) ? valoare : 0
                const dataPoint = {
                    tara: country,
                    an: year.toString(),
                    indicator: indicator,
                    valoare: valoareNonNull,
                }

                dataFormatted.push(dataPoint)
            })
        })
        const filteredData = dataFormatted.filter(
            (data) => data.tara === country && data.indicator === index
        )
        console.log('date filtrate: ', filteredData)
        const years = filteredData.map((data) => data.an)
        const values = filteredData.map((data) => data.valoare)
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild)
        }
        // Dimensions
        const svgWidth = 1400
        const svgHeight = 400
        const margin = { top: 20, right: 30, bottom: 40, left: 120 }
        const chartWidth = svgWidth - margin.left - margin.right
        const chartHeight = svgHeight - margin.top - margin.bottom

        // Calculate the maximum value in the dataset
        const maxValue = Math.max(...values)

        // Create bars
        for (let i = 0; i < years.length; i++) {
            const bar = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'rect'
            )
            bar.setAttribute('class', 'bar')
            bar.setAttribute('x', (i * chartWidth) / years.length + margin.left)
            bar.setAttribute(
                'y',
                chartHeight - (values[i] * chartHeight) / maxValue + margin.top
            )
            bar.setAttribute('width', chartWidth / years.length - 10) // Adjust the width as needed
            bar.setAttribute('height', (values[i] * chartHeight) / maxValue)
            bar.onmousemove = function (event) {
                let toolTipDiv = document.getElementById('tooltipDiv')
                let toolTipSpan = document.getElementById('tooltipSpan')
                console.log('esti deasuupra graficului')
                toolTipSpan.innerHTML =
                    'Year: ' + years[i] + '; Value: ' + values[i]
                toolTipDiv.style.visibility = 'visible'
                toolTipDiv.style.left = event.pageX + 20 + 'px'
                toolTipDiv.style.top = event.pageY + 10 + 'px'
                console.log('mouse: ', event.pageX, event.pageY)
                console.log(
                    'toolTip: ',
                    toolTipDiv.style.left,
                    toolTipDiv.style.top
                )
                // document.body.appendChild(toolTipDiv)
            }
            bar.onmouseleave = function (event) {
                let toolTipDiv = document.getElementById('tooltipDiv')
                toolTipDiv.style.visibility = 'hidden'
            }
            svg.appendChild(bar)
        }

        // Create x-axis
        for (let i = 0; i < years.length; i++) {
            const text = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text'
            )
            text.setAttribute(
                'x',
                (i * chartWidth) / years.length +
                    margin.left +
                    chartWidth / years.length / 2
            )
            text.setAttribute('y', chartHeight + margin.top + 20)
            text.setAttribute('text-anchor', 'middle')
            text.textContent = years[i]
            svg.appendChild(text)
        }

        // Create y-axis
        for (let i = 0; i <= 5; i++) {
            const text = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text'
            )
            text.setAttribute('x', margin.left - 10)
            text.setAttribute(
                'y',
                chartHeight - (chartHeight * i) / 5 + margin.top
            )
            text.setAttribute('text-anchor', 'end')
            text.textContent = Math.round((maxValue * i) / 5)
            svg.appendChild(text)
        }

        // Add labels
        const xLabel = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text'
        )
        xLabel.setAttribute('x', svgWidth / 2)
        xLabel.setAttribute('y', svgHeight - 10)
        xLabel.setAttribute('text-anchor', 'middle')
        xLabel.textContent = 'Years'
        svg.appendChild(xLabel)

        const yLabel = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text'
        )
        yLabel.setAttribute('x', 60)
        yLabel.setAttribute('y', svgHeight / 2)
        yLabel.setAttribute('text-anchor', 'middle')
        yLabel.setAttribute('transform', 'rotate(-90 10,200)')
        yLabel.textContent = 'Values'
        svg.appendChild(yLabel)
        // if (svg) console.log('svg: exista ')
    } catch (error) {
        console.log(error)
    }
}
///////
async function fetchDataBubbleChart() {
    const Url =
        'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data'
    const datasets = [
        'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
        'demo_mlexpec?sex=T&age=Y1',
        'demo_pjan?sex=T&age=TOTAL',
    ]
    const format = 'JSON'
    const lang = 'EN'
    const countries = [
        'BE',
        'BG',
        'CZ',
        'DK',
        'DE',
        'EE',
        'IE',
        'EL',
        'ES',
        'FR',
        'HR',
        'IT',
        'CY',
        'LV',
        'LT',
        'LU',
        'HU',
        'MT',
        'NL',
        'AT',
        'PL',
        'PT',
        'RO',
        'SI',
        'SK',
        'FI',
        'SE',
    ]
    let variabila = 12
    const dataResult = []

    const years = Array.from({ length: 16 }, (_, index) => 2007 + index)

    for (const dataset of datasets) {
        for (const year of years) {
            const apiRequestUrl = `${Url}/${dataset}&format=${format}&lang=${lang}&time=${year}&geo=${countries.join(
                '&geo='
            )}`
            try {
                const response = await fetch(apiRequestUrl)
                if (!response.ok) {
                    throw new Error('API request failed')
                }
                const data = await response.json()
                dataResult.push({ dataset, year, data })
            } catch (error) {
                console.log(error)
            }
        }
    }

    try {
        variabila = 10
        const dataFormatted = []
        dataResult.forEach((result) => {
            const datasetInfo = result.dataset
            const year = result.year
            const datasetData = result.data
            const indicator = datasetInfo.split('?')[0]
            countries.forEach((country, index) => {
                const valoare = parseFloat(datasetData.value[index])
                // const valoareNonNull =
                const valoareNonNull = !isNaN(valoare) ? valoare : 0
                //     valoare !== null ? parseFloat(valoare) : 0
                const dataPoint = {
                    tara: country,
                    an: year.toString(),
                    indicator: indicator,
                    valoare: valoareNonNull,
                }
                dataFormatted.push(dataPoint)
            })
        })
        // console.log(dataFormatted)
        dataFormatted.sort((a, b) => {
            if (a.an > b.an) return 1
            else if (a.an < b.an) return -1
            if (a.indicator > b.indicator) return 1
            else if (a.indicator < b.indicator) return -1
            return 0
        })
        // const jsonData = JSON.stringify(dataFormatted, null, 2)
        // console.log(jsonData)
        // const canvas = document.getElementById('canvas')
        // let context = canvas.getContext('2d')
        // let contextCircles = canvas.getContext('2d')
        const chartContainer = document.getElementById('bubbleChart-container')
        if (chartContainer.hasChildNodes) {
            console.log(' are copii')
            // chartContainer.removeChild(chartContainer.firstChild)
            chartContainer.replaceChildren()
        }
        let xAxisLabel = 'GDP per capita'
        let yAxisLabel = 'Life expectancy'
        let xMin = 0
        let xMax = Math.max(
            ...dataFormatted
                .filter((data) => data.indicator === 'sdg_08_10')
                .map((data) => data.valoare)
        )

        let yMin = 0
        let yMax =
            Math.max(
                ...dataFormatted
                    .filter((data) => data.indicator === 'demo_mlexpec')
                    .map((data) => data.valoare)
            ) + 20
        console.log('xMax: ', xMax)
        console.log('yMax: ', yMax)
        function dataToCanvasX(x, y, canvas) {
            let xScale = (1400 - 100) / (xMax - xMin)
            let yScale = (700 - 100) / (yMax - yMin)
            let canvasX = Math.floor((x - xMin) * xScale) + 50
            let canvasY = 700 - (Math.floor((y - yMin) * yScale) + 50)
            console.log('canvasX: ', canvasX)
            console.log('canvasY: ', canvasY)
            return { x: canvasX, y: canvasY }
        }
        // contextCircles.fillStyle = 'blue'
        // context.fillStyle = 'black'
        // context.fillRect(50, canvas.height - 50, canvas.width - 100, 2)
        // context.fillText(xAxisLabel, canvas.width / 2 - 40, canvas.height - 10)
        // context.fillRect(50, 50, 2, canvas.height - 100)
        // context.fillText(yAxisLabel, 10, canvas.height / 2)
        // for (let i = xMin; i <= xMax; i += 10000) {
        //     let canvasCoords = dataToCanvasX(i, 0)
        //     context.fillRect(canvasCoords.x, canvasCoords.y, 2, 10)
        //     context.fillText(i, canvasCoords.x - 20, canvasCoords.y + 20)
        // }
        // for (let i = yMin; i <= yMax; i += 5) {
        //     let canvasCoords = dataToCanvasX(0, i)
        //     context.fillRect(canvasCoords.x, canvasCoords.y, 10, 2)
        //     context.fillText(i, canvasCoords.x - 30, canvasCoords.y + 5)
        // }
        // context.beginPath()
        // context.arc(933, 650, 10, 0, 2 * Math.PI)
        // console.log('canvas width: ', canvas.width)
        // console.log('canvas height: ', canvas.height)
        // context.fill()
        // context.closePath()
        console.log('ani: ', years)
        console.log(optionsCountry)

        function Drawcircles(year) {
            console.log('an: ', year)
            optionsCountry.forEach((country) => {
                console.log('tara: ', country)
                let x = dataFormatted.find(
                    (data) =>
                        data.tara === country &&
                        data.an === year.toString() &&
                        data.indicator === 'sdg_08_10'
                )
                let y = dataFormatted.find(
                    (data) =>
                        data.tara === country &&
                        data.an === year.toString() &&
                        data.indicator === 'demo_mlexpec'
                )
                console.log('x: ', x)
                console.log('y: ', y)
                if (x && y) {
                    let canvasCoords = dataToCanvasX(
                        x.valoare,
                        y.valoare,
                        canvas
                    )
                    contextCircles.beginPath()
                    contextCircles.arc(
                        canvasCoords.x,
                        canvasCoords.y,
                        5,
                        0,
                        2 * Math.PI
                    )
                    contextCircles.fill()
                    contextCircles.closePath()
                }
            })
        }

        let divChart = document.createElement('div')
        divChart.setAttribute('id', 'divChart')
        chartContainer.appendChild(divChart)
        years.forEach((year, index) => {
            // setTimeout(() => {}, bind(this, year), index * 1000)
            // context.clearRect(55, 0, canvas.width, canvas.height - 55)
            // context.clearRect(50, 50, 100, 100)
            setTimeout(() => {
                if (divChart != null) divChart.innerHTML = ''

                let canvas = document.createElement('canvas')
                canvas.setAttribute('id', 'canvas' + index)
                canvas.width = 1400
                canvas.height = 700
                let context = canvas.getContext('2d')
                let contextCircles = canvas.getContext('2d')
                if (divChart != null) divChart.appendChild(canvas)
                else console.log('divChartul este nulll: ')
                console.log('se deseneaza un nou canvas')
                console.log('an: ', year)
                contextCircles.fillStyle = 'blue'
                context.fillStyle = 'black'
                context.fillRect(50, canvas.height - 50, canvas.width - 100, 2)
                context.fillText(
                    xAxisLabel,
                    canvas.width / 2 - 40,
                    canvas.height - 10
                )
                context.fillRect(50, 50, 2, canvas.height - 100)
                context.fillText(yAxisLabel, 10, canvas.height / 2)
                for (let i = xMin; i <= xMax; i += 10000) {
                    let canvasCoords = dataToCanvasX(i, 0)
                    context.fillRect(canvasCoords.x, canvasCoords.y, 2, 10)
                    context.fillText(
                        i,
                        canvasCoords.x - 20,
                        canvasCoords.y + 20
                    )
                }
                for (let i = yMin; i <= yMax; i += 5) {
                    let canvasCoords = dataToCanvasX(0, i)
                    context.fillRect(canvasCoords.x, canvasCoords.y, 10, 2)
                    context.fillText(i, canvasCoords.x - 30, canvasCoords.y + 5)
                }
                optionsCountry.forEach((country) => {
                    console.log('tara: ', country)
                    let x = dataFormatted.find(
                        (data) =>
                            data.tara === country &&
                            data.an === year.toString() &&
                            data.indicator === 'sdg_08_10'
                    )
                    let y = dataFormatted.find(
                        (data) =>
                            data.tara === country &&
                            data.an === year.toString() &&
                            data.indicator === 'demo_mlexpec'
                    )
                    console.log('x: ', x)
                    console.log('y: ', y)
                    if (x && y) {
                        let canvasCoords = dataToCanvasX(x.valoare, y.valoare)
                        contextCircles.beginPath()
                        // contextCircles.fillStyle = 'blue'
                        // contextCircles.fillStyle = 'rgb(255, 0, 0)' // Red color
                        contextCircles.fillStyle = getRandomColor()
                        contextCircles.arc(
                            canvasCoords.x,
                            canvasCoords.y,
                            20,
                            0,
                            2 * Math.PI
                        )

                        contextCircles.fill()
                        contextCircles.closePath()
                        contextCircles.fillStyle = 'black'
                        contextCircles.font = '12px Arial'
                        contextCircles.fillText(
                            country,
                            canvasCoords.x - 10,
                            canvasCoords.y - 30
                        )
                        contextCircles.font = '20px Arial'
                        contextCircles.fillText(year, 700, 50)
                        // canvas.remove()
                        // chart.remove()
                    }
                })
                // canvas.remove()
                // chart.remove()
            }, index * 1000) // 3 seconds = 3000 milliseconds
        })
    } catch (error) {
        console.log(error)
    }
}

function iter() {
    console.log('iter')
    console.log('globalData len: ', globalData.length)
    globalData.forEach((data) => {
        if (
            data.tara === 'BE' &&
            data.an === '2007' &&
            data.indicator === 'sdg_08_10'
        )
            console.log('an: ', data.an)
    })
}
function getRandomColor() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    var rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')'

    return rgbColor
}
console.log('culoare: ', getRandomColor())
iter()
fetchData().then(() => {
    iter(globalData)
})
