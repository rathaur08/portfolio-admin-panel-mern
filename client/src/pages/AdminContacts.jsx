import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';

const AdminContacts = () => {
  const { authorizationToken } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move fetchContacts to component scope so it can be used elsewhere
  const fetchContacts = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/admin/contacts', {
        headers: {
          Authorization: authorizationToken,
        },
      });
      setContacts(res.data.data || []);
    } catch (error) {
      setContacts([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [authorizationToken]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // deleteContact Function on Click Button
  const deleteContact = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Data Delete", data);

      if (response.ok) {
        fetchContacts();
      }


    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div>
      <h1>Contacts</h1>
      <p>View and manage all contact form submissions below.</p>
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact, idx) => (
                  <tr key={contact._id || idx}>
                    <td>{idx + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteContact(contact._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
