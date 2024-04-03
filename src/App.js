import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/shared/Layout";
import Products from "./components/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import LoginNum from "./components/Loginnum";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
          <Route path="/products" element={<Layout><Products/></Layout>}/>
          <Route path="/profile" element={<Layout><Profile/></Layout>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/loginnum" element={<LoginNum/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
