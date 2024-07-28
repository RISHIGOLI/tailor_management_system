import { instance } from "../../../services/AxiosConfig";

export function fetchMeasurementFieldsByTypeAPI(type){
    return instance.get(`/api/measurement-types/${type}`)
}