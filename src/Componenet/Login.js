import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({onLoginSuccess}) {
    const navigate = useNavigate();
	const [login, setLogin] = useState({ Password: "", LoginId: ""});
  
	const handle = (event) => {
	  setLogin({ ...login, [event.target.name]: event.target.value });
	};

	const LoginUser = async (e) => {
		e.preventDefault();
		const response = await fetch('https://localhost:44380/api/Home/Login', {
		  method: 'POST',
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			LoginId: login.LoginId,
			Password: login.Password,
		  })
		});
	
		const json = await response.json();
		console.log("json",json);
		if (json.token) {
			sessionStorage.setItem("token", json.token);
			sessionStorage.setItem("email", login.LoginId);
			sessionStorage.setItem("Id", json.id);	
		  	console.log("token", json.token);
	
		  if (onLoginSuccess) {
			onLoginSuccess(json.token); // ✅ Notify App.js
		  }
	
		  navigate("/");
		} else {
		  alert("Login failed. Please check your credentials.");
		}
	  };

  return (
    <>
<section className="main vh-100 pt-md-5 pb-5 position-relative">
		<div className="container-fluid h-100">
			<div className="row align-items-center h-100">
				<div className="col-md-3 mx-auto">
					<div className="heading py-5">
						<h3>Sign In</h3><br />
						<h6 className="font-weight-light">Booking Engine</h6><br />
					</div>
					<form method="post" id="loginForm" onSubmit={LoginUser}>
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">Email <span style={{color: '#f1c247'}}>*</span></label>
							<input type="text" className="form-control w-100" name="LoginId" value={login.LoginId} aria-describedby="emailHelp" onChange={handle} />						
						</div>
						<div className="mb-3 py-4">
							<label for="exampleInputPassword1" className="form-label">Password <span style={{color: '#f1c247'}}>*</span></label>
							<input type="password" className="form-control w-100" name="Password" value={login.Password}  onChange={handle} />
							<i className="toggle-password fa fa-fw fa-eye-slash"></i>					
						</div>
						<button type="submit" className="btn text-white w-100" style={{ backgroundColor: '#f1c247', color: 'white' }}>Sign in</button>
					</form>
				</div>
				<div className="col-md-6 h-100 d-md-block d-none">
					<div className="align-content-between d-inline d-md-flex h-100 row text-center">
						<div className="image z-3">
							<img src="site/images/BW_logo.png" alt="logo" style={{width: '300px',marginTop:'160px',marginLeft:"30px"}} className="position-relative"/>
							<div className="fw-bold position-relative text text-center text-white fst-italic mt-2">
								<p style={{color: '#f1c247'}}>
									Logs Management System
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</section>

    </>
  )
}
