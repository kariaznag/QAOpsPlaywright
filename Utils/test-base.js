const base = require('@playwright/test');



exports.customTest = base.test.extend(
    {
        testDataForOrder : { 
            email : "karima.aznagg@gmail.com",
            password : "Domtomsalimin8*",
            productName : "ZARA COAT 3"
    }

    }
)