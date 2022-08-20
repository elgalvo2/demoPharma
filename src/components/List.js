import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFilter } from "../hooks/filterHooks";
import { appActions } from "../redux/slices/app.feature";
import './list.css'

const initialState = {
    name: '',
    code: ''
}

export default function List({ method }) {

    const { context, view } = useSelector(state => state.appFeature)
    const { activeFilter, filterFields, filteredItems, handleChange } = useFilter(initialState, context)
    const dispatch = useDispatch()
    

    const handleController = (e) => {

        dispatch(appActions.changeModalAction(e))
        dispatch(appActions.showModal(true))
    }

    return (
        <div className="layout">
            <div className="head">
                <h2>Buscar: </h2>
                <div className="controls">
                    <div>
                        <input
                            placeholder="Nombre del medicamento"
                            value={filterFields.name}
                            onChange={(e) => handleChange(e)}
                            name={'name'}
                        />
                    </div>
                    <div>

                        <input
                            placeholder="Codigo del medicamento"
                            value={filterFields.code}
                            onChange={(e) => handleChange(e)}
                            name={'code'}
                        />
                    </div>
                </div>
            </div>
            <div className="list-items">

            {filteredItems.map((item, index) => (
                        <MemoizedListItem
                            key={index}
                            data={item}
                            method={method}
                            sideOp={(view.toUpperCase() == 'REGISTRO') ? true : false}
                            action={dispatch}
                            
                            controller_method={handleController}
                        />))}
                {/* {(activeFilter)
                    ? filteredItems.map((item, index) => (
                        <MemoizedListItem
                            key={index}
                            data={item}
                            method={method}
                            sideOp={(view.toUpperCase() == 'REGISTRO') ? true : false}
                            action={dispatch}
                            
                            controller_method={handleController}
                        />
                    ))
                    :
                    context.map((item, index) => (
                        <MemoizedListItem
                            key={index}
                            data={item}
                            method={method}
                            sideOp={(view.toUpperCase() == 'REGISTRO') ? true : false}
                            action={dispatch}
                            
                            controller_method={handleController}
                        />
                    ))} */}
            </div>
        </div>
    )
}

function ListItem({
    data = { code: '1111', name: 'medicamento', variation: 'Tabletas', cantity_per_container: 25 },
    method = null,
    sideOp = false,
    controller_method }) {
    return (
        <div className="item-row">
            <div className="list-item" onClick={(!!method) ? () => method(data) : null}>
                <div>
                    <p>{data.code}</p>
                </div>
                <div>
                    <p>{data.name}</p>
                </div>
                <div>
                    <p> {data.cantity_per_container + ' ' + data.variation}</p>
                </div>
            </div>
            {(!!sideOp)&&
            <div className="item-selected-side">
                <div className="item-controller">
                    <div onClick={() => controller_method({ action: 'update', data })}></div>
                    <div onClick={() => controller_method({ action: 'delete', data })}></div>
                </div>
            </div>
    }
        </div>
    )
}

const MemoizedListItem = React.memo(ListItem)


export const MemoizedList = React.memo(List) 