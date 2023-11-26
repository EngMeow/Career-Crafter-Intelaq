import "../../assets/css/layout.css"; // Import your custom CSS
import vector from "../../assets/images/teacher.png";
import {  NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Contex/AuthContex";
import toast from "react-hot-toast";
import { UserContext } from "../../Contex/UserContext";
import { useContext, useEffect } from "react";

export default function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { fetchUserProfile } = useContext( UserContext)

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout route
      const response = await axios.post(
        "http://localhost:7500/api/v1/auth/logout",
        null,
        {
          withCredentials: true,
        },
      );
      auth.logout();
      if (response.status === 200) {
        toast.success('Good bye , see you soon', {
          style: {
            border: '1px solid #53057B',
            padding: '16px',
            color: '#53057B',
          },
          iconTheme: {
            primary: '#53057B',
            secondary: '#FFFAEE',
          },
        });
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-shrink py-3 navbar-white bg-white" id="mainNav">
          <div className="container-fluid">
            <NavLink className="navbar-brand d-flex align-items-center " to="/dashboard">
              <span className="h1 px-4"><strong>Career<span className="text-warning">Crafter</span></strong></span>
            </NavLink>
            <button className="navbar-toggler mx-3 text-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars-staggered fs-3"></i>
            </button>
            <div className="collapse navbar-collapse ms-auto" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex ">
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 fs-6 text-center mt-2"
                    to="/dashboard/"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 fs-6 text-center mt-2"
                    to="/dashboard/job"
                  >
                    Jobs
                  </NavLink>
                </li>
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 fs-6 text-center mt-2"
                    to="/dashboard/application"
                  >
                    Applications
                  </NavLink>
                </li>      
                <li>
                      <div className=" dropstart">
                        <div className="p-2 ms-auto " data-bs-toggle="dropdown" aria-expanded="false">
                          <img className="ZADlogo rounded-circle" src={vector}></img>
                        </div>
                      <ul className="dropdown-menu control">
                        <li>
                            <NavLink className="nav-link ms-auto" to="/dashboard/profile">
                              <div className='d-flex'>
                                <i className='fa-solid fa-user fs-3 me-2'style={{ color: '#0b0381' }}/>
                                <button className="dropdown-item fs-6" type="button">view profile</button>
                              </div>
                            </NavLink>
                          </li>
                        <li>
                          <div className="d-flex">
                          <i className='fa-solid fa-door-open fs-3 mx-2'style={{ color: '#0b0381' }}/>
                           <button className="dropdown-item" type="button" onClick={() => handleLogout()}>Log out</button>
                          </div>
                        </li>
                      </ul>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  );
}
