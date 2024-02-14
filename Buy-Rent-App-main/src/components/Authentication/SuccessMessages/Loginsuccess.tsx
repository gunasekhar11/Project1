import "./Loginsuccess.css";
import Vtrs from "../../../Assets/vector.jpg";
const Loginsuccess = () => {
  return (
    <div className="layout_success">
        <img src={Vtrs} className="vector_logo_success" alt="vector" />
        <p className="loginsuccess_message">Login Successful!</p>
    </div>
  );
};
export default Loginsuccess;
