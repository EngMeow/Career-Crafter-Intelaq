import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { JobContext } from "../../../Contex/JobContex";

export function NewJob() {
  const { createJob, editJob } = useContext(JobContext);
  const [myJob, setMyJob] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id) || 0;

  /*=============== Form Operation =================*/

  const [formValue, setFormValue] = useState({
    title: "",
    jobDescription: "",
    location: "",
    experienceLevel: "", // Removed duplicate 'programmingLanguages' key
  });

  useEffect(() => {
    if (id !== 0) {
      let fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:7500/api/v1/classes/${id}`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setMyJob(response.data);
          setFormValue(response.data);
        } catch (error) {
          console.log("error get Class by id", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const getInputValue = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const formOperation = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form values to the formData object
    formData.append("title", formValue.title);
    formData.append("jobDescription", formValue.jobDescription);
    formData.append("location", formValue.location);
    formData.append("experienceLevel", formValue.experienceLevel);

    if (id !== 0) {
      editJob(id, formData)
        .then(() => {
          toast.success("Edit job done successfully!", {
            style: {
              border: "1px solid #53057B",
              padding: "16px",
              color: "#53057B",
            },
            iconTheme: {
              primary: "#53057B",
              secondary: "#FFFAEE",
            },
          });
          navigate(`/dashboard/job/${id}`);
        })
        .catch((error) => {
          console.error("Error updating job:", error);
        });
    } else {
      createJob(formData)
        .then(() => {
          toast.success("Create job done successfully!", {
            style: {
              border: "1px solid #53057B",
              padding: "16px",
              color: "#53057B",
            },
            iconTheme: {
              primary: "#53057B",
              secondary: "#FFFAEE",
            },
          });
          navigate("/dashboard/job/");
        })
        .catch((error) => {
          console.error("Error creating job:", error);
          console.log(myJob);
        });
    }
  };

  return (
    <div>
      <div className="bg-light rounded-4 mt-3 m-2">
        <section className="container py-4 Scroller">
          <form
            onSubmit={formOperation}
            className="col-md-10 m-auto p-4 rounded-4 newForm"
            encType="multipart/form-data"
          >
            <div className="row mb-3">
              <div className="col-md-4 col-xl-10 text-center m-auto p-2 mt-2 rounded-4">
                <h3 className="p-2">
                  {id !== 0 ? "Edit Class" : "Create New Class"}
                </h3>
              </div>
            </div>
            <div className="col-md-10 m-auto">
              <div className="title mb-3">
                <label htmlFor="className" className="form-label px-3">
                  Job title
                </label>
                <input
                  type="text"
                  className="form-control rounded-4 p-3"
                  id="className"
                  name="title"
                  onChange={getInputValue}
                  value={formValue.title}
                />
              </div>

              <div className="description mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Job description
                </label>
                <input
                  type="text"
                  className="form-control rounded-4 p-3"
                  id="exampleInputEmail1"
                  name="jobDescription"
                  onChange={getInputValue}
                  value={formValue.jobDescription}
                />
              </div>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fs-6 px-3"
              >
                Location
              </label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control p-3 rounded-4"
                  name="location"
                  onChange={getInputValue}
                  value={formValue.location}
                />
              </div>
              <div className="gradeLvl mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Experience Level
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="experienceLevel"
                  onChange={getInputValue}
                  value={formValue.experienceLevel}
                >
                  <option value="">Select your Experience level</option>
                  <option value="junior">junior</option>
                  <option value="midLevel">midLevel</option>
                  <option value="senior">senior</option>
                </select>
              </div>
            </div>
            <div className=" m-auto col-md-6">
              <button
                type="submit"
                className="btn btn-warning rounded-4 p-3 w-100 fs-5"
              >
                {id === 0 ? "Create New Job" : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
