import axios from "axios";
import { createContext } from "react";
import PropTypes from "prop-types";

const BaseUrl = "http://localhost:7500/api/v1/jobs";

export const JobContext = createContext(); // Corrected typo: JobContex to JobContext

export function JobProvider(props) {
  // get all Jobs
  const getAllJobs = () => {
    return axios.get(BaseUrl, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  // get Recommended Jobs
  const getRecommendedJobs = () => {
    return axios.get(`${BaseUrl}/recommended`,{
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get Job by id
  const getJob = (id) => {
    return axios.get(`${BaseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  // create Job
  const createJob = (values) => { // Corrected function name: CreateJob to createJob
    return axios.post(BaseUrl, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // update a specific Job
  const editJob = (id, values) => { // Corrected function name: EditJob to editJob
    return axios.put(`${BaseUrl}/${id}`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // delete Job
  const deleteJob = (id) => { // Corrected function name: DeleteJob to deleteJob
    return axios.delete(`${BaseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // search for specific Jobs
  const searchJob = (jobName) => { // Corrected parameter name: JobName to jobName
    return axios.get(`${BaseUrl}?title=${jobName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const jobData = {
    createJob,
    editJob, 
    deleteJob, 
    getAllJobs,
    getRecommendedJobs,
    getJob,
    searchJob
  };

  return (
    <JobContext.Provider value={jobData}> {/* Corrected provider name: JobProvider to JobContext */}
      {props.children}
    </JobContext.Provider>
  );
}

JobProvider.propTypes = {
  children: PropTypes.node,
};
