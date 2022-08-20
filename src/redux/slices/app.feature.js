import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    context: [],
    ui: {
        views: ['Home', 'Catalogo', 'Registro']
    },
    loading: false,
    message: '',
    view: 'landing',
    request_status: null,
    register_modal_action: {},
    show_modal: false,
    infoMessage: ''
}

export const init = createAsyncThunk('app/init', async () => {

    try {
        let init = await axios.get(process.env.REACT_APP_PHARMACY_API + 'pharmacy_api/v1/drugs/getCatalog');
        return init.data
    } catch (err) {
        return Promise.reject(err.response.data.error)
    }
})

export const updateDrug = createAsyncThunk('med/update', async (data) => {
    try {
        let res = await axios.put(process.env.REACT_APP_PHARMACY_API + 'pharmacy_api/v1/drugs/updateDrugInfo', data, {})
        return res.data
    } catch (err) {
        return Promise.reject(err.response.data.error)
    }
})

export const deleteDrug = createAsyncThunk('med/delete', async (data) => {
    try {
        let res = await axios.delete(process.env.REACT_APP_PHARMACY_API + `pharmacy_api/v1/drugs/deleteDrug/${data}`)
        console.log(res, 'respuesta del servido')
        if (res.data.success) {
            return data
        } else {
            return Promise.reject('No se elimino el medicamento')
        }
    } catch (err) {
        return Promise.reject(err.response.data.error)
    }
})

export const getIdealDosis = createAsyncThunk('med/getIdealDosis', async (data) => {
    try {
        let res = await axios.post(process.env.REACT_APP_PHARMACY_API + 'pharmacy_api/v1/drugs/getIdealDosis', data, {})
        return res.data
    } catch (err) {

        return Promise.reject(err.response.data.error)
    }
})

export const regiterMed = createAsyncThunk('med/register', async (data) => {
    try {
        let res = await axios.post(process.env.REACT_APP_PHARMACY_API + 'pharmacy_api/v1/drugs/registerDrug', data, {})
        return res.data
    } catch (err) {
        console.log(err,'error recibido')
        return Promise.reject(err.response.data.error)
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
            state.request_status = null


        })
            .addCase(init.fulfilled, (state, action) => {
                console.log(action.payload.data, 'init context data')
                state.request_status = 'success'
                state.loading = false;
                state.message = 'Bienvenido';
                state.context = action.payload.data;
                state.view = 'home'

            })
            .addCase(init.rejected, (state, action) => {
                state.request_status = 'fail'
                state.loading = false;
                state.message = action.error.message;
                state.view = initialState.view;

            })
            // register
            .addCase(regiterMed.pending, (state, action) => {
                state.loading = true;
                state.request_status = null
                state.message = 'Registrando medicamento'
            })
            .addCase(regiterMed.fulfilled, (state, action) => {
                state.loading = false;
                state.request_status = 'success';
                state.message = 'Medicamento registrado correctamente'
                state.context.push(action.payload.data);
            })
            .addCase(regiterMed.rejected, (state, action) => {
                console.log(action.error)
                state.request_status = 'fail';
                state.loading = false;
                state.message = action.error.message

            })
            //update
            .addCase(updateDrug.pending, (state, action) => {
                state.loading = true;
                state.request_status = null
                state.message = 'Actualizando medicamento'
            })
            .addCase(updateDrug.fulfilled, (state, action) => {
                state.loading = false;
                state.request_status = 'success';
                state.message = 'Medicamento actualizado correctamente';
                let res_id = action.payload.data._id;
                let items = [...current(state.context)]
                const index = Array.from(items).findIndex((item) => {
                    return item._id == res_id;
                })
                state.context[index] = action.payload.data;
            })
            .addCase(updateDrug.rejected, (state, action) => {
                state.request_status = 'fail';
                state.loading = false;
                state.message = action.error.message;
            })
            //delete
            .addCase(deleteDrug.pending, (state, action) => {
                state.loading = true;
                state.request_status = null
                state.message = 'Eliminando medicamento'
            })
            .addCase(deleteDrug.fulfilled, (state, action) => {
                state.request_status = 'success';
                state.loading = false;
                state.message = 'Medicamento eliminado correctamente'
                let res_code = action.payload
                let items = [...current(state.context)]
                const index = Array.from(items).findIndex((item) => {
                    return item.code == res_code
                })
                state.context.splice(index, 1)
            })
            .addCase(deleteDrug.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message
                state.request_status = 'fail';
            })

    }, reducers: {
        changeUi: function (state, action) {
            console.log(action.payload)
            state.view = action.payload
        },
        changeModalAction: function (state, action) {
            console.log(action.payload)
            state.register_modal_action = action.payload
        },
        showModal: function (state, action) {
            state.show_modal = action.payload
        }, displayMessage: function (state, action) {
            state.infoMessage = action.payload
        }
    }
})

export const appActions = appSlice.actions
export default appSlice.reducer