import { useState } from "react";
import "../styles/ChangePasswordModal.css";

function ChangePasswordModal({ setShowPasswordModal }) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        alert("Password changed successfully. (Backend integration pending)");

        setShowPasswordModal(false);

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Change Password</h2>

                <form onSubmit={handleSubmit}>

                    <label>Current Password</label>

                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                    />

                    <label>New Password</label>

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <div className="modal-buttons">

                        <button className="save-btn">
                            Change
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                setShowPasswordModal(false)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ChangePasswordModal;