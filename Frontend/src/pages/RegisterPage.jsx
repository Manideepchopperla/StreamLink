
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import { addUser } from '../utils/authSlice';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: ''
  });
  
  const { name, email, password, password2, role } = formData;
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async(e) => {
    e.preventDefault();
    
    try {
        console.log(import.meta.env.VITE_BASE_URL);
        const res = await axios.post(import.meta.env.VITE_BASE_URL+`/auth/register`, formData);
        dispatch(addUser(res.data));
        toast.success('Registration successful!');
        navigate('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.message;
        
        if (errors) {
        toast.error(errors);
        }
    }
  };
  
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-[20vh]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600">Sign up for a new account</p>
          </div>
          
          <form onSubmit={onSubmit}>
            <Input
              label="Name"
              name="name"
              type="text"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
        
            
            <div className="mb-6">
              <Button type="submit" variant="primary" fullWidth>
                Register
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
