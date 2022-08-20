import { useState,useEffect } from "react";
import { appActions } from "../redux/slices/app.feature";
import store from "../redux/store";
import { form_validator } from "./formHooks";

const validation_options = {
    authorized_months_cantity: {
        type: 'number',
        length: 2,


    },
    units_per_day: {
        length: 4
    }
}


export function useGetDosis(initialState){
    
    let [drugInfo, setDrugInfo] = useState(initialState)
    let [error,setError] = useState(initialState)
    let [ready,setReady] = useState(false)

    useEffect(()=>{
        const toSend = ()=>{
            let pass = false;
            let error_free = false;

            for (const [key,value] of Object.entries(drugInfo)) {
                if (value === '') {
                    pass=false
                } else {
                    pass = true
                }
            }
            if (pass==true) {
                for (const [key,value] of Object.entries(error)) {
                    if (value === '') {
                        error_free = true
                    }else{
                        pass=false
                    }
                }
            } 
            if(error_free == true && pass==true){
                setReady(true)
            }else{
                setReady(false)
            }
        }
        toSend()
    },[drugInfo])

    const getDosis = ()=>{
        if(drugInfo.units_per_day === '' || drugInfo.authorized_months_cantity === ''){
            store.dispatch(appActions.displayMessage('Es necesario llenar los campos'))
        }else{
            console.log(drugInfo,'hook')
            let units_per_period = parseFloat(drugInfo.units_per_day)*parseInt(drugInfo.authorized_months_cantity)*30
            let dosis = Math.ceil(units_per_period/drugInfo.cantity_per_container)
            console.log(dosis)
            setDrugInfo({
                ...drugInfo,
                ideal_dosis:dosis
            }) 
            console.log(drugInfo)
        }
    }

    const handleSelect = (drug)=>{
        console.log(drug,'drug in hook')
        setDrugInfo({
            ...drugInfo,
            code:drug.code,
            name:drug.name,
            drug_info:drug.drug_info,
            considerations:drug.considerations,
            cantity_per_container:drug.cantity_per_container
        })
    }
    let handleChange = (e) => {
        let { error, pass } = form_validator(e,validation_options)
        if (!!pass) {
            setError({
                ...error,
                [e.target.name]: ''
            })
            setDrugInfo({
                ...drugInfo,
                [e.target.name]: e.target.value,
            })
        } else {
            setError({
                ...error,
                [e.target.name]: error
            })
        }

    }

    return {handleSelect,drugInfo,handleChange,error,ready,getDosis}
}
