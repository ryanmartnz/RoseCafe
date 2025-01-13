import React, { useState } from "react";
import { Link } from "react-router-dom";
import { timeout } from "../../utils/timeout";

import "./Auth.css";

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""
    });

    const {first_name, last_name, email, phone, password} = inputs;

    const onChange = (e) => {
        const inputName = e.target.name;
        const inputVal = e.target.value;
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

        if(inputName === "first_name" || inputName === "last_name") {
            isValidName(inputName, inputVal);
        } else if(inputName === "phone") {
            isValidPhone(inputVal);
        } else if(inputName === "email") {
            isValidEmail(inputVal);
        } else if(inputName === "password") {
            isValidPassword(inputVal);
        }
    };

    const isValidName = (nameType, inputName) => {
        const inputId = nameType.replace("_", "-");
        if(!(/^[a-zA-Z0-9]+$/.test(inputName))) {
            document.getElementById(`${inputId}-empty-err`).style.display = "block";
            return false;
        } else {
            document.getElementById(`${inputId}-empty-err`).style.display = "none";
            return true;
        }
    };

    const isValidPhone = (inputPhone) => {
        if(!(/^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/.test(inputPhone))) {
            document.getElementById("phone-format-err").style.display = "block";
            return false;
        } else {
            document.getElementById("phone-format-err").style.display = "none";
            return true;
        }
    };

    const isValidEmail = (inputEmail) => {
        if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail))) {
            document.getElementById("email-format-err").style.display = "block";
            return false;
        } else {
            document.getElementById("email-format-err").style.display = "none";
            return true;
        }
    };

    const isValidPassword = (inputPassword) => {
        let flag = true;
        if(!(/.{8}/.test(inputPassword))) {
            document.getElementById("pass-length-err").style.display = "block";
            flag = false;
        } else {
            document.getElementById("pass-length-err").style.display = "none";
        }

        if(!(/\d+/.test(inputPassword))) {
            document.getElementById("pass-num-err").style.display = "block";
            flag = false;
        } else {
            document.getElementById("pass-num-err").style.display = "none";
        }

        if(!(/[A-Z]+/.test(inputPassword))) {
            document.getElementById("pass-cap-err").style.display = "block";
            flag = false;
        } else {
            document.getElementById("pass-cap-err").style.display = "none";
        }

        if(!(/[a-z]+/.test(inputPassword))) {
            document.getElementById("pass-low-err").style.display = "block";
            flag = false;
        } else {
            document.getElementById("pass-low-err").style.display = "none";
        }

        if(!(/[^a-zA-Z0-9]+/.test(inputPassword))) {
            document.getElementById("pass-special-err").style.display = "block";
            flag = false;
        } else {
            document.getElementById("pass-special-err").style.display = "none";
        }

        return flag;
    };

    const addLabelClasses = (e) => {
        const labelForElem = document.querySelector("label[for=" + e.target.name + "]");
        labelForElem.classList.add("float-label--isActive");
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

        if(!isValidName("first_name", first_name) || !isValidName("last_name", last_name) || !isValidPhone(phone) || !isValidEmail(email) || !isValidPassword(password)) {
            return;
        }

        try {
            const body = {first_name, last_name, email, phone, password};
            const response = await fetch("https://api.rosecafe.tech/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include"
            });
            if(response.ok) {
                await response.json();
                setAuth(true);
            } else if(response.status === 401) {
                document.getElementById("register-user-exists").style.display = "block";
            } else {
                document.getElementsByClassName("login-server-error").style.display = "block";
            }
        } catch(err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className="page-heading">Sign up</div>
            <div className="form-container">
                <div className="form-card">
                    <form onSubmit={onSubmitForm} className="auth-form">
                        <div>* indicates a required field</div>
                        <div className="field-container">
                            <div className="field-base">
                                <label className="float-label" htmlFor="first_name"><span>* </span> First Name</label>
                                <input 
                                    type="text" 
                                    name="first_name" 
                                    value={first_name}
                                    onChange={e => onChange(e)}
                                    className="field-input"
                                    autoCorrect="off"
                                    onFocus={addLabelClasses}
                                    onBlur={removeLabelClasses}
                                />
                            </div>
                            <div className="first_name_err" id="first-name-empty-err" style={{color: 'red', display: 'none'}}>Please enter your first name.</div>
                        </div>
                        <div className="field-container">
                            <div className="field-base">
                                <label className="float-label" htmlFor="last_name"><span>* </span> Last Name</label>
                                <input 
                                    type="text" 
                                    name="last_name" 
                                    value={last_name}
                                    onChange={e => onChange(e)}
                                    className="field-input"
                                    autoCorrect="off"
                                    onFocus={addLabelClasses}
                                    onBlur={removeLabelClasses}
                                />
                            </div>
                            <div className="last_name_err" id="last-name-empty-err" style={{color: 'red', display: 'none'}}>Please enter your last name.</div>
                        </div>
                        <div className="field-container">
                            <div className="field-base">
                                <label className="float-label" htmlFor="phone"><span>* </span> Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    pattern="^(1[\- ]?)?\d{3}[\- ]?\d{3}[\- ]?\d{4}$" 
                                    value={phone}
                                    onChange={e => onChange(e)}
                                    className="field-input"
                                    autoCorrect="off"
                                    onFocus={addLabelClasses}
                                    onBlur={removeLabelClasses}
                                />
                            </div>
                            <div className="phone_err" id="phone-format-err" style={{color: 'red', display: 'none'}}>Please enter a valid phone number.</div>
                        </div>
                        <div className="field-container">
                            <div className="field-base">
                                <label className="float-label" htmlFor="email"><span>* </span> Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    pattern="^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    className="field-input"
                                    autoCorrect="off"
                                    onFocus={addLabelClasses}
                                    onBlur={removeLabelClasses}
                                />
                            </div>
                            <div className="email_err" id="email-format-err" style={{color: 'red', display: 'none'}}>Please enter a valid email.</div>
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
                            <div className="password_err" id="pass-length-err" style={{color: 'red', display: 'none'}}>At least 8 characters long</div>
                            <div className="password_err" id="pass-num-err" style={{color: 'red', display: 'none'}}>At least one digit</div>
                            <div className="password_err" id="pass-cap-err" style={{color: 'red', display: 'none'}}>At least one capital letter</div>
                            <div className="password_err" id="pass-low-err" style={{color: 'red', display: 'none'}}>At least one lowercase letter</div>
                            <div className="password_err" id="pass-special-err" style={{color: 'red', display: 'none'}}>At least one special character</div>
                        </div>
                        <button className="btn btn-success btn-block">Register</button>
                    </form>
                    <p className="form-submit-err" id="register-user-exists" style={{color: 'red', display: 'none'}}>A user with that email already exists.</p>
                    <p className="form-submit-err" id="server-error" style={{color: 'red', display: 'none'}}>Server error. Please try again later.</p>
                </div>
            </div>
            <div className="redirect-form">Or... You could <Link to="/Login">Log In</Link> instead!</div>
        </>
    );
};

export default Register;