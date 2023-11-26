import { NavLink } from "react-router-dom";
import "../../../assets/css/class.css";
import { useContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { UserContext } from "../../../Contex/UserContext";
import { JobContext } from "../../../Contex/JobContex";

export function AllJobs() {
  const [formValue , setFormValue ] = useState({
    searchKey:''
  })
  const [myJob, setMyJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const { myUser } = useContext(UserContext);
  const {  deleteJob  , getAllJobs , searchJob} = useContext(JobContext);

  const fetchData = async () => {
    try {
      let response ;
        response = await getAllJobs()
        setMyJob(response.data);
        setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteAction = (id) => {
    deleteJob(id);

    setMyJob((prevList) => prevList.filter((x) => x._id !== id));
  };

  if (loading) {
    return (
      <div className="w-100" style={{marginLeft:"50%"}}>
        <Circles
          height={500}
          width={60}
          color="#0b0381"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  // search bar logic
  const getInputValue = (e) => {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
    })
  };

  const formOperation = async (e) => {
    e.preventDefault();
    try {
      const response = await searchJob(formValue.searchKey);
      setMyJob(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching classes:", error);
    }
  };
  return (
    <div className="background rounded-0 m-2">
      <section className="py-1 Scroller">
        <div className="container p-0">
          <div className="row mb-2">
            <div className="col-md-11 text-center m-auto bg-light px-3 rounded-0 mt-2">
              <h3 className="py-2">Explore All Jobs</h3>
              <nav className="navbar bg-light py-3 ">
                <div className="container-fluid">
                  <div className="row w-100">
                    <div className="col-md-8">
                      <form className="d-flex" onSubmit={formOperation}>
                        <input
                          className="form-control rounded-0"
                          type="text"
                          placeholder="Search by name"
                          aria-label="Search"
                          id="searchKey"
                          name="searchKey"
                          onChange={getInputValue}
                          value={formValue.searchKey}
                        />
                        <button className="btn rounded-0 p-2 bg-warning " type="submit">
                          Search
                        </button>
                      </form>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        
                        <div className="col-md-6">
                          <div className="dropdown">
                            <button
                              className="btn dropdown-toggle filterBtn"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i
                                className="fa-solid fa-street-view px-1 fs-4"
                                style={{ color: "#0b0381" }}
                              />
                              Location
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button className="dropdown-item" type="button">
                                  Action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Another action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Something else here
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="dropdown">
                            <button
                              className="btn dropdown-toggle filterBtn"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i
                                className="fa-solid fa-arrow-up-right-dots px-1 fs-6"
                                style={{ color: "#0b0381" }}
                              ></i>
                              Experience Level
                            </button>

                            <ul className="dropdown-menu">
                              <li>
                                <button className="dropdown-item" type="button">
                                  Action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Another action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Something else here
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="quizlist">
            <div className="container ">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 JobCard">
                {myJob.map((job) => (
                  <div className="col-mb-4 p-2" key={job._id}>
                    <div className="bg-light border p-4 rounded-0">
                      
                      <div className="p-2 text-center">
                        <h4 className=" pt-2 " style={{ maxWidth: "100%" }}>
                          {job.title}
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
                              Location : {job.location}
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
                             Experience Level : {job.experienceLevel}
                            </p>
                          </div>
                        </div>
                      </div>
                      {myUser.role === "employer" ? (
                        <div className="d-flex justify-content-center">
                          <NavLink
                            className="fa fa-solid fa-eye mx-3 fs-3 text-warning"
                            to={`/dashboard/job/${job._id}`}
                          />
                          <NavLink
                            className="fa-solid fa-pen-to-square mx-3 fs-3 text-info"
                            to={`/dashboard/job/${job._id}/edit`}
                          />
                          <i
                            className="fa-solid fa-trash-can mx-3 fs-3 text-danger"
                            onClick={() => DeleteAction(job._id)}
                          />
                        </div>
                      ) : null}
                      {myUser.role == "employee" ? (
                        <div className="d-flex">
                          <NavLink
                            className="nav-link w-100 btn bg-warning p-1 rounded-0 fs-5 text-center"
                            to={`/dashboard/job/${job._id}`}
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
