import React, { useEffect } from "react";
import './catalogForm.css'

export default function FormCatalog({ getDosisOf = {
    code: '',
    name: '',
    units_per_day: '',
    authorized_months_cantity: '',
    drug_info: '',
    considerations: '',
    ideal_dosis: '',
}, method,error,ready }) {

    return (
        <div className="catalog-form">
            <h3 className="title">Catalogo de medicamentos</h3>
            <div className="code">
                <label>Codigo: </label>
                <p>{getDosisOf.code}</p>
            </div>
            <div className="name">
                <label>Nombre: </label>
                <p className="name-wrap">{getDosisOf.name}</p>
            </div>
            <div className="dosis-input">
                <label>Dosis diaria:</label>
                <input
                    type={'number'}
                    name={'units_per_day'}
                    value={getDosisOf.units_per_day}
                    maxLength={2}
                    max={10}
                    min={0}
                    step={0.25}
                    onChange={(e) => method.handleChange(e)}
                />
                {(error.units_per_day)&&<span className="helper">{error.units_per_day}</span>}
            </div>
            <div className="auth-months">
                <label>Meses autorizados:</label>
                <input
                    type={'number'}
                    name={'authorized_months_cantity'}
                    value={getDosisOf.authorized_months_cantity}
                    maxLength={2}
                    max={12}
                    min={0}
                    step={1}
                    onChange={(e)=>method.handleChange(e)}
                />
                {(error.authorized_months_cantity)&&<span className="helper">{error.authorized_months_cantity}</span>}
            </div>
            <div className="send-button">
                <button disabled={!ready} onClick={()=>method.getDosis()}>
                    Obtener dosis ideal
                </button>
                <p style={{ textAlign: 'center', border: '1px solid grey' }}>
                    {getDosisOf.ideal_dosis}
                </p>
            </div>
            <div className="info">
                <p>{getDosisOf.drug_info}</p>
            </div>
            <div className="consi">
                <p>{getDosisOf.considerations}</p>
            </div>
        </div>
    )
}