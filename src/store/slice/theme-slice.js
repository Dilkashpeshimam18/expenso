import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    theme: 'light',
    isActivated: false
}

const ThemeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        activatePremium(state) {
            state.theme = 'dark'
            state.isActivated = true
        },
        toggleTheme(state) {
            if (state.theme == 'light') {
                state.theme = 'dark'
                state.isActivated = true

            } else {
                state.theme = 'light'
                state.isActivated = false
            }


        }
    }
})

export const themeActions = ThemeSlice.actions
export default ThemeSlice.reducer