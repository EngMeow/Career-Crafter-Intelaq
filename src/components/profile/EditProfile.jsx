import Profile from '../../assets/images/profile.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import toast from 'react-hot-toast';

  export default function EditProfile() {
    const [myUser, setMyUser] = useState({});
    const navigate = useNavigate();
    const [error, seterror] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [formValue, setFormValue] = useState({
      name: '',
      email: '',
      nationalID: '',
      password: '',
      phone: '',
      gender: '',
      role: '',
      experienceLevel: '',
      profileImage:'',
      city:'',
      progLanguage:''
    });
    const fileInputRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
      
      const handleImageClick = () => {
        fileInputRef.current.click();
      };
      
      const handleImageChange = (e) => {
        const file = e.target.files[0];
      
        if (file) {
          setFormValue({
            ...formValue,
            profileImage: file,
          });
      
          setIsEditingImage(true);
        }
      };
      

    const handleSaveImage = () => {
      if (editor) {
        const canvas = editor.getImage();
        canvas.toBlob((blob) => {
          setIsEditingImage(false);

          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result;
            saveProfileImageToLocalStorage(imageUrl);
            setProfileImageUrl(imageUrl);
          };
          reader.readAsDataURL(blob);
          
          setFormValue({
            ...formValue,
            profileImage: blob,
          });
        });
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7500/api/v1/users/profile`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          );
          console.log(profileImageUrl)
          setMyUser(response.data.user);
          setFormValue(response.data.user);
          
          const userProfileImage = response.data.user.profileImage;
          
          if (userProfileImage) {
            setProfileImageUrl(`http://localhost:7500/static/${userProfileImage}`);
          } else {
            setProfileImageUrl(null);
          }
        } catch (error) {
          seterror(error.message);
          console.error('Error getting user profile:', error);
        }
      };
      
    useEffect(() => {
      fetchData();

      return () => {};
    }, []);

    useEffect(() => {
      fetchData();
      const storedImageUrl = getProfileImageFromLocalStorage();
      if (storedImageUrl) {
        setProfileImageUrl(storedImageUrl);
      }
      return () => {};
    }, []);

    const getInputValue = (e) => {
      if (e.target.name === 'profileImage') {
        setFormValue({
          ...formValue,
          [e.target.name]: e.target.files[0],
        });
        setIsEditingImage(true);
      } else {
        setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
        });
      }
    };
    
    const saveProfileImageToLocalStorage = (imageUrl) => {
      localStorage.setItem('profileImageUrl', imageUrl);
    };
    
    const getProfileImageFromLocalStorage = () => {
      return localStorage.getItem('profileImageUrl');
    };
    
    useEffect(() => {
      if (formValue.profileImage) {
        if (
          formValue.profileImage instanceof File ||
          formValue.profileImage instanceof Blob
          ) {
            const reader = new FileReader();
            reader.onload = () => {
              setProfileImageUrl(reader.result);
            };
            reader.readAsDataURL(formValue.profileImage);
          } else {
            // Assuming that the profileImage is a string (URL)
            setProfileImageUrl(formValue.profileImage);
          }
        } else {
          setProfileImageUrl(null);
        }
      }, [formValue.profileImage]);
  

    const formOperation = async (e) => {
      // No need to prevent form submission
      e.preventDefault();
    
      const formData = new FormData();
    
      for (const key in formValue) {
        if (key === 'profileImage') {
          formData.append(key, formValue[key] === '' ? null : formValue[key]);
        } else {
          formData.append(key, formValue[key]);
        }
      }
    
      try {
        await axios.put('http://localhost:7500/api/v1/users/profile', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // Let the form's default submit behavior handle navigation
        navigate(`/dashboard/profile`);
        toast.success('update profile information successfully!', {
          style: {
            backgroundColor:'#53057B',
            padding: '16px',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#53057B',
          },})
        console.log(myUser, error);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };
    

    return (
      <>
        <div className='rounded-0 bg-white shadow col-md-10 m-auto my-4 Scroller'>
          <div className='m-auto'>
            <form
              onSubmit={formOperation}
              className='form rounded-0 px-5 py-4 col-md-12'
              encType='multipart/form-data'
            >
              <div className='formLogo d-flex justify-content-center align-items-center my-5 text-center'>
              {isEditingImage && (
                <div className='avatar-container'>
                  <AvatarEditor
                    ref={(editor) => setEditor(editor)}
                    image={formValue.profileImage || ''}
                    width={150}
                    height={150}
                    border={50}
                    borderRadius={75}
                    color={[255, 255, 255, 0.6]}
                    scale={1.2}
                    rotate={0}
                  />
                </div>
              )}
              {!isEditingImage && (
                <>
                  <img
                    src={ Profile}
                    alt='Profile'
                    className='rounded-circle profile-image'
                    width={150}
                    height={150}
                    onClick={handleImageClick}
                  />
                  <input
                    id='profileImage'
                    type='file'
                    ref={fileInputRef}
                    className='form-control p-3 rounded-4'
                    name='profileImage'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </>
              )}
              {isEditingImage && (
                <button type='button' onClick={handleSaveImage}>
                  Save Image
                </button>
              )}
            </div>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='name mb-3'>
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                    <input
                      type='text'
                      className='form-control p-3 rounded-0 '
                      id='name'
                      name='name'
                      onChange={getInputValue}
                      value={formValue.name}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='nationalID mb-3'>
                    <label htmlFor='nationalID' className='form-label'>
                      National ID
                    </label>
                    <input
                      type='text'
                      className='form-control p-3 rounded-0'
                      id='nationalID'
                      name='nationalID'
                      onChange={getInputValue}
                      value={formValue.nationalID}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='gender mb-3'>
                    <label htmlFor='gender' className='form-label'>
                      Gender
                    </label>
                    <select
                      className='form-select p-3 rounded-0'
                      name='gender'
                      onChange={getInputValue}
                      value={formValue.gender}
                    >
                      <option value='0'>Select your gender</option>
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                    </select>
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='phone mb-3'>
                    <label htmlFor='phone' className='form-label'>
                      Phone Number
                    </label>
                    <input
                      type='text'
                      className='form-control p-3 rounded-0 p-3'
                      name='phone'
                      onChange={getInputValue}
                      value={formValue.phone}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='gender mb-3'>
                    <label htmlFor='gender' className='form-label'>
                      City
                    </label>
                    <input
                      type='text'
                      className='form-control p-3 rounded-0 p-3'
                      name='city'
                      onChange={getInputValue}
                      value={formValue.city}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='phone mb-3'>
                    <label htmlFor='phone' className='form-label'>
                      Programming Language
                    </label>
                    <input
                      type='text'
                      className='form-control p-3 rounded-0 p-3'
                      name='progLanguage'
                      onChange={getInputValue}
                      value={formValue.progLanguage}
                    />
                  </div>
                </div>

                <div className='email mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='tel'
                    className='form-control p-3 rounded-0'
                    id='email'
                    name='email'
                    onChange={getInputValue}
                    value={formValue.email}
                  />
                </div>

                <div className='bio mb-3'>
                  <label htmlFor='email' className='form-label'>
                    bio
                  </label>
                  <textarea
                    className='form-control p-3 rounded-0'
                    id='bio'
                    name='bio'
                    onChange={getInputValue}
                    value={formValue.bio}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-warning text-center rounded-0 m-auto p-3 my-4 fs-5'
                >
                  Save Changes
                </button>

              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
