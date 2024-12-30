import { Link } from "react-router-dom";
import "./signup.css"
import { useState } from "react";
import userSignUp from "../../hooks/userSignUp";

const Signup=()=>{

    const [inputs, setInputs] = useState({
        fullName:"",
        userName:"",
        password:"",
        conformPassword:"",
        gender:""
    })

    const {loading, signup} = userSignUp();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(inputs);

        await signup(inputs)
    }

    return(
        <div className="login d-flex align-items-center justify-content-center">
            <section className="vh-120 card p-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">

                            <div className="px-5 ms-xl-4">
                                <i className="logo fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                                <span className="h1 fw-bold">Logo</span>
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4 pt-5 pt-xl-0 mt-xl-n5">
                                <form className="form" onSubmit={handleSubmit}>

                                    <h3 className="login_heading fw-normal mb-3 pb-3">Sign Up</h3>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="text" id="fullName" className="form-control form-control-lg" value={inputs.fullName} onChange={(e)=>setInputs({...inputs, fullName:e.target.value})}/>
                                        <label className="form-label" for="userName">FullName</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="text" id="userName" className="form-control form-control-lg" value={inputs.userName} onChange={(e)=>setInputs({...inputs,userName:e.target.value})}/>
                                        <label className="form-label" for="userName">UserName</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="password" id="password" className="form-control form-control-lg" value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
                                        <label className="form-label" for="password">Password</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="password" id="conformPassword" className="form-control form-control-lg" value={inputs.conformPassword} onChange={(e)=>setInputs({...inputs,conformPassword:e.target.value})}/>
                                        <label className="form-label" for="password">Conform Password</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <select className="form-control form-control-lg" value={inputs.gender}  onChange={(e)=>setInputs({...inputs,gender:e.target.value})}>
                                            <option defaultValue={""}></option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                        <label className="form-label" for="userName">Gender</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                                    </div>
 
                                    <p className="small mb-3 pb-lg-2"><a className="text-muted" href="#!">Terms & Conditions</a></p>
                                    <p className="small mb-5 pb-lg-2">Already have an account? <Link to="/login" className="link-info">Login here</Link></p>
                                </form>
                            </div>

                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img  className="img w-100 vh-100" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" alt="Login image"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Signup;