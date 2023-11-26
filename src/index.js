import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.json";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContextProvider } from "./Contex/UserContext.jsx";
import { AuthProvider } from "./Contex/AuthContex";
import { Toaster } from "react-hot-toast";
import { EmployeeProvider } from "./Contex/EmployeeContex.jsx";
import { EmployerProvider } from "./Contex/EmployerContex.jsx";
import { JobProvider } from "./Contex/JobContex.jsx";
import { ApplicationProvider } from "./Contex/ApplicationContex.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
      <JobProvider>
        <EmployeeProvider>
          <EmployerProvider>
            <ApplicationProvider>
              <UserContextProvider>

              <Toaster
                position="top-right"
                reverseOrder={false}
              />
                <App />
             </UserContextProvider>
            </ApplicationProvider>
          </EmployerProvider>
        </EmployeeProvider>
      </JobProvider>
  </AuthProvider>
);
