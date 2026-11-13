import {test as baseTest} from '@playwright/test';


interface TestDataForOrder {
    email: string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    testDataForOrder: {
        email: "karima.aznagg@gmail.com",
        password: "Domtomsalimin8*",
        productName: "ZARA COAT 3"
    }

    }
)