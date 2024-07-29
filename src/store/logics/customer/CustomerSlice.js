import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCustomerAPI, deleteCustomerAPI, fetchCustomersByCustomerNameAPI, getAllCustomersAPI } from "./CustomerApi";
const initialState = {
    status: false,
    error: false,
    message: '',
    loader: 'false',
    customers: [],
    addCustomerStatusHandlers: {
        loader: false,
        status: false,
        message: '',
        error: false
    }
}

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCustomers.pending, (state, action) => {
            console.log('pending', action);
            return {
                ...state,
                loader: true
            }
        });
        builder.addCase(getAllCustomers.fulfilled, (state, action) => {
            console.log('fulfilled', action.payload);
            return {
                ...state,
                status: action.payload.status,
                loader: false,
                message: action.payload.message,
                customers: action.payload.data
            }
        });
        builder.addCase(getAllCustomers.rejected, (state, action) => {
            console.log('rejected', action);
            return {
                ...state,
                loader: false,
                error: true,
                message: 'something went wrong'
            }
        });
        builder.addCase(addCustomer.pending, (state, action) => {
            console.log('pending', action.payload);
            return {
                ...state,
                addCustomerStatusHandlers: {
                    loader: true
                }
            }
        });
        builder.addCase(addCustomer.fulfilled, (state, action) => {
            console.log('fulfilled', action.payload);
            return {
                ...state,
                customers: state.customers.length > 0 && [...action.payload.data, ...state.customers],
                addCustomerStatusHandlers: {
                    loader: false,
                    message: action.payload.message,
                    status: true,
                    error: false
                }
            }
        });
        builder.addCase(addCustomer.rejected, (state, action) => {
            console.log('rejected', action.payload);
            return {
                ...state,
                addCustomerStatusHandlers: {
                    loader: false,
                    status: false,
                    error: true,
                }
            }
        });
        builder.addCase(deleteCustomer.pending, (state, action) => {
            console.log('delete customer pending action called');
            return {
                ...state
            }
        });
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            console.log('fulfilled deleteCustomer API', action.payload);
            return {
                ...state,
                customers: state.customers.filter((customer) => customer.customerId !== action.payload.customerId)
            }
        });
        builder.addCase(deleteCustomer.rejected, (state, action) => {
            console.log('delete customer rejected', action);
            return state
        });
        builder.addCase(fetchCustomersByCustomerName.fulfilled, (state, action) => {
            console.log('payload for fulfilled state', action.payload);
            return {
                ...state,
                customers: [...action.payload.data]
            }
        })
    }
})

export default customerSlice.reducer
export const { } = customerSlice.actions

export const getAllCustomers = createAsyncThunk(
    'customers/getAllCustomers',
    async (_, thunkAPI) => {
        console.log('get all customers action called');
        try {
            const response = await getAllCustomersAPI()
            console.log(response.data);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: 300 })
        }
    }
)

export const addCustomer = createAsyncThunk(
    'customers/addCustomer',
    async ({ body }, thunkAPI) => {
        console.log('addCustomer action called');
        try {
            const response = await addCustomerAPI(body)
            console.log(response.data);
            return response.data
        } catch (error) {
            return error
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (customerId, thunkAPI) => {
        console.log('delete customer action called');
        try {
            const response = await deleteCustomerAPI(customerId);
            return { customerId: customerId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchCustomersByCustomerName = createAsyncThunk(
    'measurements/fetchCustomersByCustomerName',
    async ({ customerName }, thunkAPI) => {
        try {
            const response = await fetchCustomersByCustomerNameAPI(customerName)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)