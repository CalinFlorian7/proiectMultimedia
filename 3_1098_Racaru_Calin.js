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
combomoxIndex = document.getElementById('combobox3')
optionsIndex.forEach((option) => {
    const element = document.createElement('option')
    element.value = option
    element.textContent = option
    combomoxIndex.appendChild(element)
})
// // import fs from 'fs'

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
//                 // fs.writeFile('data.json', jsonData, (err) => {
//                 //     console.log(err || 'Data written to file')
//                 // })
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }

// fetchData()

async function fetchData(inputYear) {
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
            dataFormatted.push(dataPoint)
        })

        const jsonData = JSON.stringify(dataFormatted, null, 2)
        console.log(jsonData)
        // You can save the data to a file here if needed.
        // fs.writeFile('data.json', jsonData, (err) => {
        //     console.log(err || 'Data written to file');
        // });
    })
}

fetchData(2019)
