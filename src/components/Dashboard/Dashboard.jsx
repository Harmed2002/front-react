import { useState, useEffect } from "react";
import { Nav, Tab } from 'react-bootstrap';
import UserData from '../UserData/UserData';
import Posts from '../Posts/Posts';
import AuthUser from "../AuthUser/AuthUser";

const Dashboard = () => {
	const [key, setKey] = useState('tabUser');
	const { http } = AuthUser();
	const [userDetail, setUserdetail] = useState();
	const [userPosts, setUserposts] = useState();

	useEffect(() => {
		getUserDetail();
		getPostsDetail();
	}, []);

	const getUserDetail = () => {
		http.post('/me').then((res) => {
			setUserdetail(res.data);
		})
	}

	const getPostsDetail = () => {
		http.get('/posts').then((res) => {
			setUserposts(res.data);
		})

		// console.log("userPosts", userPosts);
	}

	return (
		// Pestañas
		<Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
			<Nav variant="tabs">
				<Nav.Item>
					<Nav.Link eventKey="tabUser">Users</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="tabPosts">Publications</Nav.Link>
				</Nav.Item>
			</Nav>

			<Tab.Content>
				<Tab.Pane eventKey="tabUser">
					<UserData userDetail = {userDetail} />
				</Tab.Pane>
				<Tab.Pane eventKey="tabPosts">
					<Posts userPosts = {userPosts} />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
}

export default Dashboard;