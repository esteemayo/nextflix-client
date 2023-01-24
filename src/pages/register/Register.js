import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../../firebase';
import { register } from 'services/userService';

import './register.scss';

const Register = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    const fileName = `${new Date().getTime()}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `users/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;

          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const newUser = {
            email,
            avatar: downloadURL,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
          };

          try {
            await register({ ...newUser });
            navigate('/login');
          } catch (err) {
            console.log(err);
          }
        });
      }
    );
  };

  return (
    <div className='register'>
      <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt='logo'
          />
          <button className='login-button'>Sign in</button>
        </div>
      </div>
      <div className='container'>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className='input'>
            <input type='email' placeholder='Email address' ref={emailRef} />
            <button className='register-button' onClick={handleStart}>
              Get started
            </button>
          </div>
        ) : (
          <form className='input' style={{ width: '80%' }}>
            <input type='text' placeholder='Username' ref={usernameRef} />
            <input type='password' placeholder='Password' ref={passwordRef} />
            <input
              type='password'
              placeholder='Confirm Password'
              ref={confirmPasswordRef}
            />
            <div>
              <input
                type='file'
                name='file'
                id='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              className='register-button'
              style={{ flex: '4' }}
              onClick={handleFinish}
            >
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
