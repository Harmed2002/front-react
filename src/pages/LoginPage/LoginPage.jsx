import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import AuthUser from '../../components/AuthUser/AuthUser';

const LoginPage = () => {
	const { http, setToken } = AuthUser();
	const [email, setEmail] = useState({});
	const [password, setPassword] = useState({});

	const submitForm = () => {
		// Llamada a la API
		http.post('/login', { email: email, password: password }).then((res) => {
			// console.log(res.data);
			setToken(res.data.user, res.data.access_token);
		});

	}

	return (
		<div className='row justify-content-center pt-5'>
			<h1>Login</h1>
			<div className='col-sm-6'>
				<div className='card p-6'>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" className="form-control" placeholder="Ingrese email" id="email" onChange={e => setEmail(e.target.value)} required />
					</div>
					<div className="form-group mt-3">
						<label htmlFor="pwd">Password</label>
						<input type="password" className="form-control" placeholder="Ingrese password" id="pwd" onChange={e => setPassword(e.target.value)} required />
					</div>
					<button type="button" className="btn btn-primary mt-4" onClick={submitForm}>Login</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
