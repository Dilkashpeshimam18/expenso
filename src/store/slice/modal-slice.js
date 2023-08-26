import { createSlice } from "@reduxjs/toolkit";


const initialModalState = {
    open: false,
    addNew: false,
    isEdit:false

}

const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        handleClickOpen(state) {
            state.open = true
        },

        handleClose(state) {
            state.open = false
            state.addNew=false
            state.isEdit=false
        },
        handleAddNew(state) {
            state.addNew = true
        },
        handleisNotNew(state) {
            state.addNew = false
        },
        handleIsEdit(state){
            state.isEdit=true
        }

    }
})

export const modalActions = ModalSlice.actions
export default ModalSlice.reducer