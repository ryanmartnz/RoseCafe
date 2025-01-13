import React, { useState } from "react";
import { Link } from "react-router-dom";
import { timeout } from "../../utils/timeout";

import "./Auth.css";

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = (e) => {
        const inputVal = e.target.value;
        const inputName = e.target.name;
        setInputs({
            ...inputs, 
            [inputName] : inputVal
        });
        const labelForElem = document.querySelector("label[for=" + inputName + "]");
        if(!(labelForElem.classList.contains("float-label--isActive")) && inputVal !== "") {
            labelForElem.classList.add("float-label--isActive");
        }

        const formErrs = document.getElementsByClassName("form-submit-err");
        for(let i = 0; i < formErrs.length; i++) {
            formErrs[i].style.display = "none";
        }

        const inputId = inputName.replace("_", "-");
        if(inputVal === "") {
            document.getElementById(`${inputId}-empty-err`).style.display = "block";
        } else {
            document.getElementById(`${inputId}-empty-err`).style.display = "none";
        }
    };

    const addLabelClasses = (e) => {
        const labelForElem = document.querySelector("label[for=" + e.target.name + "]");
        if(!(labelForElem.classList.contains("float-label--isActive"))) {
            labelForElem.classList.add("float-label--isActive");
        }
    };

    const removeLabelClasses = async (e) => {
        const inputName = e.target.name;
        const labelForElem = document.querySelector("label[for=" + inputName + "]");
        if(inputs[inputName] === "") {
            const inputErrors = document.getElementsByClassName(`${inputName}_err`);
            for(let i = 0; i < inputErrors.length; i++) {
                inputErrors[i].style.display = "block";
            }
            labelForElem.classList.remove("float-label--isActive");
            labelForElem.classList.add("float-label--isClosing");
            await timeout(250);
            labelForElem.classList.remove("float-label--isClosing");
        }
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if(email === "" || password === "") {
            return;
        }

        try {
            const body = {email, password};
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include"
            });
            if(response.ok) {
                await response.json();
                setAuth(true);
            } else if(response.status === 401) {
                document.getElementById("incorrect-login").style.display = "block";
            } else {
                document.getElementById("login-server-error").style.display = "block";
            }
        } catch(err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className="page-heading">Log in</div>
            <div className="form-container">
                <div className="form-card">
                    <form onSubmit={onSubmitForm} className="auth-form">
                        <div>* indicates a required field</div>
                        <div className="field-container">
                            <div className="field-base">
                                <label className="float-label" htmlFor="email"><span>* </span> Email</label>
                                <input 
                                    type="text" 
                                    name="email"
                                    className="field-input"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    autoCorrect="off"
                                    onFocus={addLabelClasses}
                                    onBlur={removeLabelClasses}
                                />
                            </div>
                            <div className="email_err" id="email-empty-err" style={{color: 'red', display: 'none'}}>Please enter an email.</div>
                        </div>
                        <div className="field-container">
                            <div className="field-base">
                                <label className="float-label" htmlFor="password"><span>* </span> Password</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    className="field-input"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    onFocus={addLabelClasses}
                                    onBlur={removeLabelClasses}
                                />
                            </div>
                            <div className="password_err" id="password-empty-err" style={{color: 'red', display: 'none'}}>Please enter a password.</div>
                        </div>
                        <button className="btn btn-success btn-block">Login</button>
                    </form>
                    <p className="form-submit-err" id="incorrect-login" style={{color: 'red', display: 'none'}}>Incorrect email or password.</p>
                    <p className="form-submit-err" id="server-error" style={{color: 'red', display: 'none'}}>Server error. Please try again later.</p>
                </div>
            </div>
            <div className="redirect-form">Or... You could <Link to="/register">Register</Link> instead!</div>
        </>
    );
};

export default Login;