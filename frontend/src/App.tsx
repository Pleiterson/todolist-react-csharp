import { Navigate, Route, Routes } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import routes from "./_config/routes";
import { HomePage, LoginPage } from "./pages";

function App() {

  return (
    <>
      <ConfirmDialog />
      
      <Routes>
        < Route path={ routes.login } element={ <LoginPage /> } />
        < Route path={ routes.home } element={ <HomePage /> } />
        < Route path="*" element={ <Navigate to={ routes.login } />} />
      </Routes>
    </>
  );
};

export default App;
