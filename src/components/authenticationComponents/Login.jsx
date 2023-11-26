import "../../assets/css/authentication.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {  useState } from "react";
import { useAuth } from "../../Contex/AuthContex";
import toast from "react-hot-toast";
import loginPhoto from '../../assets/images/illustrations/login.svg'

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
   const [ Loading  , setLoading ] =useState(false)

  const auth = useAuth();

 
  const validationLoginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  async function loginSubmit(values) {
    setLoading(true)
    if (isSubmitting === false) {
      setIsSubmitting(true);
    }

    try {
      const response = await axios.post(
        "http://localhost:7500/api/v1/auth/login",
        values,
        {
          withCredentials: true,
        },
      );
      const messageText = response.data.message;
      setMessage(messageText);
      auth.login(response.data.user);
      setLoading(false)

    
      toast.success('Login done successfully!', {
        style: {
          backgroundColor:'#53057B',
          padding: '16px',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#53057B',
        },})
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        
      console.log(message);
      const errorMessage = error.response?.data?.message || "User name or password isn't valid";
      setMessage(errorMessage);
      toast.error(errorMessage, {
        style: {
        backgroundColor:'red',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
      setLoading(false)

    }

    setTimeout(() => setIsSubmitting(false), 2000);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div>
      <section className="py-4 py-md-5 my-5">
        <div className="container py-md-5">
          <div className="row">
            <div className="col-md-6 text-center"><img className="img-fluid w-100" src={loginPhoto}/></div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-5"><span className="underline pb-1"><strong>Login</strong><br /></span></h2>
              <form onSubmit={formik.handleSubmit} method="post" data-bs-theme="light">
                <div className="mb-3">
                  <input className="shadow form-control p-3 rounded-0" 
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  id="email"
                  placeholder="Email" /></div>
                <div className="mb-3">
                  <input className="shadow form-control p-3 rounded-0"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  id="password"
                  placeholder="Password" /></div>
                <div className="mb-3">
                  {Loading === true ? (
                              <button className="btn bg-warning w-100 py-2 text-white fs-bold">
                                  <i className="fa-solid fa-spinner fa-spin"></i>
                              </button>
                              ) : (
                              <button type="submit" className="btn btn-warning w-100 py-2 text-dark rounded-0">
                                  Login
                              </button>
                              )}
                </div>
                <div className="haventAccount">
                    <button className="btn btn-warning w-100 py-2 text-dark rounded-0">
                      <NavLink className="nav-link" to={"/register"}>
                        Sign up
                      </NavLink>
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
