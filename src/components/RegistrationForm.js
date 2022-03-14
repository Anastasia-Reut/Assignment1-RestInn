import React from 'react'

const RegistrationForm = () => {


  return (
    <section id="register-section">

    <div className= "container">
    
        <h1>Register</h1>

        <form action="">

            <div className="form-control">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" />
            </div>

            <div className="form-control">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" />
            </div>

            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
            </div>


            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="text" id="password" />
            </div>

            <div className="form-control">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="text" id="password" />
            </div>


            <div className="form-control">
                <button className="btn" type="submit">Create Account</button>
            </div>

        </form>

    </div>

</section>


  )
}

export default RegistrationForm