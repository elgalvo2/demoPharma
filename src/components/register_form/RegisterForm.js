import React from "react";
import './registerForm.css'
import { useForm } from '../../hooks/formHooks'


const variations =
    [
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

const initialValue = {
    code: '',
    name: '',
    variation: '',
    cantity_per_container: '',
    drug_info: '',
    considerations: ''

}


export default function RegisterForm() {

    const { form, handleChange, error,ready,handleSend } = useForm(initialValue)


    return (
        <div className="form-layout">
            <h3 className="form-title">Registro de medicamento</h3>
            <div className="form-code">
                <label>Codigo: </label>
                <input
                    name='code'
                    value={form.code}
                    type={'text'}
                    style={{ width: '50%' }}
                    onChange={(e)=>handleChange(e)}
                />
                {(error.code)&&<span className="helper">{error.code}</span>}
            </div>
            <div className="form-name">
                <label>Nombre: </label>
                <input
                    name='name'
                    type={'text'}
                    value={form.name}
                    onChange={(e)=>handleChange(e)}
                    />
                    {(error.name)&&<span className="helper"> {error.name}</span>}
            </div>
            
            <div className="form-cant">
                <label>Cantidad por envase: </label>
                <input
                    type={'number'}
                    name='cantity_per_container'
                    value={form.cantity_per_container}
                    min={0}
                    max={999}
                    onChange={(e)=>handleChange(e)} />
                    {(error.cantity_per_container)&&<span className="helper"> {error.cantity_per_container}</span>}
            </div>
            <div className="form-variation">
                <label>Presentacion</label>
                <select 
                name="variation"
                 value={form.variation}
                 onChange={(e)=>handleChange(e)}
                 ><option value={''}> </option>
                    {variations.map((item, index) => (
                        <option key={index} value={item.toUpperCase()}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="form-info">
                <textarea
                    placeholder="Descripcion"
                    name="drug_info"
                    value={form.drug_info}
                    className="text-area-info"
                    onChange={(e)=>handleChange(e)}
                />
            </div>
            <div className="form-considerations">
                <textarea
                    placeholder="Consideraciones"
                    name='considerations'
                    value={form.considerations}
                    className="text-area-considerations"
                    onChange={(e)=>handleChange(e)}
                />
            </div>
            <div className="form-actions">
                <button>Limpiar</button>
                <button disabled={!ready} onClick={handleSend}>Guardar</button>
            </div>
        </div>
    )

}