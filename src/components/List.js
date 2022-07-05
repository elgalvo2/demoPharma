import React from "react";
import './list.css'

export default function List() {
    return (
        <div className="layout">
            <div className="head">
                <h2>Buscar por: </h2>
                <div className="controls">
                    <div>
                        <label>Nombre: </label>
                        <input />
                    </div>
                    <div>
                        <label>Codigo: </label>
                        <input />
                    </div>
                </div>
            </div>
            <div className="list-items">
                <ListItem />
            </div>
        </div>
    )
}

function ListItem({data ={code:'1111',name:'medicamento',variation:'Tabletas',cantity_per_container:25}}){
    return (
        <div className="list-item">
            <div>
                <p>Codigo: {data.code}</p>
            </div>
            <div>
            <p>{data.name}</p>
            </div>
            <div>
            <p> {data.cantity_per_container +' '+data.variation}</p>
            </div>
            
        </div>
    )
}