import React from 'react';
import ReactDOM from 'react-dom/client';
import GProvider from './globalcontext';
import './index.css';
import App from './App';
import Login from './pages/Login'
import Signup from "./pages/Signup"
import Upload from './pages/uploadPage'
import Saved from "./pages/mySavedPosts"
import reportWebVitals from './reportWebVitals';
import Navbarx from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/viewinDetailPage';
import Editpage from './pages/editPage';
import Testxy from './components/test'
import MyPosts from './pages/myCollection'
import RAS from './pages/EditUserName'
import Return from './pages/ReturnPage'
import Register from './pages/register'
import PS from './pages/PaymentSuccess'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GProvider>
    <BrowserRouter>
    
      <Routes>
        
        <Route path='/' Component={App}/>
        <Route path = '/upload' Component={Upload}/>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path = '/detail/:postid' Component={DetailPage}/>
        <Route path = '/saved/:username' Component={Saved}/>
        <Route path = '/edit/:username/:postid' Component={Editpage}/>
        <Route path  = '/test' Component={Testxy}/>
        <Route path = '/my' Component={MyPosts}/>
        <Route path = '/editName' Component={RAS}/>
        <Route path = '/register' Component={Register}/>
        <Route path = '/getStatus/:userid' Component={Return}/>
        <Route path = '/payment/success/:postid' Component={PS}/>
      </Routes>
    
    </BrowserRouter>
    </GProvider>
  </React.StrictMode>
);
reportWebVitals();
