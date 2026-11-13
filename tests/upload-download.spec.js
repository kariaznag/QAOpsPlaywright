const {test, expect} = require('@playwright/test');
const ExcelJs = require('exceljs');

//a function that look for a value
function readExcel(worksheet, searchText){

    let output = {row:-1, column:-1}; 

    worksheet.eachRow( (row, rowNumber) => {
    row.eachCell( (cell, colNumber) => {
        if(cell.value === searchText){
            output.row = rowNumber;
            output.column = colNumber;
            //cell.value = 'Banana';
        }
        })
    })
    return output;
};


//a function that updates the excel file 
async function updateExcelFile(filePath, replaceText, change, searchText){

    const workbook = new ExcelJs.Workbook();  //new object of the ExcelJs class
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1'); //get the worksheet named 'Sheet1' from the workbook
    //on each row that is not empty
    const result = readExcel(worksheet, searchText);
    const cellnumber = worksheet.getCell(result.row, result.column + change.colChange);
    cellnumber.value = replaceText;
    //to update the excel file and save these modifications
    await workbook.xlsx.writeFile(filePath);
    
};


test('downlod upload excel file', async({page}) => {
    
    const textShearch = 'Papaya';
    const updatedValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download'); //waits for event download
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;//awaits for the promise to resolve
    const filePath = 'C:/Users/karima.aznag/Downloads/download.xlsx';
    await download.saveAs(filePath);//catchs the file to download and save it in the path provided
    await updateExcelFile(filePath, updatedValue, {rowChange : 0, colChange : 2}, textShearch);
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator = page.getByText(textShearch);//first locator 
    const searchedTextRow = page.getByRole('row').filter({ has: textLocator});//filter by a locator
    await expect(searchedTextRow.locator("#cell-4-undefined")).toContainText(updatedValue);

});