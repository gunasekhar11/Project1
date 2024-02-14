import React from "react";

const Forgot = () => {
    return(
        <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4">
          <div className="card card-login" style={{borderRadius: "1rem"}}>
            <div className="card-body p-5">
  
              <div className="mb-md-3 mt-md-4 pb-1">
                <div className="login-name">Forgot Password</div>
                <p className="forgot-taxt">We will send a code to your registered email/mobile number</p>
  
                <div className="form-outline mb-4">
                  <input type="email" id="typeEmailX" placeholder='Enter email or mobile number' className="form-control form-control-lg" />
                </div>
  
                <div className='text-center d-grid'>
                  <button className="btn login-btn " type="submit">Login</button>
                </div>
  
              </div>
  
              <div>
                <p className="mb-0 text-center">Don't have an account? <a href="/signup" className="fw-bold text-dark text-decoration-none">Sign Up</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    );
}


export default Forgot;