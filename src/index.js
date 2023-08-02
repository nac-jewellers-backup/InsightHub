import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import reportWebVitals from './reportWebVitals';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import SalesReport from './salesreport/salesreport';
// import Users from './users/users';
// import User from './users/user';
// import Roles from './roles/roles';
// import Role from './roles/role';
import Page404 from './page404/page404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/salesreport" element={<SalesReport />} />
				{/* <Route path="/users" element={<Users />} />
				<Route path="/user/:id" element={<User />} />
				<Route path="/roles" element={<Roles />} />
				<Route path="/role/:id" element={<Role />} /> */}
				<Route path="*" element={<Page404 />} />
			</Routes>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
reportWebVitals();