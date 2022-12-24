import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddTodo from '../Components/AddTodo'
import EditTodo from '../Components/EditTodo'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Signup/Signup'
import SingleTodo from '../Components/SingleTodo'
import Todos from '../Pages/Notes/Todos'
import Home from '../Pages/Home/Home'
import ReqAuth from '../Components/ReqAuth'

export default function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/todos' element={<Todos />} /> */}
                <Route path='/todos/:id' element={<ReqAuth><SingleTodo /></ReqAuth>} />
                <Route path='/createtodo' element={<ReqAuth><AddTodo /></ReqAuth>} />
                <Route path='/edittodo' element={<ReqAuth><EditTodo /></ReqAuth>} />
            </Routes>
        </div>
    )
}
