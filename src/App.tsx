import { BrowserRouter, Routes, Route } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import RAGChat from "./pages/user/RAGChat";
import Home from "./pages/Home";
import Train from "./pages/admin/Train";
import Inbox from "./pages/admin/Inbox";
import { SidebarProvider } from "./components/ui/sidebar";
import Admins from "./pages/admin/Admins";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import TalkToHuman from "./components/TalkToHuman";
import DataPage from "./pages/admin/Data";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<RAGChat />} />
          <Route path="home" element={<Home />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="/talk-to-us" element={<TalkToHuman />} />
          <Route
            path="login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route
            path="admin"
            element={
              <AuthProvider>
                <SidebarProvider>
                  <DashboardLayout />
                </SidebarProvider>
              </AuthProvider>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="" element={<Dashboard />} />
            <Route path="train" element={<Train />} />
            <Route path="knowledge-base" element={<DataPage />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="admins" element={<Admins />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
