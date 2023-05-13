
import {useState,useContext} from 'react';
import {UserContext} from '../context/AuthProvider';
const Login = () => {
    const {loginUser, wait, loggedInCheck} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setErrMsg('Todos los campos son requeridos!');
            return;
        }

        const data = await loginUser(formData);
        if(data.success){
            e.target.reset();
            setRedirect('Redireccionando...');
            await loggedInCheck();
            return;
        }
        setErrMsg(data.message);
    }
 return (
   <>
   <div className="mb-3 grid  ">
            <form onSubmit={submitForm} className=" d-grid mx-auto  mb-5 mt-10 shadow-lg  p-3 rounded-md ">
            <h2 className=' fw-bold text-center my-4'>Inicia Sesión y administra tus <span className='text-info'>Aires</span></h2>
                <img className='mb-3' src="Logo.png" alt="" />
                <input className='form-control mt-2' type="email" name="email" onChange={onChangeInput} placeholder="Usuario" id="email" value={formData.email} required />
                <input className='form-control mt-2' type="password" name="password" onChange={onChangeInput} placeholder="Password" autoComplete='on' id="password" value={formData.password} required />
                {errMsg && <div className="err-msg">{errMsg}</div>}
                {redirect ? redirect : <button type="submit" className='btn btn-primary  w-100 mt-2' disabled={wait}>Iniciar Sesión</button>}
            </form>
        </div>
   </>
 )
}
export default Login;