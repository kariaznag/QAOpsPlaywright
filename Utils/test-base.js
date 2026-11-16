const base = require('@playwright/test');



exports.customTest = base.test.extend(
    {
        testDataForOrder : { 
            email : "anshika@gmail.com",
            password : "Iamking@000",
            productName : "ZARA COAT 3"
    }

    }
)