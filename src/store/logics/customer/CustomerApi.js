import { instance } from "../../../services/AxiosConfig";

export function getAllCustomersAPI(){
    return instance.get('/api/customers/getAllCustomers')    
}

export function addCustomerAPI(body){
    console.log(body);
    return instance.post('/api/customers/addCustomer',body)
}

export function deleteCustomerAPI(customerId){
    return instance.post(`/api/customers/deleteCustomer/${customerId}`)
}

export function fetchCustomersByCustomerNameAPI(customerName){
    return instance.get(`api/customers/getCustomerByCustomerName/${customerName}`)
}