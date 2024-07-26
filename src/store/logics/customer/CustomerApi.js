import { instance } from "../../../services/AxiosConfig";

export function getAllCustomersAPI(){
    return instance.get('/api/customers/getAllCustomers')    
}