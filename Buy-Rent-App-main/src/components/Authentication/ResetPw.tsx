import React from "react";

const Reset = () => {
    return(
        <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4">
          <div className="card card-login" style={{borderRadius: "1rem"}}>
            <div className="card-body p-5">
  
              <div className="mb-md-3 mt-md-4 pb-1">
                <div className="login-name">Reset Password</div>
                <p className="forgot-txt">Please set a strong password byentring below.</p>
  
                <div className="form-outline mb-3">
                    <span className="fa fa-eye-slash" id="icn"/>
                  <input type="password" id="typePasswordX" placeholder='Create new Password' className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-3">
                    <span className="fa fa-eye-slash" id="icn"/>
                  <input type="password" id="typePasswordX" placeholder=' Re-enter new Password' className="form-control form-control-lg" />
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


export default Reset;