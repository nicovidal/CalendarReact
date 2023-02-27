import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";





export const AppRouter = () => {

    const authStaus='not-authenticated';



  return (
    <Routes>
        {   //TODO:
            (authStaus==='not-authenticated')
            ?<Route path="/auth/*" element={<LoginPage/>}/>
            :<Route path="/*" element={<CalendarPage/>}/>
        } 
          
        <Route path="/*"element={<Navigate to="/auth/login"/>}/>

    </Routes>
  )
}
