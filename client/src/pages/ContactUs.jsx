import { useState } from 'react';
import { useAuth } from '../store/auth';

const ContactUs = () => {


  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      name: user.name,
      email: user.email,
      phone: "",
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // setContact({
    //   ...contact,
    //   [name]: value,
    // });

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }))

  };

  // handle form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
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
                  <h1 className="main-heading mb-3">Contact form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name">Enter Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={contact.name}
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
                        value={contact.email}
                        onChange={handleInput}
                        placeholder="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={contact.phone}
                        onChange={handleInput}
                        placeholder="Phone Number"
                      />
                    </div>
                    <div>
                      <label htmlFor="message">Message</label>
                      <input
                        type="text"
                        name="message"
                        className="form-control"
                        value={contact.message}
                        onChange={handleInput}
                        placeholder="message"
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                      Submit
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

export default ContactUs
