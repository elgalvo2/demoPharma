import React from "react";
import { deleteDrug } from "../../redux/slices/app.feature";
import store from "../../redux/store";
import { appActions } from "../../redux/slices/app.feature";
import './deleteModal.css'



export default function DeleteModal({ closeMethod, data }) {

    const handleDelete = async()=>{
        await store.dispatch(deleteDrug(data.code))
        let {message,request_status} = await store.getState().appFeature
        
        if(request_status=='success'){
            
            await store.dispatch(appActions.showModal(false))
        }else{
            console.error(message)
        }
    }


    return (
        <div className="modal-delete">
            <div className="modal-delete-form">
                <h4>Esta seguro de eliminar el medicamento: {data.name} con clave: {data.code} del sistema?</h4>
            </div>
            <div className="modal-delete-actions">
                <button onClick={() => closeMethod()}>Cancelar</button>
                <button onClick={()=>handleDelete()}>Aceptar</button>
            </div>
        </div>
    )
}