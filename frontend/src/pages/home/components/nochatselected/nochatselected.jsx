import "./nochatselected.css"

const NoChatSelected=()=>{
    return(
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            <div class="chat-container">
                <div className="chatContainerScroll_ d-flex align-items-center justify-content-center">
                    <div className="greeting">
                        Hello Lahiru
                    </div>
                    <div className="instructions">
                        <p>select a chat to start the conversation</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoChatSelected;