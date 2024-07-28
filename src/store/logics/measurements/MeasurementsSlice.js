import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMeasurementFieldsByTypeAPI } from './MeasurementsApi'

const MeasurementsSlice = createSlice({
    name: 'measurementsSlice',
    initialState: {
        loader: false,
        measurementFields: [],
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