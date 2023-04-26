import { createBrowserRouter, Route, createRoutesFromElements, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import React from "react"
import { SignUpPage, SignInPage, Home } from "../pages"
import { AddTaskForm } from "../components/AddTaskForm/AddTaskForm";

const PrivateRoute = ({component, isAuthenticated, ...rest}) => {
    if (!isAuthenticated) {
        return redirect("/signIn")
    }
    else {
        return <Route element={component} {...rest}/>
    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>} />
            <Route path="/signUp" element={<SignUpPage/>}/>
            <Route path="/signIn" element={<SignInPage/>}/>
            <Route path="/addTask" element={<AddTaskForm/>} />
        </Route>
    )
)

const authRouter = (props:any) => {
    const { location, config } = props;
    
}

export default router