import { useState } from 'react';
import { Eye, EyeOff, MapPin, User, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { API_BASE_URL } from '../utils/constants';

const Login = () => {
  ///states 
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      setSuccess('')
     const res = await axios.post(`${API_BASE_URL}/SneakOut/user/login`, formData);
      login(res.data.token);
    } catch (error) {
      setErrors({error})
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-80 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo/Brand Section */}
        <div className="text-base mb-2 flex fade-in">
          <div className="inline-flex  items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-2 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <MapPin className="w-10 h-10 text-white" />
            
          </div>
          <div className='items-center justify-center ml-4'>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            SneakOut
          </h1>
          
          <p className="text-purple-200/80 text-lg font-medium">Discover hidden gems around you</p></div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 fade-in animation-delay-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-purple-200/70">Sign in to continue your journey</p>
          </div>
          {errors.api && <p className="text-red-400 text-xs text-center">{errors.api}</p>}
          {success && <p className="text-green-400 text-xs text-center">{success}</p>}
          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
                focusedField === 'username' ? 'text-purple-400' : 'text-gray-400'
              }`}>
                <User className="h-5 w-5" />
              </div>
              <input
                autoComplete="off"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your username"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-white placeholder-purple-200/50 backdrop-blur-sm"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
                focusedField === 'password' ? 'text-purple-400' : 'text-gray-400'
              }`}>
                <Lock className="h-5 w-5" />
              </div>
              <input
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-white placeholder-purple-200/50 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-200/70 hover:text-purple-300 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-purple-200/60 font-medium">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-purple-200/70">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 fade-in animation-delay-400">
          <p className="text-sm text-purple-200/50">
            By signing in, you agree to our{' '}
            <a href="#" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-200">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-200">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 