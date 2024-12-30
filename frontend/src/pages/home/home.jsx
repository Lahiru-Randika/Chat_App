import { useState } from "react";
import MessageBar from "./components/messagebar/messagebar.jsx";
import NameBar from "./components/namebar/namebar.jsx";
import NoChatSelected from "./components/nochatselected/nochatselected.jsx";

const Home=()=>{

    const [clicked, setClicked] = useState(false);

    return(
        <div className="login d-flex align-items-center justify-content-center">
            <div className="login d-flex align-items-center justify-content-center">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
            <div class="container">
                <div class="content-wrapper">
                    <div class="row gutters">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
                </div>
            </div>
        </div>
        </div>
    )
}
export default Home;