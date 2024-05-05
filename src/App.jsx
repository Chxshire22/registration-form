import { useState,  } from "react";
import "./App.css";
import { useToast } from "./Components/toast-context";

function App() {
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [pwMatch, setPwMatch] = useState(true);
	const toast= useToast()


	const handleSubmit = (e) => {
		e.preventDefault();
		if (!pwMatch) return;
		sendData(userData);
	};

	const sendData = async (userData) => {
		try {
			const postUserData = await fetch(
				"https://jsonplaceholder.typicode.com/posts",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(userData),
				}
			);
			console.log(postUserData);
			if (!postUserData.ok) {
				throw new Error(
					`API request failed with status: ${postUserData.status}`
				);
			}
			else toast?.open("successfully registered")

		} catch (error) {
			console.log(error);
			toast?.open("There was an error")
		}
	};

//TODO: TOAST for user feedback
	return (
		<div className="page-container">
			<form action="" className="registration-form" onSubmit={handleSubmit}>
				<div className="registration-form__input-group">
					<label htmlFor="username-input" className="registration-form__labels">
						username{" "}
					</label>
					<input
						type="text"
						id="username-input"
						className="registration-form__inputs"
						required
						onChange={(e) =>
							setUserData((prev) => ({
								...prev,
								username: e.target.value.trim(),
							}))
						}
					/>
				</div>
				<div className="registration-form__input-group">
					<label htmlFor="email-input" className="registration-form__labels">
						email{" "}
					</label>
					<input
						type="email"
						id="email-input"
						className="registration-form__inputs"
						required
						onChange={(e) =>
							setUserData((prev) => ({ ...prev, email: e.target.value }))
						}
					/>
				</div>
				<div className="registration-form__input-group">
					<label htmlFor="password-input" className="registration-form__labels">
						password{" "}
					</label>
					<input
						type="password"
						id="password-input"
						className="registration-form__inputs"
						required
						onChange={(e) =>
							setUserData((prev) => ({ ...prev, password: e.target.value }))
						}
					/>
				</div>
				<div className="registration-form__input-group">
					<label
						htmlFor="confirm-password-input"
						className="registration-form__labels"
					>
						confirm password{" "}
					</label>
					<input
						type="password"
						id="confirm-password-input"
						className="registration-form__inputs pw-nomatch"
						required
						onChange={(e) => {
							e.target.value === userData.password
								? setPwMatch(true)
								: setPwMatch(false);
						}}
					/>				{pwMatch ? null : (
					<span className="no-match">passwords do not match</span>
				)}
				</div>{" "}

				<input type="submit" value="Submit" className="registration-form__submit-btn" />
			</form>
		</div>
	);
}

export default App;
