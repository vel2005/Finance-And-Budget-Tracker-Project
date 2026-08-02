import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ChangePasswordModal from "../components/ChangePasswordModal";
import "../styles/Profile.css";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    occupation: "",
    currency: "",
  });

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save Profile
  const handleSave = async () => {
    try {
      await api.put("/user/profile", profile);

      alert("Profile Updated Successfully");

      setEditing(false);

      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2>{profile.name}</h2>

          <p>{profile.email}</p>

        </div>

        <div className="profile-form">

          <h2>My Profile</h2>

          <div className="form-grid">

            <div>
              <label>Name</label>

              <input
                name="name"
                value={profile.name || ""}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>

              <input
                name="email"
                value={profile.email ||""}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Phone</label>

              <input
                name="phone"
                value={profile.phone || ""}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Gender</label>

              <select
                name="gender"
                value={profile.gender || ""}
                disabled={!editing}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={profile.dob || ""}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Country</label>

              <input
                name="country"
                value={profile.country|| ""}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Occupation</label>

              <input
                name="occupation"
                value={profile.occupation|| ""}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Currency</label>

              <select
                name="currency"
                value={profile.currency||""}
                disabled={!editing}
                onChange={handleChange}
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

          </div>

          <div className="profile-buttons">

            <button
              className="edit-btn"
              onClick={() => {
                if (editing) {
                  handleSave();
                } else {
                  setEditing(true);
                }
              }}
            >
              {editing ? "Save Profile" : "Edit Profile"}
            </button>

            <button
              className="password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                navigate("/");
              }}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          setShowPasswordModal={setShowPasswordModal}
        />
      )}

    </Layout>
  );
}

export default Profile;