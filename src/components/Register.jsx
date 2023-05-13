import {useContext, useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {UserContext} from '../context/AuthProvider';
import Header from './Header';
const Register = () => {
    const {registerUser, wait} = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setSuccessMsg(false);
            setErrMsg('Todos los campos son requeridos!');
            return;
        }

        const data = await registerUser(formData);
        if(data.success){
            e.target.reset();
            setSuccessMsg('Registro exitoso.');
            setErrMsg(false);
          
        }
        else if(!data.success && data.message){
            setSuccessMsg(false);
            setErrMsg(data.message);
        }
        setErrMsg(data.message);
        
    }
    return (
       <>
       
       <Header />
        <div className="mb-3 grid">
            <form onSubmit={submitForm} className=" d-grid mx-auto mt-10 shadow-2xl p-3 rounded-md" >
            <h2 className=' fw-bold text-center'>Registro de <span className='text-info'>Acceso</span></h2>
            <img src="Logo.png" alt="" />
            <label htmlFor="name" className="form-label fw-bold">Usuario</label>
                <input type="text"  className='form-control mt-2 mb-2' name="name" onChange={onChangeInput} placeholder="Nombre de usuario" id="name" value={formData.name} required />
                <label htmlFor="Email" className="form-label fw-bold">Email</label>
                <input type="email"  className='form-control mt-2 mb-2'  name="email" onChange={onChangeInput} placeholder="Email" id="email" value={formData.email} required />
                <label htmlFor="Password" className="form-label fw-bold">Password</label>
                <input type="password"  className='form-control mt-2 mb-2' name="password" onChange={onChangeInput} placeholder="password" id="password" value={formData.password} required />
                {errMsg && <div className="err-msg">{errMsg}</div>}
                {successMsg && (
                            <>
                        <Navigate to="/" />
                            </>
                        )}
              {redirect ? redirect  : <button type="submit" className='btn btn-primary  w-100 mt-2' disabled={wait}>Registrar</button>}
              <div className="bottom-link"><Link to="/">Regresar</Link></div>
            </form>
        </div>
       </>
   
    )
}

export default Register;
