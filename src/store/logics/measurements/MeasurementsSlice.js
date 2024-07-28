import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addMeasurementAPI, fetchAllMeasurementsAPI, fetchMeasurementFieldsByTypeAPI } from './MeasurementsApi'

const MeasurementsSlice = createSlice({
    name: 'measurementsSlice',
    initialState: {
        loader: false,
        measurementFields: [],
        measurements: [],
        error: false,
        message: ''
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
                    ...state
                }
            })
            .addCase(addMeasurement.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state
                }
            })
            .addCase(addMeasurement.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state
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