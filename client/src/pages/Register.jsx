import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import { useNavigate } from "react-router";

const Register = () => {

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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
      const response = await fetch("http://localhost:8000/api/auth/register", {
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
      console.log("Registration successful:", data);

      if (response.ok) {
        storeTokenInLS(data.token);
        // localStorage.setItem("token", data.token);
        // You can redirect or show a success message here
        navigate("/");
      } else {
        alert("Error registration missing Field:", data.extraDetails ? data.extraDetails : data.message)
      }

    } catch (error) {
      console.error("Error during registration:", error);
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
                  <h1 className="main-heading mb-3">Registration form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name">Enter Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={user.name}
                        onChange={handleInput}
                        placeholder="name"
                      />
                    </div>
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
                      <label htmlFor="phone">phone</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        value={user.phone}
                        onChange={handleInput}
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
                      Register Now
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

export default Register
