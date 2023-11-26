import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notfound from "./pages/Notfound";
import Register from "./components/authenticationComponents/Register";
import Login from "./components/authenticationComponents/Login";
import EditProfile from "./components/profile/EditProfile";
import { View } from "./pages/View";
import ProfileView from "./components/profile/ProfileView";
import ProtectedRoute from "./controls/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;