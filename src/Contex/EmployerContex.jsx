import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const BaseUrl = "http://localhost:7500/api/v1/employers"

export const EmployerContex = createContext();

export function EmployerProvider(props) {
  
  const [EmployerUsers, setEmployerUsers] = useState([]);
  const [ Loading  , setLoading ] =useState(false)

  const fetchEmployerData = async () => {
    setLoading(true)

    try {
      const response = await axios.get(BaseUrl,
         {
            withCredentials: true,
          },
          );
          if (response.data) {
            setEmployerUsers(response.data);
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
    setLoading(false)
        }
    };

  const fetchEmployerById = async (EmployerId) => {
    setLoading(true)

    try {
      const response = await axios.get(`${BaseUrl}/${EmployerId}`,
         {
            withCredentials: true,
          },
          );
          if (response.data) {
            setEmployerUsers(response.data);
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
    setLoading(false)
        }
    };
 
  // search for specific Employer
  const searchEmployers = (EmployerName) => {
    return axios.get(`${BaseUrl}/?name=${EmployerName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };


  const EmployerData = { EmployerUsers,Loading, fetchEmployerData, searchEmployers ,fetchEmployerById };

  return (
    <EmployerContex.Provider value={EmployerData}>
      {props.children}
    </EmployerContex.Provider>
  );
}

EmployerProvider.propTypes = {
  children: PropTypes.node,
};
