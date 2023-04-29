import { createBrowserRouter, Navigate, Route, createRoutesFromElements, Outlet} from "react-router-dom";
import { redirect } from "react-router-dom";
import React from "react"
import { SignUpPage, SignInPage, Home } from "../pages"
import { useAppSelector } from "../redux";


const PrivateRoutes = () => {
    const jwt = useAppSelector(state=>state.user.token)
    return (jwt? <Outlet/> : <Navigate to="/signIn"/>)
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/signIn" element={<SignInPage />} />
        </Route>
    )
)

export default router