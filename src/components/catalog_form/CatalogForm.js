import React  from "react";
import './catalogForm.css'

export default function FormCatalog(){
    return(
        <div className="catalog-form">
                        <div className="code">
                            <label>Codigo: </label>
                            <input type={'number'} maxLength={'4'} max={'9999'} min={'0'} />
                        </div>
                        <div className="name">
                            <label>Nombre: </label>
                            <input type={'text'} maxLength={70} />
                        </div>
                        <div className="dosis-input">
                            <label>Dosis diaria:</label>
                            <input type={'number'} maxLength={2} max={10} min={0} step={0.5} />
                        </div>
                        <div className="auth-months">
                            <label>Meses autorizados:</label>
                            <input type={'number'} maxLength={2} max={12} min={0} step={1} />
                        </div>
                        <div className="send-button">
                            <button>Obtener dosis</button>
                        </div>
                        <div className="ideal-dosis">
                            <p>Dosis ideal: </p>
                            <p style={{textAlign:'center',border: '1px solid grey'}}>##</p>
                        </div>
                        <div className="info">
                            <p>info del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddfsdfsd info del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfdddd info del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfddddinfo del medicamuede ser largo dsjhadk hadfjkasasdhkj fasjkdfh aksdfjha sjdhfkh kasdfhjk ddddasdfa fd f dfasdfsda sdafsdf asdfdddd</p>
                        </div>
                    </div>
    )
}