// import { useEffect, useState } from 'react';

const UserData = ({ userDetail }) => {
	// Valido si existen datos de usuario
	const renderElement = () => {
		if (userDetail) {
			return <div>
				<h6>Name</h6>
				<p>{userDetail.name}</p>
				<h6>Email</h6>
				<p>{userDetail.email}</p>
			</div>
		} else {
			return <p>Loading...</p>
		}
	}

	return (
		<div>
			<h2>User Data</h2>
			{ renderElement() }
		</div>
	);
};

export default UserData;
