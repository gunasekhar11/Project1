import './Regunsuccess.css';

import Vtru from '../../../Assets/errorvector.jpg';
const Regunsuccess=()=>{
    return(
        <div className='layout_regunsuccess'>

        <div>
        <img src={Vtru} className='vector_logo_regunsuccess' alt='vector' />
        <header className='ex_symbol'>!</header>
        </div>
        <h3 className='font-bold'>Registration Unsuccessful!</h3>
        <br />
        <h4>User already exists.Please check once</h4>
        </div>
    );
}
export default Regunsuccess;