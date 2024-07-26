import { instance } from "../../../services/AxiosConfig";

export function getAllCustomersAPI(){
    return instance.get('/api/customers/getAllCustomers')    
}

export function addCustomerAPI(body){
    console.log(body);
    return instance.post('/api/customers/addCustomer',body)
}