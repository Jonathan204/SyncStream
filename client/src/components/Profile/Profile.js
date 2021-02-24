import React, { useState } from "react";
import { Image, Row, Col, Card, Button } from "react-bootstrap";
import profilePicture from "../../images/default_account.png";
import "./styles.css";

const Profile = () => {
	const [editing, setEditing] = useState(false);
	const [email, setEmail] = useState("Sync.Streamer@example.com");
	const [username, setUsername] = useState("Sync Streamer");

	const handleEditProfile = (event) => {
		event.preventDefault();
		setEditing(true);
	};

	const handleSubmitProfile = (event) => {
		event.preventDefault();
		setEditing(false);
	};

	return (
		<div className="margin-box">
			<Row>
				<Col md="8">
					<Card>
						<Card.Header>
							<Card.Title as="h4">User Profile</Card.Title>
						</Card.Header>
						<Card.Body>
							<Row className="bottom-margin">
								<Col className="pr-1" md="6">
									<Card.Title>Username</Card.Title>
									{editing ? (
										<input
											id="usernameInput"
											type="text"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										></input>
									) : (
										<Card.Text>{username}</Card.Text>
									)}
								</Col>
								<Col className="pl-1" md="6">
									<Card.Title>Email address</Card.Title>
									{editing ? (
										<input
											id="emailInput"
											type="text"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										></input>
									) : (
										<Card.Text>{email}</Card.Text>
									)}
								</Col>
							</Row>
							<Row className="bottom-margin">
								<Col>
									<Card.Title>Password</Card.Title>
									<Card.Text>***************</Card.Text>
								</Col>
							</Row>
							<Row>
								<Col md="6">
									<Card.Title>Spotify Information</Card.Title>
								</Col>
								<Col>
									{editing ? (
										<Button type="submit" onClick={handleSubmitProfile}>
											Submit
										</Button>
									) : (
										<Button type="submit" onClick={handleEditProfile}>
											Edit Profile
										</Button>
									)}
								</Col>
							</Row>
							<Row>
								<Col xs="2">
									<Card.Text className="bold-title">Username:</Card.Text>
								</Col>
								<Col>
									<Card.Text>SpotifyLover2</Card.Text>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
				<Col md="4">
					<Card className="card-user">
						<Card.Body>
							<Image
								src={profilePicture}
								width="20%"
								height="20%"
								alt="logo"
								className="d-inline-block align-top"
								roundedCircle
							/>
							<Card.Title>Sync Streamer</Card.Title>
							<Card.Text>Sync.Streamer@example.com</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Profile;
