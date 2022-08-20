import React, { createRef, useEffect, useRef } from "react";
import RegisterForm from "./register_form/RegisterForm";
import { useSelector } from 'react-redux'
import './register.css'
import RegisterModal from "./register_modal/RegisterModal";
import store from "../redux/store";
import { appActions } from "../redux/slices/app.feature";
import DeleteModal from "./delete_modal/DeleteModal";
import {MemoizedList} from "./List";

export default function Register() {

    const modalRef = createRef()

    const handleClickClose = () => {
        store.dispatch(appActions.showModal(false))
    }

    const { register_modal_action, show_modal } = useSelector(state => state.appFeature)
    const { data, action } = register_modal_action;


    return (
        <>
            <div className="register-layout">
                <div className="form">
                    <RegisterForm />
                </div>
                <div className="list">
                    <MemoizedList />
                </div>

            </div>
            {(!!show_modal) && <div className="modal-background" onClick={() => handleClickClose()}>
            </div>}
            <dialog open={show_modal} id={'modal1'} className="register-modal" ref={modalRef}>
                {(action == 'update') && <RegisterModal closeMethod={handleClickClose} data={data} />}
                {(action === 'delete') && <DeleteModal closeMethod={handleClickClose} data={data} />}
            </dialog>
        </>
    )
}