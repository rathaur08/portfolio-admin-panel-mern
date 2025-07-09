import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      if (response.ok) {
        storeTokenInLS(data.token);
        // localStorage.setItem("token", data.token);
        // You can redirect or show a success message here
        toast.success("Login successful!");
        console.log("Login successful:", data.message);
        // or if you want to redirect to the home page:
        navigate("/");

      } else {
        alert("Error login missing Field:", data.extraDetails ? data.extraDetails : data.message)
        toast.error("Error login missing Field:", data.extraDetails ? data.extraDetails : data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div>
        <section>
          <main>
            <div className="section-registration">
              <div className="container d-flex grid grid-two-cols">
                <div className="registration-image reg-img">
                  <img
                    src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register_1948-2986.jpg?w=740"
                    alt="a nurse with a cute look"
                    width="200"
                    height="250"
                  />
                </div>
                {/* our main registration code  */}
                <div className="registration-form">
                  <h1 className="main-heading mb-3">Login form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>

                    <div>
                      <label htmlFor="email">email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={user.email}
                        onChange={handleInput}
                        placeholder="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="password"
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                      Login Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  )
}

export default Login
