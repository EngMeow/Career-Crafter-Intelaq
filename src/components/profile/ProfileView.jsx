import Profile from '../../assets/images/profile.png';
import { useContext, useEffect } from 'react';
import '../../assets/css/Profile.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Contex/UserContext';

export default function ProfileView() {
  const { fetchUserProfile , myUser } = useContext( UserContext )

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <section className='profile-view'>
        <div className='container '>
          <div className='view-card bg-white rounded-0 shadow my-4'>
            <h1 className='text-center pt-4 fw-bold '>View Profile</h1>
            <div className='row'>
              <div className='col-md-5 py-5'>
                <div className='profile-img  d-flex justify-content-center align-items-center rounded-circle'>
                  <img
                    className='rounded-circle'
                    src={ Profile}
                    alt=''
                  />
                </div>
                <div className='profile-name my-3  text-center'>
                  <h2 className='h5'> {myUser.name}
                  </h2>
                </div>
                <div className='col-4 text-center m-auto rounded-0 w-50 bg-warning'>
                  <NavLink
                    type='submit'
                    className='nav-link w-100 py-3  fs-bold'
                    to='./edit'
                  >
                    Edit Profile
                  </NavLink>
                </div>
              </div>
              <div className='col-md-7 p-5'>
                <div className='d-flex my-3'>
                  <i
                    className='fa fa-solid fa-user fs-3 me-2'
                    style={{ color: '#0b0381' }}
                  />
                  <p className='mx-4'>Bio : {myUser.bio}</p>
                </div>
                <div className='d-flex my-3'>
                  <i
                    className='fa-solid fa-computer fs-3 me-2'
                    style={{ color: '#0b0381' }}
                  />
                  <p className='mx-3'>
                    Experience Level :{' '}
                    {myUser.experienceLevel}
                  </p>
                </div>
                <div className='d-flex my-3'>
                  <i
                    className='fa fa-brands fa-artstation fs-3 me-2'
                    style={{ color: '#0b0381' }}
                  />
                  <p className='mx-4'>
                    National ID :{' '}
                    {myUser.nationalID}
                  </p>
                </div>
                <div className='d-flex my-3'>
                  <i
                    className='fa fa-solid fa-phone fs-3 me-2'
                    style={{ color: '#0b0381' }}
                  />
                  <p className='mx-4'>Phone Number : {myUser.phone}</p>
                </div>
                <div className='d-flex my-3'>
                  <i
                    className='fa-solid fa-wand-magic-sparkles fs-3 me-2'
                    style={{ color: '#0b0381' }}
                  />
                  <p className='mx-4'>Programming Languages : {myUser.progLanguage}</p>
                </div>
                <div className='d-flex my-3'>
                  <i
                    className='fa fa-solid fa-envelope fs-3 me-2'
                    style={{ color: '#0b0381' }}
                  />
                  
                  <p className='mx-4'>Email : {myUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
