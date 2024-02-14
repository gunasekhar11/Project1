import "./Loginunsuccess.css";
import Vtru from "../../../Assets/errorvector.jpg";
const Loginunsuccess = () => {
  return (
    <div className="layout_unsuccess">
      <div>
        <img src={Vtru} className="vector_logo_unsuccess" alt="vector" />
        <p className="ex_symbol">!</p>
      </div>
      <h3 className="font-bold">Login Unsuccessful!</h3>
      <br />
      <h5>
        User doesn't exist.Please check your Email and Password
      </h5>
    </div>
  );
};
export default Loginunsuccess;
