import { Route, Routes } from "react-router-dom"
import IndexPage from "./Components/IndexPage";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Register from "./Components/Register";
import axios from "axios"
import { UserContextProvider } from "./Context/UserContext";
import AccountPage from "./Components/AccountPage";

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<AccountPage/>}/>
          <Route path="/account/:subpage/:action" element={<AccountPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
