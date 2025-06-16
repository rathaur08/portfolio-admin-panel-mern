import React, { useState } from 'react'

const Login = () => {

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
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
