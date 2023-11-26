import { useContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/class.css";
import  presentationImg1 from '../../../assets/images/illustrations/presentation-2.svg'
import  presentationImg2 from '../../../assets/images/illustrations/video-call.svg'
import { JobContext } from "../../../Contex/JobContex";
import { ApplicationContex } from "../../../Contex/ApplicationContex";
import toast from "react-hot-toast";
export function JobView() {
  const { id } = useParams();
  const [myJob, setmyJob] = useState({});
  const [loading, setLoading] = useState(true);
  const { getJob } = useContext(JobContext);
  const { createApplication } = useContext(ApplicationContex);

  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await getJob(id);
      setmyJob(response.data);
    
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-100" style={{marginLeft:"50%"}}>
        <Circles
          height={500}
          width={60}
          color="#89288F"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  const jobApplication =async (jobId) => {
    try {
      const response = await createApplication(jobId);
      console.log(response.data);
      setmyJob(response.data);

      navigate('/dashboard/application')
      toast.success('Applied On job successfully!', {
        style: {
          backgroundColor:'#53057B',
          padding: '16px',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#53057B',
        },})
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  }

  return (
    <div className="col my-3">
      {/*----------------- class image and details --------------------*/}
      <div className="col-md-10 m-auto my-3 shadow">
        <div className="bg-light border p-2 rounded-0 d-flex">
          <div className="p-5 col-md-6">
          <div className="card-body">
                <h2 className="fw-bold text-dark mb-3">{myJob.title}</h2>
                <p className="text-dark ">Location: {myJob.location}</p>
                <p className="text-muted">Programming Languages: {myJob.programmingLanguages.map((language) => (
                <span key={language} className="h5"><br /> {language}</span>
              ))}</p>
                <hr />
                <button className="btn btn-warning px-5 rounded-0 w-50" onClick={() => {jobApplication(myJob._id)}}>Apply for Job</button>
            </div>  
            
          </div>
            <div className="col-md-4 mb-5">
              <img className="rounded img-fluid" src={presentationImg1} />
            </div>
        </div>
        
      </div>

      {/*----------------- class Specific and details --------------------*/}
      <div className="col-md-10 m-auto my-3 shadow">
        <div className="bg-light border p-2 rounded-0 d-flex">
            <div className="col-md-4 mb-5">
              <img className="rounded img-fluid" src={presentationImg2} />
            </div>
          <div className="p-5  col-md-6">
          <div className="mb-5">
            <h3>Job details</h3>
          </div>
          <div className="card-body">
          <div className="text-muted">Experience needed: <h4>{myJob.experienceLevel} level</h4></div>

                <hr />
                <p className="text-dark ">Job Description : {myJob.jobDescription}</p>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}
