import React from "react";
import './catalog.css'
import FormCatalog from "./catalog_form/CatalogForm";
import List from "./List";
import { useGetDosis } from "../hooks/appHooks";

const initialForm = {
    code: '',
    name: '',
    units_per_day: '',
    authorized_months_cantity: '',
    ideal_dosis: '',
    drug_info: '',
    considerations: '',
}


export default function Catalog() {
    let { handleSelect, drugInfo, handleChange, error, ready, getDosis } = useGetDosis(initialForm)
    return (
        <>
            <div className="catalog-layout">
                <FormCatalog getDosisOf={drugInfo} method={{ handleChange, getDosis }} error={error} ready={ready} className='form'/>
                <div className="catalog-list">
                    <List view='catalog' method={handleSelect} />
                </div>
            </div>

        </>
    )
}