import  group1  from '../assets/images/illustrations/meeting.svg'
import  group2  from '../assets/images/illustrations/ranking.svg'
import  group3  from '../assets/images/brands/instacart.png'
import  group4  from '../assets/images/brands/kickstarter.png'
import  group5  from '../assets/images/brands/lyft.png'
import  group6  from '../assets/images/brands/shopify.png'
import  group7  from '../assets/images/brands/pinterest.png'
import  group8  from '../assets/images/brands/twitter.png'
import "../assets/css/Home.css";
import '../assets/bootstrap/css/bootstrap.min.css'
import { Link, NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
  <nav className="navbar navbar-expand-md fixed-top navbar-shrink py-3 navbar-white bg-white" id="mainNav">
    <div className="container">
    <span className="h1 px-4"><strong>Career<span className="text-warning">Crafter</span></strong></span>
      <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
      <div className="collapse navbar-collapse" id="navcol-1">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item"><a className="nav-link active" href="index.html">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="features.html">Features</a></li>
        </ul>
        <Link to={"/login"} 
        className="btn btn-warning px-5 p-3 rounded-0 shadow" 
        role="button">Join Us
                  </Link>
      </div>
    </div>
  </nav>
  <header className="pt-5">
    <div className="container pt-4 pt-xl-5">
      <div className="row pt-5">
        <div className="col-md-8 text-center text-md-start mx-auto">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-5">
              Career<span className="text-warning">Crafter</span><br /> Let&rsquo;s find <span className="underline text-warning">Work</span>.</h1>
            <p className="fs-5 text-muted mb-5">Find a job tailored for you</p>
            <form className="d-flex justify-content-center flex-wrap" method="post" data-bs-theme="light">
              <div className="shadow-lg mb-3 col-md-8"><input className="form-control p-3 rounded-0" type="text" name="text" placeholder="Search for Jobs in Egypt" /></div>
              <div className="shadow-lg mb-3"><button className="btn btn-outline-warning p-3 rounded-0 shadow" type="submit">Search </button></div>
            </form>
          </div>
        </div>
        <div className="col-12 col-lg-10 mx-auto">
          <div className="text-center position-relative"><img className="img-fluid" src={group1} style={{width: 800}} /></div>
        </div>
      </div>
    </div>
  </header>
  <section className="py-5 mt-5">
  <div className="container py-4 py-xl-5">
    <div className="row gy-4 gy-md-0">
      <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
        <div style={{maxWidth: 350}}>
          <h1 className="display-6 fw-bold mb-4">Everything your need to find&nbsp;<span className="text-warning">Work</span>.</h1>
          <p className="my-4 fw-light">Join our family now</p>
          <NavLink className="btn btn-warning rounded-0 btn-lg me-2 py-3 px-5" to='./login'>Log In</NavLink>
          <NavLink className="btn btn-warning rounded-0 btn-lg me-2 py-3 px-5" to='./register'>Sign up</NavLink>
        </div>
      </div>
      <div className="col-md-6">
        <div><img className="rounded img-fluid w-100 fit-cover" style={{minHeight: 300}} src={group2} /></div>
      </div>
    </div>
    <div className="text-center mt-5">
      <p className="mb-4" style={{fontSize: '1.6rem'}}>Used by <span className="h1 text-warning p-1"><strong>2400+</strong></span>&nbsp;of the best companies in the world.</p>
      <a href="#"><img className="img-fluid m-3" src={group3} /></a>
      <a href="#"><img className="img-fluid m-3" src={group4} /></a>
      <a href="#"><img className="img-fluid m-3" src={group5} /></a>
      <a href="#"><img className="img-fluid m-3" src={group6} /></a>
      <a href="#"><img className="img-fluid m-3" src={group7} /></a>
      <a href="#"><img className="img-fluid m-3" src={group8} /></a>
    </div>
  </div>
  </section>
  <footer>
    <div className="container py-4 py-lg-5">
      <div className="row row-cols-2 row-cols-md-4">
        <div className="col-12 col-md-3">
          <div className="fw-bold d-flex align-items-center mb-2">
            <span className=" px-4"><strong>Career<span className="text-warning">Crafter</span></strong></span>
          </div>
          <p className="text-muted">Get your best job for best profile</p>
        </div>
        <div className="col-sm-4 col-md-3 text-lg-start d-flex flex-column">
          <h3 className="fs-6 fw-bold">Services</h3>
          <ul className="list-unstyled">
            <li><a href="#">Web design</a></li>
            <li><a href="#">Development</a></li>
            <li><a href="#">Hosting</a></li>
          </ul>
        </div>
        <div className="col-sm-4 col-md-3 text-lg-start d-flex flex-column">
          <h3 className="fs-6 fw-bold">About</h3>
          <ul className="list-unstyled">
            <li><a href="#">Company</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Legacy</a></li>
          </ul>
        </div>
        <div className="col-sm-4 col-md-3 text-lg-start d-flex flex-column">
          <h3 className="fs-6 fw-bold">Careers</h3>
          <ul className="list-unstyled">
            <li><a href="#">Job openings</a></li>
            <li><a href="#">Employee success</a></li>
            <li><a href="#">Benefits</a></li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="text-muted d-flex justify-content-between align-items-center pt-3">
        <p className="mb-0">Copyright © 2023 EngMeow</p>
        <ul className="list-inline mb-0">
          <li className="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-facebook">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg></li>
          <li className="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-twitter">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg></li>
          <li className="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-instagram">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
            </svg></li>
        </ul>
      </div>
    </div>
  </footer>
    </div>

  );
}

export default Home;
