const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('/home/dev/fintech/fintech-app/src/tweets.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet);
const jsonString = JSON.stringify(jsonData, null, 2);

// Create a JavaScript file and save the JSON data as an array of JSON objects
const jsContent = `const jsonData = ${jsonString};\n\nmodule.exports = jsonData;`;
fs.writeFileSync('/home/dev/fintech/fintech-app/src/data.js', jsContent);

console.log('Conversion complete!');
console.log(jsonData);
