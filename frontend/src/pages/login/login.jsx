import { Link } from "react-router-dom";
import "./login.css"
import { useState } from "react";
import userLogin from "../../hooks/userLogin";
import logo from '../../assets/logo.webp'

const Login=()=>{

    const [input, setInput] =  useState({
        userName:"",
        password:""
    });

    const {loading, login} = userLogin();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(input);
        login(input);
    };

    return(
        <div className="login d-flex align-items-center justify-content-center">
            <section class="vh-120 card p-4">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6 text-black">

                            <div class="px-5 ms-xl-4">
                                <i class="logo fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                                <span class="h1 fw-bold">Logo</span>
                            </div>

                            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4 pt-5 pt-xl-0 mt-xl-n5">
                                <form className="form" onSubmit={handleSubmit}>

                                    <h3 class="login_heading fw-normal mb-3 pb-3">Log in</h3>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <input type="text" id="userName" class="form-control form-control-lg" value={input.userName} onChange={(e)=>setInput({...input,userName: e.target.value})}/>
                                        <label class="form-label" for="userName">UserName</label>
                                    </div>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <input type="password" id="password" class="form-control form-control-lg" value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}/>
                                        <label class="form-label" for="password">Password</label>
                                    </div>

                                    <div class="pt-1 mb-4">
                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block" type="submit">Login</button>
                                    </div>
 
                                    <p class="small mb-3 pb-lg-2"><Link to="#" class="link-info" href="#!">Forgot password?</Link></p>
                                    <p class="small mb-5 pb-lg-2">Don't have an account? <Link to="/signup" class="link-info">Register here</Link></p>
                                </form>
                            </div>

                        </div>
                        <div class="col-sm-6 px-0 d-none d-sm-block">
                            <img src={logo} alt="Login image" class="w-100"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login;