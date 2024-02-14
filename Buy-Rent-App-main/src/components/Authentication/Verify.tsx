import React from "react";


const Verify = () =>{
    return(
        <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-5 col-xl-4">
            <div className="card card-login" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5">
    
                <div className="mb-md-3 mt-md-4 pb-1">
            <h6>Verify code</h6>
            <div> <span>A code has been sent to</span> <small>*******9897</small> </div>
            <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                 <input className="m-2 text-center form-control rounded" type="text" id="first" maxLength={1} /> 
                 <input className="m-2 text-center form-control rounded" type="text" id="second" maxLength={1} /> 
                 <input className="m-2 text-center form-control rounded" type="text" id="third" maxLength={1} /> 
                 <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength={1} />
                  </div>
            <div className="mt-4 text-center"> <button className="btn btn-danger px-4 validate">Validate</button> </div>
        </div>
    </div>
    </div>
    </div>
    </div>
</div>
);
}



export default Verify;