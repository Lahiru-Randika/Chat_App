import { useState } from "react";
import MessageBar from "./components/messagebar/messagebar.jsx";
import NameBar from "./components/namebar/namebar.jsx";
import NoChatSelected from "./components/nochatselected/nochatselected.jsx";

const Home=()=>{

    const [clicked, setClicked] = useState(false);
    const [clickedMeToSeeMyChat, setClickedMeToSeeMyChat] = useState(null);

    return(
        <div className="login">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
            <div className="img"></div>
            <div className="container">
                <div class="card m-0">
                    <div class="row no-gutters">
                        <NameBar clicked={clicked} setClicked={setClicked} />
                        {
                            clicked? <MessageBar/> :
                                    <NoChatSelected/>
                        }
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Home;