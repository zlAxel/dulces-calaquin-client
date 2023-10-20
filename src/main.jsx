
// ! Importaciones de React

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// ! Importaciones de Estilos

import './assets/css/main.css'
import { AppProvider } from './context/AppProvider';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppProvider>
				<AuthProvider >
					<App />
				</AuthProvider>
			</AppProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
