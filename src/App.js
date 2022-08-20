import './App.css';
import { Suspense, useEffect, useState } from 'react';
import img from './assets/menu-icon.png'
import cross from './assets/cross.png'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {init,appActions} from './redux/slices/app.feature'
import Catalog from './components/Catalog';
import Register from './components/Register'
import NotificacionBar from './components/notification_bar/NotificationBar';




function App() {

  const { view, ui,loading,message,request_status } = useSelector(state => state.appFeature)
  let [bodyChildren, setBodyChildren] = useState(<Home/>)
  useEffect(() => {
    const changeBodyChildren = () => {
      switch(view.toUpperCase()){
        case 'HOME':
          setBodyChildren(<Home/>)
          break;
        case 'CATALOGO':
          setBodyChildren(<Catalog/>)
          break;
        case 'REGISTRO':
          setBodyChildren(<Register/>)
          break;
          default:
            break;
      }
    }
    changeBodyChildren()
  }, [view])
  console.log(request_status)

  let dispatch = useDispatch()

  let wrapperRef = React.createRef();

  const handleOpen = () => {
    const wrapper = wrapperRef.current;
    wrapper.classList.toggle('Nav-Open')
  }

  const handleChangeUI = (value)=>{
    dispatch(appActions.changeUi(value))
    handleOpen()
  }


  return (
    <div className='boundary'>
      {(view == 'landing') ?
        <Landing />
        :
        <Suspense>
          <div className="App">
            <Header methods={handleOpen} />
            <Body children={bodyChildren}/>
          </div>
            <NotificacionBar/>
          <Nav reference={wrapperRef} methods={{handleOpen,handleChangeUI}} pages={ui.views} />
        </Suspense>
      }
    </div>
  );
}



function Home() {
  return (
    <>
      <h1>Home</h1>
    </>
  )
}

function Nav({ pages = ['example'], title = 'App', reference, methods }) {
  return (
    <div ref={reference} className='Nav'>
      <div className='Nav-header'>
        <div className='Nav-title' >
          <h2>{title}</h2>
        </div>
        <div onClick={() => methods.handleOpen()} className='Nav-button-nav'>
          <img src={cross} width={30} height={30} className='nav-close-button'/>
        </div>
      </div>
      <div className='nav-item-container'>
        {pages.map((item, index) => (
          <div className='Nav-item' key={index} onClick={()=>methods.handleChangeUI(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function Header({ title = 'app', methods }) {
  return (
    <div className='Header'>
      <div className='Nav-button' onClick={() => methods()}>
        <img className='Nav-open-button' src={img} width={30} height={30} />
      </div>
      <div className='app-title'>
        <h1>{title}</h1>
      </div>
    </div>
  )
}

function Body({ children }) {
  return (
    <div className='body-app'>
      {children}
    </div>
  )
}

function Landing() {
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(init())}>
      Inicial Aplicacion</button>
  )
}

export default App;
