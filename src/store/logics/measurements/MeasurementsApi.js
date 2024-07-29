import { instance } from "../../../services/AxiosConfig";

export function fetchMeasurementFieldsByTypeAPI(type) {
    return instance.get(`/api/measurement-types/${type}`)
}

export function addMeasurementAPI(body) {
    console.log('body', body);
    return instance.post('/api/measurement', body)
}

export function fetchAllMeasurementsAPI() {
    return instance.get('/api/measurement')
}

export function fetchMeasurementByCustomerAPI(customerId){
    return instance.get(`/api/measurement/${customerId}`)
}