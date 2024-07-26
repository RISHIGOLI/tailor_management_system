import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCustomerAPI, getAllCustomersAPI } from "./CustomerApi";
const initialState = {
    status: false,
    error: false,
    message: '',
    loader: 'false',
    customers: []
}

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(getAllCustomers.pending,(state,action)=>{
            console.log('pending',action);
            return {
                ...state,
                loader: true
            }
        });
        builder.addCase(getAllCustomers.fulfilled,(state,action)=>{
            console.log('fulfilled',action.payload);
            return {
                ...state,
                status: action.payload.status,
                loader:false,
                message: action.payload.message,
                customers: action.payload.data
            }
        });
        builder.addCase(getAllCustomers.rejected,(state,action)=>{
            console.log('rejected',action);
            return {
                ...state,
                loader:false,
                error: true,
                message: 'something went wrong'
            }
        });
        builder.addCase(addCustomer.pending,(state,action)=>{
            console.log('pending', action.payload);
            return {
                ...state,
                // loader: true
            }
        });
        builder.addCase(addCustomer.fulfilled,(state,action)=>{
            console.log('fulfilled',action.payload);
            return {
                ...state,
                customers: state.customers.length > 0 && [...action.payload.data, ...state.customers],
                // loader: false
            }
        });
        builder.addCase(addCustomer.rejected,(state,action)=>{
            console.log('rejected',action.payload);
            return {
                ...state
            }
        })
    }
})

export default customerSlice.reducer
export const {} = customerSlice.actions

export const getAllCustomers = createAsyncThunk(
    'getAllCustomers',
    async (_,thunkAPI)=>{
        console.log('get all customers action called');
        try{
            const response = await getAllCustomersAPI()
            console.log(response.data);
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue({message:300})
        }
    }
)

export const addCustomer = createAsyncThunk(
    'addCustomer',
    async ({body}, thunkAPI) => {
        console.log('addCustomer action called');
        try{
            const response = await addCustomerAPI(body)
            console.log(response.data);
            return response.data
        }catch(error){
            return error
        }
    }
)