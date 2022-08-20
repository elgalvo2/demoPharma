import React, { useState, useEffect } from "react";
import './registerModal.css'
import {useDispatch,useSelector} from 'react-redux'
import { useForm } from "../../hooks/formHooks";
import { appActions, updateDrug } from "../../redux/slices/app.feature";
import store from "../../redux/store";

const variation_options=[
    "Tableta",
    "Solucion Inyectable",
    "Liquido",
    "Emulsion Inyectable",
    "Solucion inyectable al 2%",
    "Solucion inyectable al 10%",
    "Comprimido",
    "Capsula",
    "Tableta de liberacion prolongada",
    "Tableta de liberacion retardada",
    "Comprimido con caja enterica",
    "Tableta dispersable",
    "Otro"
]


export default function RegisterModal({ closeMethod,data}) {
    let { form, handleChange, error ,ready,handleSend,handleReset}=useForm(data)

    
    
    const handleUpdate = async()=>{
        await store.dispatch(updateDrug({drug_data:form}))
        let {message,request_status} = await store.getState().appFeature
        
        if(request_status=='success'){
            closeMethod()
        }else{
            console.error(message)
        }

    }
    

    return (
        <div className="modal-div">
            <div className="modal-form">
                <div className="modal-form-code">
                    <p>Codigo: {form.code}</p>
                </div>
                <div className="modal-form-name">
                    <p>Nombre: {form.name}</p>
                </div>
                <div className="modal-form-variation">
                    <label>Presentacion: </label>
                    <select value={form.variation} name={'variation'} onChange={(e)=>handleChange(e)}>
                        <option value={form.variation}>{form.variation}</option>
                        {variation_options.map((item,index)=>(
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="modal-form-cantity">
                    <label>Cantidad por caja: </label>
                    <input value={form.cantity_per_container} name={'cantity_per_container'} onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="modal-form-info">
                    <label>Informacion:</label>
                    <textarea value={form.drug_info} onChange={(e)=>handleChange(e)} name={'drug_info'}/>
                </div>
                <div className="modal-form-considerations">
                    <label>Descripcion: </label>
                    <textarea value={form.considerations} onChange={(e)=>handleChange(e)} name={'considerations'}/>
                </div>
            </div>
            <div className="modal-form-actions">
                <button onClick={() => closeMethod()}>Cancelar</button>
                <button disabled={!ready} onClick={()=>handleUpdate()}>Aceptar</button>
            </div>
        </div>
    )
}