import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    context: {},
    ui: {
        views:['Home','Catalogo','Registro']
    },
    loading: false,
    message: '',
    view: 'landing',
    request_status: null
}

export const init = createAsyncThunk('app/init', async () => {
    
    try {
        let init = await axios.get(process.env.REACT_APP_PHARMACY_API + 'pharmacy_api/v1/drugs/getCatalog');
        return init.data
    } catch (err) {
        return Promise.reject(err)
    }
})

const appSlice = createSlice({
    name: 'app',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(init.pending, (state, action) => {
            state.loading = true;
            state.message = 'Iniciando aplicacion';
            state.view = 'landing';
        })
            .addCase(init.fulfilled, (state, action) => {
                state.loading = false;
                state.message = 'Bienvenido';
                state.context = action.payload.data;
                state.view = 'home'
            })
            .addCase(init.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message;
                state.view = initialState.view;
            })
    },reducers:{
        changeUi:function(state,action){
            console.log(action.payload)
            state.view = action.payload
        }
    }
})

export const appActions = appSlice.actions
export default appSlice.reducer