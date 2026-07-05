import { Route, Routes } from "react-router"
import Login from "../components/auth/Login"
import App from "../App"
import Home from "../components/Home"
import ProtectedRoute from "./ProtectedRoute"
import Profile from '../components/Profile'
import CreatePost from '../components/CreatePost'
import PostDetail from "../components/PostDetail"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/post" element={<CreatePost />} />
                <Route path='/post/:id' element={<PostDetail />} />
            </Route>
        </Routes>
    )
}
