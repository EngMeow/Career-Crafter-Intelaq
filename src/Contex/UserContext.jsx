import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes

export const UserContext = createContext();

const baseUrl = "http://localhost:7500/api/v1/";

export function UserContextProvider(props) {
  const [myUser, setMyUser] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);


  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}users/profile`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setMyUser(response.data.user);
        const imageName = response.data.user.profileImage;
        const imageUrl = imageName ? `${baseUrl}static/${imageName}` : null;
        setImageURL(imageUrl);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
      fetchUserProfile();
    
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(baseUrl, {
        withCredentials: true,
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
      console.log(Loading);
    }
  };
  // Inactivate user when remove him form Student component or Teacher Component
  
  
  const deleteUser = async (userId) => {
    axios.delete(`${baseUrl}/${userId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const userData = {
    users,
    imageURL,
    myUser,    
    fetchAllUsers,
    fetchUserProfile,
    deleteUser,
  };

  return (
    <UserContext.Provider value={userData}>
      {props.children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
