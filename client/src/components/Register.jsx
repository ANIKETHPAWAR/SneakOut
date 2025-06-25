import { useState } from 'react';
import { Eye, EyeOff, MapPin, User, Lock, Sparkles,Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  // State for form fields
  const [formData, setFormData] = useState({
   firstName:"",
   lastName:"",
    username: '',
    email: '',
    password: ''
  });
  // focus field state
  const [focusedField, setFocusedField] = useState('');
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // State for errors and loading
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/SneakOut/user/register', formData);
      login(res.data.token); // AuthContext login
    } catch (err) {
      setErrors({ api: err.response?.data?.error || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

}; 