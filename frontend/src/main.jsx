import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Mobile from './Mobile/Mobile'
import Desktop from './Desktop/Desktop';
import { BrowserRouter } from 'react-router-dom';
const mql = window.matchMedia('(max-width: 850px)');
let mobileView = mql.matches;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* {mobileView ? <Mobile /> : <Desktop />} */}
    <BrowserRouter>
      <Desktop />
    </BrowserRouter>


  </React.StrictMode>,
)
