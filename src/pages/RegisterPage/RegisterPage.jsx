import { useState } from 'react';
import AuthUser from '../../components/AuthUser/AuthUser';
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
	const { http } = AuthUser();
	const [name, setName] = useState({});
	const [email, setEmail] = useState({});
	const [password, setPassword] = useState({});
	const [copyPassword, setcopyPassword] = useState({});
    const navigate = useNavigate();

	const submitForm = () => {
		// Llamada a la API
		http.post('/register', { name: name, email: email, password: password, copyPassword: copyPassword }).then((res) => {
			// console.log(res.data);
            navigate('/');
		});

	}

	return (
		<div className='row justify-content-center pt-5'>
			<h1>Register</h1>
			<div className='col-sm-6'>
				<div className='card p-6'>
                <div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" placeholder="Ingrese su nombre" id="name" onChange={e => setName(e.target.value)} required />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" className="form-control" placeholder="Ingrese email" id="email" onChange={e => setEmail(e.target.value)} required />
					</div>
					<div className="form-group mt-3">
						<label htmlFor="pwd">Password</label>
						<input type="password" className="form-control" placeholder="Ingrese password" id="pwd" onChange={e => setPassword(e.target.value)} required />
					</div>
                    <div className="form-group mt-3">
						<label htmlFor="repeat">Repeat Password</label>
						<input type="password" className="form-control" placeholder="Repita su password" id="repeat" onChange={e => setcopyPassword(e.target.value)} required />
					</div>
					<button type="button" className="btn btn-primary mt-4" onClick={submitForm}>Register</button>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
