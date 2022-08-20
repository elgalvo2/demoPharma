import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'
import { appActions } from "../../redux/slices/app.feature";
import store from "../../redux/store";
import './notificationBar.css'

export default function NotificacionBar() {

    let { message, request_status, loading,infoMessage } = useSelector(state => state.appFeature)
    let [notiClasss, setNotiClass] = useState('info-bar')
    let [notiInfo, setNotiIfno] = useState(false)

    let timeoutRef = useRef()


    React.useEffect(() => {

        
        if (loading === true) {
            setNotiClass('info-bar show info-bar-info')
        } else {
            switch (request_status) {
                case 'success':
                    setNotiClass('info-bar show info-bar-success')
                    break;
                case 'fail':
                    setNotiClass(`info-bar show info-bar-fail`)
                    break;
                default:
                    setNotiClass('info-bar')
                    break;
            }
        }
        timeoutRef.current = window.setTimeout(() => setNotiClass(prev => {
            let clasString = prev.split(" ")
            clasString.splice(1, 1, 'close')
            let str = clasString.join(" ");
            console.log(str, 'string ')
            return str
        }), 3000)
        console.log(notiClasss, 'prev in timeout')
        return () => window.clearTimeout(timeoutRef.current)

    }, [request_status])

    useEffect(()=>{
        if(infoMessage!==''){
            setNotiClass('info-bar show info-bar-info');
            setNotiIfno(true)
            timeoutRef.current = window.setTimeout(() => setNotiClass(prev => {
                let clasString = prev.split(" ")
                clasString.splice(1, 1, 'close')
                let str = clasString.join(" ");
                store.dispatch(appActions.displayMessage(''))
                setNotiIfno(false)
                return str
            }), 2700)
            console.log(notiClasss)
        }
        return () => window.clearTimeout(timeoutRef.current)

    },[infoMessage])


    return (
        <>
            <div className={notiClasss}>
                <div className="noti-icon">
                    
                </div>
                <div className="noti-message">
                    {(notiInfo)?infoMessage:message}
                </div>
                <div className="noti-decorator">

                </div>
            </div>

        </>
    )
}

