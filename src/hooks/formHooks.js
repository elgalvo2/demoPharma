import { useState, useEffect } from 'react'
import { regiterMed } from '../redux/slices/app.feature';
import store from '../redux/store'

const validation_options = {
    code: {
        type: 'number',
        length: 4,

    },
    name: {
        type: 'string'
    },
    cantity_per_container: {
        type: 'number',
        max: 999,
        min: 1
    },
    variation: {
        type: 'string',
    },
    drug_info: {
        type: 'string',
    },
    considerations: {
        type: 'string'
    }
}

export function useForm(initialForm) {
    let [form, setForm] = useState(initialForm);
    let [error, setError] = useState(initialForm);
    let [ready, setReady] = useState(false);

    useEffect(()=>{
        const init = ()=>{
            setForm(initialForm)
            setError(initialForm)
            setReady(false)
        }
        init()
    },[initialForm])

    
    useEffect(() => {
        const isReady = () => {
            let pass = false;
            let error_free = false;

            for (const [key,value] of Object.entries(form)) {
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
        isReady()
    }, [form])

    let handleChange = (e) => {
        let { error, pass } = form_validator(e,validation_options)
        if (!!pass) {
            setError({
                ...error,
                [e.target.name]: ''
            })
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            })
        } else {
            setError({
                ...error,
                [e.target.name]: error
            })
        }

    }

    let handleSend =async ()=>{
        await store.dispatch(regiterMed({drug_data:form}))
        
        const {context,loading, message,request_status} = await store.getState().appFeature
        if(request_status=='success'){
            handleReset()
        }else{
            console.error(message)
        }
    }
    let handleReset = ()=>{
        setForm(initialForm)
        setError(initialForm)
    }

    return { form, handleChange, error ,ready,handleSend,handleReset}

}

export function form_validator(e,validation_options) {
    let name = e.target.name
    let value = e.target.value

    const validation = validation_options[name]

    const response = { pass: false, error: null }

    for (const [key, vali_value] of Object.entries(validation)) {
        if (key === 'type') {
            switch (vali_value) {
                case 'number':
                    if (typeof parseInt(value) === 'number') {
                        response.pass = true;
                        response.error = null
                    } else {
                        response.error = 'Not a number'
                        response.pass = false;
                    }
                    break;
                case 'string':
                    response.pass = true;
                    response.error = null
                    break;
                default:
                    break;
            }
        }
        if (key === 'max') {
            if (value <= vali_value) {
                response.pass = true
                response.error = null
            } else {
                response.pass = false;
                response.error = 'El maximo para este campo es' + vali_value
            }
        }
        if (key === 'min') {
            if (value >= vali_value) {
                response.pass = true
                response.error = null
            } else {
                response.pass = false;
                response.error = 'El minimo para este campo es' + vali_value
            }
        }
        if (key === 'length') {
            if (value.length <= vali_value) {
                response.pass = true
                response.error = null
            } else {
                response.pass = false;
                response.error = 'Los caracteres permitidos para este campo son ' + vali_value
            }
        }
        if (response.pass === false) {
            break
        }
    }
    return response

}
