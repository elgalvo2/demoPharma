import React from "react";
import './catalog.css'
import FormCatalog from "./catalog_form/CatalogForm";
import List from "./List";

export default function Catalog() {
    return (
        <>
            <div className="catalog">
                <h2>Catalog de medicamentos</h2>
                <div className="catalog-layout">
                    <FormCatalog/>
                    <div className="catalog-list">
                        <List/>
                    </div>
                </div>
            </div>
        </>
    )
}