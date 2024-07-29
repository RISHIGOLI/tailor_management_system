import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addMeasurementAPI, fetchAllMeasurementsAPI, fetchMeasurementByCustomerAPI, fetchMeasurementFieldsByTypeAPI } from './MeasurementsApi'

const MeasurementsSlice = createSlice({
    name: 'measurementsSlice',
    initialState: {
        loader: false,
        measurementFields: [],
        measurements: [],
        error: false,
        message: '',
        addMeasurementStatusHandlers: {
            loader: false,
            status: false,
            error: false,
            messsage: ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeasurementFieldsByType.pending, (state, action) => {
                console.log('payload for pending state', action.payload);
                return {
                    ...state,
                    loader: true
                }
            })
            .addCase(fetchMeasurementFieldsByType.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state,
                    loader: false,
                    measurementFields: [...action.payload.fields]
                }
            })
            .addCase(fetchMeasurementFieldsByType.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state,
                }
            })
            .addCase(addMeasurement.pending, (state, action) => {
                console.log('payload for pending state', action.payload);
                return {
                    ...state,
                    addMeasurementStatusHandlers: {
                        loader: true,
                    }
                }
            })
            .addCase(addMeasurement.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state,
                    measurements: [...action.payload.data, ...state.measurements],
                    addMeasurementStatusHandlers:{
                        loader:false,
                        status:true,
                        error:false,
                        message:action.payload.message
                    }
                }
            })
            .addCase(addMeasurement.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state,
                    loader:false,
                    error:true,
                }
            })
            .addCase(fetchAllMeasurements.pending, (state, action) => {
                console.log('payload for pending state', action.payload);
                return {
                    ...state
                }
            })
            .addCase(fetchAllMeasurements.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state,
                    measurements: [...action.payload.data]
                }
            })
            .addCase(fetchAllMeasurements.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state
                }
            })
            .addCase(fetchMeasurementsByCustomer.pending, (state, action) => {
                console.log('payload for pending state', action.payload);
                return {
                    ...state
                }
            })
            .addCase(fetchMeasurementsByCustomer.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state,
                    measurements: [...action.payload.data]
                }
            })
            .addCase(fetchMeasurementsByCustomer.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state
                }
            })
    }
})

export default MeasurementsSlice.reducer
export const { } = MeasurementsSlice.actions

export const fetchMeasurementFieldsByType = createAsyncThunk(
    'measurements/fetchMeasurementFieldsByType',
    async ({ type, thunkAPI }) => {
        try {
            const response = await fetchMeasurementFieldsByTypeAPI(type)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addMeasurement = createAsyncThunk(
    'measurements/addMeasurement',
    async ({ body }, thunkAPI) => {
        try {
            const response = await addMeasurementAPI(body)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const fetchAllMeasurements = createAsyncThunk(
    'measurements/fetchAllMeasurements',
    async (_, thunkAPI) => {
        try {
            const response = await fetchAllMeasurementsAPI()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const fetchMeasurementsByCustomer = createAsyncThunk(
    'measurements/fetchMeasurementsByCustomer',
    async ({ customerId }, thunkAPI) => {
        try {
            const response = await fetchMeasurementByCustomerAPI(customerId)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)