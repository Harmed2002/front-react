import { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import AuthUser from "../AuthUser/AuthUser";
import Swal from 'sweetalert2';

const Posts = ({ userPosts }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [editedPost, setEditedPost] = useState({ title: '', content: '' });
	const [newPost, setNewPost] = useState({ title: '', content: '' });
	const [idDeletedPost, setIdDeletedPost] = useState();
	const { http } = AuthUser();

	const handleEdit = post => {
		setEditedPost(post);
		setShowEditModal(true);
	};

	const handleCreate = () => {
		setShowCreateModal(true);
	};

	const handleCloseEditModal = () => {
		setShowEditModal(false);
		setEditedPost({});
	};

	const handleCloseCreateModal = () => {
		setShowCreateModal(false);
		setNewPost({ title: '', content: '' });
	};

	const handleEditSave = () => {
		onEdit(editedPost);
		handleCloseEditModal();
	};

	const handleCreateSave = () => {
		onCreate(newPost);
		handleCloseCreateModal();
	};
	
	// Actualizar Post
	const onEdit = (editedPost) => {
		http.post('/posts', editedPost).then((res) => {
			// console.log(res.data);
            // navigate('/');
		});
	};

	// Crear Post
	const onCreate = (newPost) => {
		http.post('/post', newPost).then((res) => {
			console.log(res.data);
            // navigate('/');
		});
	};

	const handleDeleteSave = () => {
		onDelete(idDeletedPost);
		handleCloseDeleteModal();
	};

	const handleDelete = postId => {
		setShowDeleteModal(true);
		setIdDeletedPost(postId);
		
		// handleCloseDeleteModal();
	};

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};

	// Eliminar Post
	const onDelete = (postId) => {
		// const swalWithBootstrapButtons = Swal.mixin({
		// 	customClass: {
		// 		confirmButton: "btn btn-success",
		// 		cancelButton: "btn btn-danger"
		// 	},
		// 	buttonsStyling: false
		// });
		// swalWithBootstrapButtons.fire({
		// 	title: "¿Está Ud. seguro?",
		// 	text: "¡Tenga en cuenta que no se puede revertir!",
		// 	icon: "warning",
		// 	showCancelButton: true,
		// 	confirmButtonText: "Sí, Borrar!  ",
		// 	cancelButtonText: "No, cancela!",
		// 	reverseButtons: true
		// }).then((result) => {
		// 	if (result.isConfirmed) {
				http.delete('/posts/' + postId).then((res) => {
					console.log(res.data);
				});
				// swalWithBootstrapButtons.fire({
				// 	title: "Borrado!",
				// 	text: "El post ha sido borrado.",
				// 	icon: "success"
				// });
		// 	} else if (
		// 		/* Read more about handling dismissals below */
		// 		result.dismiss === Swal.DismissReason.cancel
		// 	) {
		// 		swalWithBootstrapButtons.fire({
		// 			title: "Cancelado",
		// 			text: "El post sigue disponible",
		// 			icon: "error"
		// 		});
		// 	}
		// });
	};

	const renderElement = () => {
		if (userPosts) {
			return <div>
				<Button variant="success" onClick={handleCreate}>Add New</Button>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Title</th>
							<th scope="col">Content</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{userPosts.map(post => (
							<tr key={post.id}>
								<td>{post.id}</td>
								<td>{post.title}</td>
								<td>{post.content}</td>
								<td>
									<Button variant="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
									{' '}
									<Button variant="primary" onClick={() => handleEdit(post)}>Edit</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				{/* Modal para editar post */}
				<Modal show={showEditModal} onHide={handleCloseEditModal}>
					<Modal.Header closeButton>
						<Modal.Title>Editar Post</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="formTitle">
								<Form.Label>Título</Form.Label>
								<Form.Control
									type="text"
									placeholder="Ingrese el título"
									value={editedPost.title}
									onChange={e => setEditedPost({ ...editedPost, title: e.target.value })}
								/>
							</Form.Group>
							<Form.Group controlId="formContent">
								<Form.Label>Contenido</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									placeholder="Ingrese el contenido"
									value={editedPost.content}
									onChange={e => setEditedPost({ ...editedPost, content: e.target.value })}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseEditModal}>Cerrar</Button>
						<Button variant="primary" onClick={handleEditSave}>Guardar Cambios</Button>
					</Modal.Footer>
				</Modal>

				{/* Modal para crear nuevo post */}
				<Modal show={showCreateModal} onHide={handleCloseCreateModal}>
					<Modal.Header closeButton>
						<Modal.Title>Crear Nuevo Post</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="formTitle">
							<Form.Label>Título</Form.Label>
							<Form.Control
								type="text"
								placeholder="Ingrese el título"
								value={newPost.title}
								onChange={e => setNewPost({ ...newPost, title: e.target.value })}
							/>
							</Form.Group>
							<Form.Group controlId="formContent">
							<Form.Label>Contenido</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Ingrese el contenido"
								value={newPost.content}
								onChange={e => setNewPost({ ...newPost, content: e.target.value })}
							/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseCreateModal}>Cerrar</Button>
						<Button variant="primary" onClick={handleCreateSave}>Crear Post</Button>
					</Modal.Footer>
				</Modal>

				{/* Modal para eliminar post */}
				<Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
					<Modal.Header closeButton>
						<Modal.Title>Eliminar Post</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>¿Confirma que desea borrar el post id. {idDeletedPost}?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
						<Button variant="primary" onClick={handleDeleteSave}>Borrar Post</Button>
					</Modal.Footer>
				</Modal>
			</div>

		} else {
			return <p>Loading...</p>
		}
	}

	return (
		<div>
			<h2>User Posts</h2>
			{renderElement()}
		</div>
	);
};

export default Posts;