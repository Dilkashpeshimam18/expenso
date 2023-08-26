import { createSlice } from "@reduxjs/toolkit"

const initialDashboardState = {
    isSelected: 'Dashboard'
}

const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialDashboardState,
    reducers: {
        handleIsSelected(state, action) {
            state.isSelected = action.payload
        }
    }
})

export const dashboardActions = DashboardSlice.actions
export default DashboardSlice.reducer