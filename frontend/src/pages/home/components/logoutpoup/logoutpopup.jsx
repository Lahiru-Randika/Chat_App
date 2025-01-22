import { useEffect } from "react";
import userLogOut from "../../../../hooks/userLogOut";
import "./logoutpopup.css";

const LogoutPopup = ({ setClickToLogout }) => {
    const { logout } = userLogOut();

    useEffect(() => {
        // Close the popup when clicking outside of the section
        const handleClickOutside = (event) => {
            if (event.target.classList.contains("popupLogout")) {
                setClickToLogout(false);
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setClickToLogout]);

    return (
        <div className="popupLogout">
            <div className="section">
                <h3>Do you want to LogOut?</h3>
                <div className="buttons">
                    <button className="btn btn-round btn-success" type="button" onClick={logout}>
                        Yes
                    </button>
                    <button className="btn btn-round btn-danger" type="button" onClick={() => setClickToLogout(false)}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutPopup;
