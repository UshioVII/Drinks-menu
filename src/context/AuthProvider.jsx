import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { userLogin, userRegister } from "../services/user.service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const storedToken = localStorage.getItem("_token");

  useEffect(() =>{
    if (storedToken) {
      const decodeToken = storedToken ? jwtDecode(storedToken) : null;
      const { user } = decodeToken ? decodeToken : null;

      setCurrentUser(user);

      return navigate("/");
    }
  }, [])


  function register(data) {
    userRegister(data)
      .then((res) => {
        if (res.ok) {

          alert(res.message)

          setTimeout(() => {
            navigate("/login")
          }, 1000)

          return;
        } else {
          return Promise.reject(res)
        }
      }).catch(e => alert(JSON.stringify(e)))
  }

  function login(data) {
    userLogin(data)
      .then((res) => {
        if (res.ok) {

          window.localStorage.setItem("_token", res.token);

          const decodeToken = res.token ? jwtDecode(res.token) : null;
          const { user } = decodeToken ? decodeToken : null;
          setCurrentUser(user);

          return navigate("/");
        } else {
          return Promise.reject(res);
        }
      }).catch(e => alert(JSON.stringify(e)))
  }


  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("_token");
    navigate("/login")
  }


  const values = {
    currentUser,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { AuthContext, AuthProvider };