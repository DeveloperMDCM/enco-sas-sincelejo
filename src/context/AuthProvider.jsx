import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [theUser, setUser] = useState(null);

  // {
  //   if (theUser) {
  //     const { active } = theUser;
  //     if (active === 0) {
  //       localStorage.removeItem("loginToken");
  //       setUser(null);
  //       window.location.href = `/noautorizado`;
  //     }
  //   }
  // }

  const registerUser = async ({ name, email, password }) => {
    setCargando(true);
    try {
      const { data } = await clienteAxios.post("register.php", {
        name,
        email,
        password,
      });
      setCargando(false);
      return data;
    } catch (err) {
      setCargando(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loginUser = async ({ email, password }) => {
    setCargando(true);
    try {
      const { data } = await clienteAxios.post("login.php", {
        email,
        password,
      });
      if (data.success && data.token) {
        localStorage.setItem("loginToken", data.token);
        setCargando(false);
        return { success: 1 };
      }
      setCargando(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setCargando(false);

      return { success: 0, message: "Server Error!" };
    }
  };


  const loggedInCheck = async () => {
    const loginToken = localStorage.getItem("loginToken");
    clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${loginToken}`;

    if (loginToken) {
      // console.log(loginToken)
      // const {data} = await clienteAxios.get('getuser.php');

      // if(data.success) {
      //     alert('exito login')
      // }
      const decode = (token) =>
        decodeURIComponent(
          atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );
      const validoToken = decode(loginToken);
      const parseToken = JSON.parse(validoToken);
      const { rol, email, activado } = parseToken.data;
      const { exp } = parseToken;
      const texp = (expt, date) => {
        const expToken = exp * 1000;
        const expDate = Date.now();
        const ttoken = new Date(expToken);
        const tdate = new Date(expDate);
        // Fechas
        const strDateToken = ttoken.toLocaleString();
        const strDate = tdate.toLocaleString();
        var f1 = new Date(ttoken); //31 de diciembre de 2015
        var f2 = new Date(tdate); //30 de
        if (strDate === strDateToken || f2 > f1) {
          localStorage.removeItem("loginToken");
          setUser(null);
          window.location.href = `/`;
        }
      };
      texp(exp, Date.now());
    
      const {data} = await clienteAxios.get("getuser.php");

      if (data) {
        // alert('exito login')
                 setUser({"email": `${email}`, "role": `${rol}`, "active": `${activado}`});
                 if (activado === 0 || rol === '') {
                  localStorage.removeItem("loginToken");
                  setUser(null);
                  window.location.href = `/noautorizado`;
                }
//  setUser(data.user);
        return;
      }

      // if(parseToken !== null){
      //     setUser({"email": `${email}`, "role": `${rol}`, "active": `${activado}`});
      //     // setUser(data.user);
      //     return;
      // }

      setUser(null);
    }
  };

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  setTimeout(() => {
    localStorage.removeItem("loginToken");
    setUser(null);
  }, 432000000);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        cargando,
        user: theUser,
        loggedInCheck,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
