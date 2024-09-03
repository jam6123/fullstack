import { Route, Routes, } from "react-router-dom";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { UserContextProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

function App() {

  return (
    <div>
      <UserContextProvider>
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
