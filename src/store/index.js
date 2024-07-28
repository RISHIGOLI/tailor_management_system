import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./logics/customer/CustomerSlice";
import MeasurementsSlice from "./logics/measurements/MeasurementsSlice";

const store = configureStore(
    {
        reducer:{
            customers: CustomerSlice,
            measurements: MeasurementsSlice
        }
    }
)

export default store