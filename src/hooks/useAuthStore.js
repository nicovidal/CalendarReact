import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onCheking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onCheking());

    try {
      //pregunta y respuesta al back-end
      const { data } = await calendarApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      dispatch(onLogout('Credenciales incorrecta'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onCheking());

    try {
      //pregunta y respuesta al back-end
      const { data } = await calendarApi.post('/auth/new', {
        email,
        password,
        name,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      /* console.log(error) */
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {

    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());


    try{

      const {data}= await calendarApi.get('/auth/renew');
      localStorage.setItem('token',data.token)
      localStorage.setItem('token init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    }catch(error){
      localStorage.clear();
      dispatch(onLogout());

    }



  };


  const startLogout=()=>{
    localStorage.clear();
    dispatch(onLogout());
  }

  return {
    //propiedadess
    status,
    user,
    errorMessage,

    //metodos

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
