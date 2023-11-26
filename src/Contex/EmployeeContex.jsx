import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const BaseUrl = "http://localhost:7500/api/v1/employees/";


export const EmployeeContex = createContext();

export function EmployeeProvider(props) {
  const [EmployeeUsers, setEmployeeUsers] = useState([]);
  const [ Loading  , setLoading ] =useState(false)
 
  const fetchEmployeeData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(BaseUrl,
        {
          withCredentials: true,
        },
        );
        
        if (response.data) {
          setEmployeeUsers(response.data);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
    setLoading(false)

      }
    };

  const fetchEmployeeById = async (EmployeeId) => {
    setLoading(true)
    try {
      const response = await axios.get(`${BaseUrl}/${EmployeeId}`,
        {
          withCredentials: true,
        },
        );
        
        if (response.data) {
          setEmployeeUsers(response.data);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
    setLoading(false)

      }
    };
  // search for specific Classes
  const searchEmployees = (EmployeeName) => {
    return axios.get(`${BaseUrl}?name=${EmployeeName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const EmployeeData = { EmployeeUsers,Loading, fetchEmployeeData, searchEmployees , fetchEmployeeById };

  return (
    <EmployeeContex.Provider value={EmployeeData}>
      {props.children}
    </EmployeeContex.Provider>
  );
}

// Add prop validation for the 'children' prop
EmployeeProvider.propTypes = {
  children: PropTypes.node,
};
