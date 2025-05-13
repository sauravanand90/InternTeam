import { useState } from "react";

export default function Login(){

    return(
        <div>
            <div>
                <h2>Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input type="text" 
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="email"
                        className="form"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" 
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password" 
                        placeholder="Enter Password"
                        name="password"
                        className="form"
                        />
                    </div>
                    <button type="submit" className="sub-btn">
                        Register
                    </button>
                    <p>Already have an Account</p>
                    <button className="log-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}