import {expect} from '@playwright/test';

export class APIUtils{

    apiContext:any;
    loginPayload:{userEmail: string, userPassword: string};
    constructor(apiContext:any, loginPayload:{userEmail: string, userPassword: string}){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    //return a token from the login API.
    async getToken(){
    
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {data: this.loginPayload},);
        expect(loginResponse.ok()).toBeTruthy();//the loginResponse.ok() is true if the response status code is 2xx
        const loginResponseJson = await loginResponse.json();//we need to await here we are performing an action of parsing the json response from the loginResponse object, which is a promise, so we need to await it to get the resolved value of the promise
        const token = loginResponseJson.token; //we dont need await here because the loginResponseJson is already a resolved promise, we just parsing the json response to get the token value
        return token;
    }

    //make an order via API call and return the orderId.
    async createOrder(orderPayload:{orders:[{country:string, productOrderedId:string}]}){
        let response:{ token: string, orderId: any };//create an empty object to store the token and orderId
        response = { token: "", orderId: "" };//call the getToken() method to get the token and store it in the response object
        response.token = await this.getToken();
        const orderResponse  = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
                {
                    data:orderPayload, 
                    headers: {Authorization: response.token, 
                              'Content-Type': 'application/json'},
                    });
            const orderResponseJson = await orderResponse.json();
            //console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            //console.log(response);
            return response;
    }
} 


