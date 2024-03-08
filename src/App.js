import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./pages/SignupPage";
import PasswordPage from "./pages/PasswordPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import NewPasswordPage from "./pages/NewPasswordPage";
import HomePage from "./pages/HomePage";
import FormSuccessPage from "./pages/FormSuccessPage";

function App() {
    return (
        <BrowserRouter basename="/egibo">
            <AuthProvider>
                    <Routes>
                        <Route path='/' element={<SignupPage />} />
                        <Route path='/password' element={<PasswordPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/resetpassword' element={<ResetPasswordPage />} />
                        <Route path='/verifycode' element={<VerifyCodePage />} />
                        <Route path='/newpassword' element={<NewPasswordPage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/formsuccess' element={<FormSuccessPage />} />
                    </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;