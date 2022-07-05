import React from "react";
import List from "./List";
import RegisterForm from "./register_form/RegisterForm";
import './register.css'

export default function Register() {
    return (
        <>
            <div className="register-layout">
                <h2 className="title">Registro de medicamentos</h2>
                <div className="form">
                    <RegisterForm />
                </div>
                <div className="list">
                    <List />
                </div>

            </div>
        </>
    )
}