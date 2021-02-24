import React, { useContext, useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "./AccountContext";
import { createUser } from "../../actions/account";
import LoaderButton from "../Button/LoadingButton";
import validate from "./validation";

const Register = () => {
	const [validated, setValidated] = useState(false);
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const userError = useSelector((state) => state.account.createError);
	const userCreated = useSelector((state) => state.account.createMessage);
	const loading = useSelector((state) => state.account.loading);
	const { switchToSignin } = useContext(AccountContext);
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		setValidated(true);
		event.preventDefault();
		const formErrors = validate(userData);
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			event.stopPropagation();
		} else {
			setErrors({});
			dispatch(createUser(userData, history));
		}
	};

	return (
		<Container className="account-height">
			<Row className="mt-4 align-text-center">
				<Col>
					<h3>Please Sign Up!</h3>
				</Col>
			</Row>
			<Form className="mt-5" noValidate onSubmit={handleSubmit}>
				<Row className="flex-column">
					<Form.Group controlId="email">
						<Form.Control
							name="email"
							type="email"
							placeholder="Email"
							required
							isValid={validated && !errors.email}
							isInvalid={!!errors.email || !!userError}
							onChange={(e) =>
								setUserData({ ...userData, email: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.email}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="flex-column">
					<Form.Group controlId="username">
						<Form.Control
							name="username"
							required
							type="text"
							placeholder="Username"
							isValid={validated && !errors.username}
							isInvalid={!!errors.username || !!userError}
							onChange={(e) =>
								setUserData({ ...userData, username: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.username}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="flex-column">
					<Form.Group controlId="password">
						<Form.Control
							name="password"
							required
							type="password"
							placeholder="Password"
							isValid={validated && !errors.password}
							isInvalid={!!errors.password || !!userError}
							onChange={(e) =>
								setUserData({ ...userData, password: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="flex-column">
					<Form.Group controlId="confirmPassword">
						<Form.Control
							name="password"
							required
							type="password"
							placeholder="Confirm Password"
							isValid={validated && !errors.confirmPassword}
							isInvalid={!!errors.confirmPassword || !!userError}
							onChange={(e) =>
								setUserData({ ...userData, confirmPassword: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.confirmPassword}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				{(userError || userCreated) && (
					<Alert variant={userError ? "danger" : "success"}>
						{userError || userCreated}
					</Alert>
				)}

				<Row className="mt-5">
					<LoaderButton
						className="submit-button"
						type="submit"
						loading={loading}
					>
						Register
					</LoaderButton>
				</Row>
				<Row className="flex-column mt-3 align-text-center">
					<p className="underline-on-hover" onClick={switchToSignin}>
						Already have an account? Login!
					</p>
				</Row>
			</Form>
		</Container>
	);
};

export default Register;
