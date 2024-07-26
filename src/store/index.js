import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./logics/customer/CustomerSlice";

const store = configureStore(
    {
        reducer:{
            customers: CustomerSlice
        }
    }
)

export default store