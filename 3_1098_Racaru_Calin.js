
const Url = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';
const datasets = [
  'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB',
  'demo_mlexpec?sex=T&age=Y1',
  'demo_pjan?sex=T&age=TOTAL'
];
const format = 'JSON';
const lang = 'EN';
const countries = ['BE', 'BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'EL', 'ES', 'FR', 'HR', 'IT', 'CY', 'LV', 'LT', 'LU', 'HU', 'MT', 'NL', 'AT', 'PL', 'PT', 'RO', 'SI', 'SK', 'FI', 'SE'];
let variabila = 12;
const dataResult = [];

// Define an array of years (from 2000 to 2018)
const years = Array.from({ length: 19 }, (_, index) => 2000 + index);

// Create an array of promises for each combination of dataset, year, and country
const promises = datasets.flatMap(dataset =>
  years.flatMap(year => {
    const apiRequestUrl = `${Url}/${dataset}&format=${format}&lang=${lang}&time=${year}&geo=${countries.join('&geo=')}`;
    return fetch(apiRequestUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('API request failed');
        }
        return response.json();
      })
      .then(data => {
        dataResult.push({ dataset, year, data });
      })
      .catch(error => {
        console.log(error);
      });
  })
);

Promise.all(promises)
  .then(() => {
    variabila = 10;
    dataResult.forEach(result => {
    //   const datasetInfo = result.dataset;
    //   const year = result.year;
    //   const datasetData = result.data;

    //   console.log('Year:', year);
    //   console.log('Dataset Information:', datasetInfo);
    //   console.log('Dataset Data:', datasetData);
    const dataFormatted = [];
console.log('dataResult:', dataResult);
    dataResult.forEach(result => {
  const datasetInfo = result.dataset;
  const year = result.year;
  const datasetData = result.data;

  // Extract the indicator code (e.g., "B1GQ", "T", "TOTAL") from the datasetInfo
  const indicator = datasetInfo.split('?')[0];

  // Iterate through countries
  countries.forEach((country,index) => {
    console.log('country:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', country);
    const valoare = parseFloat(datasetData.value[index]);
const valoareNonNull = valoare !== null ? parseFloat(valoare) : 0;
    const dataPoint = {
      tara: country,
      an: year.toString(),
      indicator: indicator,
      valoare: valoare,
      
    };

    // Add the data point to the formatted data array
    dataFormatted.push(dataPoint);
  });
});

// Now dataFormatted contains the data in the desired format

// Convert the data to a JSON string
const jsonData = JSON.stringify(dataFormatted, null, 2);

console.log(jsonData);
    });
  })
  .catch(error => {
    console.log(error);
  });

console.log('variabila', variabila);
// ///////////////////////////////////////////



