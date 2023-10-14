import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import { useTypedSelector } from "./hooks/useTypedSelector";
import NotFound from "./pages/notFound";
import DashboardLayout from "./container/dashboardLayout";
import DefaultPage from "./pages/dafaultPage";
import AllUsers from "./pages/users/allUsers";
import UserInformation from "./components/userinformation";
import CreateUser from "./pages/users/createuser";
import EditUser from "./pages/users/edituser";

function App() {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);

  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Administrator" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="user" element={<UserInformation/>}/>
              <Route path="users" element={<AllUsers/>}/>
              <Route path="createuser" element={<CreateUser/>}/>
              <Route path="edituser" element={<EditUser/>}/>
            </Route>
          )}
          {user.role === "User" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/" />
              <Route path="user" element={<UserInformation/>}/>
            </Route>
          )
          }
        </>
      )}

      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/dashboard" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;