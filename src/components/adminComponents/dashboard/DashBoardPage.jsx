import { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../../../Contex/UserContext';
import { JobContext } from '../../../Contex/JobContex';

export default function DashBoardPage() {

  const { fetchUserProfile , myUser } = useContext(UserContext)
  const [myJob, setMyJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteJob, getRecommendedJobs } = useContext(JobContext);

  const fetchData = async () => {
      try {
        let response ;
          response = await getRecommendedJobs()
          setMyJob(response.data);
          setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
        console.log(loading);
      }
    };
  
  useEffect(() => {
  fetchData();
  fetchUserProfile();
  }, []);

  const DeleteAction = (id) => {
    deleteJob(id);

    setMyJob((prevList) => prevList.filter((x) => x._id !== id));
  };
  return (
    <div>
      <section>
        <div className="container py-4 py-xl-5">
      <div className="row mb-5">
        <div className="col-md-8 col-xl-6">
          <h3 className="display-6 fw-bold pb-4 mb-4">Let&rsquo;s find a Job that from Out&nbsp;<span className="text-warning">Recommendation</span></h3>
        </div>
        
      </div>
      <div className="quizlist">
            <div className="container ">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 JobCard">
                {myJob.map((job) => (
                  <div className="col-mb-4 p-2" key={job.job._id}>
                    <div className="bg-light border p-4 rounded-0">
                      
                      <div className="p-2 text-center">
                        <h4 className=" pt-2 " style={{ maxWidth: "100%" }}>
                          {job.job.title}
                        </h4>
                      </div>
                      <div className="spec d-wrap">
                        <div className="d-flex p-1">
                          <div>
                            <i
                              className="fa fa-light fa-chalkboard-user fs-5 me-2"
                              style={{ color: "#0b0381" }}
                            />
                          </div>
                          <div>
                            <p className="" style={{ maxWidth: "100%" }}>
                              Location : {job.job.location}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex p-1 ms-auto">
                          <div>
                            <i
                              className="fa fa-solid fa-user-graduate fs-5 me-1"
                              style={{ color: "#0b0381" }}
                            />
                          </div>
                          <div>
                            <p className="ms-1" style={{ maxWidth: "100%" }}>
                             Experience Level : {job.job.experienceLevel}
                            </p>
                          </div>
                        </div>
                      </div>
                      {myUser.role === "employer" ? (
                        <div className="d-flex justify-content-center">
                          <NavLink
                            className="fa fa-solid fa-eye mx-3 fs-3 text-warning"
                            to={`/dashboard/job/${job.job._id}`}
                          />
                          <NavLink
                            className="fa-solid fa-pen-to-square mx-3 fs-3 text-info"
                            to={`/dashboard/job/${job.job._id}/edit`}
                          />
                          <i
                            className="fa-solid fa-trash-can mx-3 fs-3 text-danger"
                            onClick={() => DeleteAction(job.job._id)}
                          />
                        </div>
                      ) : null}
                      {myUser.role == "employee" ? (
                        <div className="d-flex">
                          <NavLink
                            className="nav-link w-100 btn bg-warning p-1 rounded-0 fs-5 text-center"
                            to={`/dashboard/job/${job.job._id}`}
                          >
                            View Job
                          </NavLink>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
    </div>
  );
}
