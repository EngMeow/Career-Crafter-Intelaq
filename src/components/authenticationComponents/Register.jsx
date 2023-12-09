import "../../assets/css/authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import registerImg from '../../assets/images/illustrations/register.svg'
import toast from "react-hot-toast";
export default function Register() {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);

  //submit function
  async function registerSubmit(values) {
    // You can determine which field to send based on the role value
    let dataToSend = values;
  
    const response = await axios
      .post("http://localhost:7500/api/v1/auth/signup", dataToSend)
      .catch((err) => {
        setisloading(false);
        seterror(err.response.data.message);
      });
    if (response.data.message === "Registration done successfully") {
      setisloading(true);
      navigate("/login");
      toast.success('Register done successfully!', {
        style: {
          backgroundColor:'#53057B',
          padding: '16px',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#53057B',
        },})
    } else {
      console.log("Not successfull");
    }
  }

  //Yup
  let validateSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(13, "Name must be at most 10 characters"),
    nationalID: Yup.string()
      .required(" National Id is required")
      .length(14, " National Id must be 14 characters"),

    gender: Yup.string()
      .required()
      .test(
        "is-uppercase",
        "First Name must be in uppercase",
        function (value) {
          if (value) {
            return value === value.toUpperCase();
          }
          return true;
        },
      ),
    role: Yup.string().required("Role is required"),
    experienceLevel: Yup.string().required(),

    phone: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^(010|011|015|012)[0-9]{8}$/,
        "Enter a valid Egyptian phone number",
      ),

    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character",
      ),
  });

  //Formik

  let formik = useFormik({
    initialValues: {
      name: "",
      nationalID: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      role: "",
      experienceLevel: "",
    },
    validationSchema: validateSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
  <section className=" ">
  <div className="container py-md-5">
    <div className="d-flex justify-content-around">
      <div className="py-md-6 py-5 col-md-6 text-center"><img className="img-fluid w-100" src={registerImg} /></div>
      <div className="col-md-6 text-center text-md-start ">
        <div className="w-100 Scroller">
              <form
            onSubmit={formik.handleSubmit}
            className=" form rounded-0 px-5 py-4 w-100"
          >
            <div className="formHeader text-center pt-3">
              {error && <div className="alert alert-danger">{error}</div>}
              <h2 className="fw-bold mb-5"><span className="underline pb-1"><strong>Sign up</strong></span></h2>
            </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="firstName py-2">
                      <label htmlFor="firstName" className="form-label">
                        Name
                      </label>
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        type="text"
                        className="form-control rounded-0  "
                        id="name"
                        name="name"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <p className=" mt-2 p-2 text-danger">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="lastName py-2">
                      <label htmlFor="lastName" className="form-label">
                        National ID
                      </label>
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.nationalID}
                        type="text"
                        className="form-control rounded-0 "
                        id="nationalID"
                        name="nationalID"
                      />
                      {formik.errors.nationalID && formik.touched.nationalID && (
                        <p className=" mt-2 p-2 text-danger">
                          {formik.errors.nationalID}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="gender py-2">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <select
                        className="form-select rounded-0"
                        name="gender"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                      >
                        <option value="0">Select your gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      {formik.errors.gender && formik.touched.gender && (
                        <p className=" mt-2 p-2 text-danger">
                          {formik.errors.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                  <div className="phoneNumber py-2">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      type="tel"
                      className="form-control rounded-0 "
                      id="phone"
                      name="phone"
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <p className="mt-2 p-2 text-danger">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                  </div>

                  <div className="col-md-6">
                    <div className="role py-2">
                      <label htmlFor="role" className="form-label">
                        {" "}
                        Role{" "}
                      </label>
                      <select
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        className="form-select rounded-0"
                        name="role"
                      >
                        <option value="0">Select your role</option>
                        <option value="employer">Employer</option>
                        <option value="employee">Employee</option>
                      </select>
                      {formik.errors.role && formik.touched.role && (
                        <p className=" mt-2 p-2 text-danger">
                          {formik.errors.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="gradeLevel py-2">
                      <label htmlFor="gradeLevel" className="form-label w-100">
                        Experience Level
                      </label>
                      <select
                        className="form-select rounded-0 "
                        name="experienceLevel"
                        id="experienceLevel"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.experienceLevel}
                      >
                        <option value="">Select your experienceLevel</option>
                        <option value="junior">junior</option>
                        <option value="midLevel">midLevel</option>
                        <option value="senior">senior</option>
                      </select>
                      {formik.errors.experienceLevel && formik.touched.experienceLevel && (
                        <p className=" mt-2 p-2 text-danger">
                          {formik.errors.experienceLevel}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="email py-2">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      type="email"
                      className="form-control rounded-0 "
                      id="email"
                      name="email"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="mt-2 p-2 text-danger">{formik.errors.email}</p>
                    )}
                  </div>

                  <div className="password py-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      type="password"
                      className="form-control rounded-0 "
                      id="password"
                      name="password"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className="mt-2 p-2 text-danger">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2 haveAccount">
                  <span>
                    You have an account?{" "}
                    <Link to={"/Login"} className="text-dark">
                      Sign in
                    </Link>
                  </span>
                </div>
                <div className="col-12 text-center m-auto mt-3 rounded-0 d-flex">
                  {isloading ? (
                    <button className="btn  text-dark">
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className=" btn btn-warning rounded-0 w-100 py-2 text-dark fs-bold shadow"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
