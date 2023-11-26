import axios from "axios";
import { createContext } from "react";
import PropTypes from "prop-types";

const BaseUrl = "http://localhost:7500/api/v1/jobs";

export const ApplicationContex = createContext();   

export function ApplicationProvider(props) {
  
  // get job Applications
  const getjobApplications = (jobId) => {
    return axios.get(`${BaseUrl}/${jobId}/apply`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get my Application
  const getMyApplications = () => {
    return axios.get(`http://localhost:7500/api/v1/applications`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get Application by id
  const getApplication = (jobId,applicationId) => {
    return axios.get(`${BaseUrl}/${jobId}/apply${applicationId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  // create Application
  const createApplication =async (jobId) => { 
    return await axios.post(`${BaseUrl}/${jobId}/apply`, null,{
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // update a specific Application
  const editApplication = (jobId , applicationId, values) => { 
    return axios.put(`${BaseUrl}/${jobId}/apply${applicationId}`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // delete Application
  const deleteApplication = (jobId,applicationId) => { 
    return axios.delete(`${BaseUrl}/${jobId}/apply${applicationId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // search for specific Applications
  const searchApplication = (status) => { 
    return axios.get(`${BaseUrl}?status=${status}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const ApplicationData = {
    getMyApplications,
    createApplication,
    editApplication, 
    deleteApplication, 
    getjobApplications,
    getApplication,
    searchApplication
  };

  return (
    <ApplicationContex.Provider value={ApplicationData}> 
      {props.children}
    </ApplicationContex.Provider>
  );
}

ApplicationProvider.propTypes = {
  children: PropTypes.node,
};
