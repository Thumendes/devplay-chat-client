import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginLayout from "./components/LoginLayout";

import NotFoundPage from "./pages/404";
import ChatPage from "./pages/Chat";
import ForgetPasswordPage from "./pages/ForgetPassword";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPassword";
import AuthContextProvider from "./contexts/auth";
import ProfilePage from "./pages/Profile";
import ConfirmRegisterPage from "./pages/ConfirmRegister";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirm-register" element={<ConfirmRegisterPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/" element={<ChatPage />} />
            <Route path="/:id" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
