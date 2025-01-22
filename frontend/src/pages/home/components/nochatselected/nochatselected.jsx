import "./nochatselected.css"
import { useState } from "react";
import LogoutPopup from "../logoutpoup/logoutpopup";

const NoChatSelected=()=>{

    const [clickToLogout, setClickToLogout] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('chat-user'));

    return(
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            <div class="chat-container">
                <div className="chatContainerScroll_ d-flex align-items-center justify-content-center">
                    <div className="greeting d-flex">
                        Hello <p>{currentUser.userName}</p>
                    </div>
                    <div className="instructions pb-5">
                        <p>select a chat to start the conversation 😌</p>
                    </div>
                    <div className="logout">
                        <button className="buttontoLogout btn btn-success logout d-flex" type="button" onClick={()=>setClickToLogout(true)}>
                            <p>LOGOUT</p>
                            <i class="bi bi-box-arrow-right"></i>
                        </button>
                        <div className={clickToLogout? "popup":"no"}>
                            <LogoutPopup setClickToLogout={setClickToLogout}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoChatSelected;