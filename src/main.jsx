
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router, RouterProvider } from "react-router-dom";

import router from './router';

import './assets/css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={ router } />
	</React.StrictMode>,
)
