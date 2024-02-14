import React from "react";


import shield from '../Assets/shield.png'
const Activated = () => {

    return(
        <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
        <div  className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                <div>
                    <img src={shield} alt="lksajf" className="mx-auto d-block"></img>
                </div>
            <h3 className="text-center">Activation completed!</h3>
            <p className="forgot-txt text-center">Activation Complete!Your Account has been successfully activated. 
You can now log in using the username and password you chose during the registration.
</p>
        </div>
        
        </div>
        </div>
        </section>
    );
}


export default Activated;