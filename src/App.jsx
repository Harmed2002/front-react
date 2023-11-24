// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import AuthUser from "./components/AuthUser/AuthUser";

// Pages
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// React Router Dom
import { Routes, Route } from "react-router-dom";

// function App() {
const App = () => {
	const { getToken } = AuthUser();
	if (!getToken()) {
		return <LoginPage />
	}

	return (
		// <Router>
			<div className="App">
				<NavBar />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		// </Router>
	)
}

export default App
