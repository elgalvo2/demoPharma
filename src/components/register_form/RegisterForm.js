import React from "react";
import './registerForm.css'


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


export default function RegisterForm() {
    return (
        <div className="form-layout">
            <div className="form-code">
                <label>Codigo: </label>
                <input type={'text'} style={{width:'50%'}}/>
            </div>
            <div className="form-name">
                <label>Nombre: </label>
                <input type={'text'} />
            </div>
            <div className="form-variation">
                <label>Presentacion</label>
                <select>
                    {variations.map((item, index) => (
                        <option key={index} value={item.toUpperCase()}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="form-cant">
                <label>Cantidad por envase: </label>
                <input type={'number'} min={0} max={999} />
            </div>
            <div className="form-info">
                <textarea placeholder="Descripcion" className="text-area-info"/>
            </div>
            <div className="form-considerations">
                <textarea placeholder="Consideraciones" className="text-area-considerations"/>
            </div>
            <div className="form-actions">
                <button>Limpiar</button>
                <button>Guardar</button>
            </div>
        </div>
    )

}