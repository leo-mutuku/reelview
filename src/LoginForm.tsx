import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './features/api/apiSlice';
import { setCredentials } from './features/auth/authSlice';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import BadgeIcon from '@mui/icons-material/Badge';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LockResetIcon from '@mui/icons-material/LockReset';
import AutoCompleteCountries from './components/formComponents/AutoCompleteContries';
import countries from './components/formComponents/countries';
import {
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';


// Define the country type for reference
interface Country {
  label: string;
  code: string;
  phone: string;
  currency: string;
}

const LoginForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Shop details
  const [userId, setUserId] = useState("");
  const [shopName, setShopName] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [category, setCategory] = useState("");
  
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isShop, setIsShop] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  // Handle country change and update currency
  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    // Find the country object and set the corresponding currency
    const selectedCountryObj = countries.find(
      (c: Country) => c.label === selectedCountry || c.code === selectedCountry || c.phone === selectedCountry || c.currency === selectedCountry
    );
    if (selectedCountryObj) {
      setCurrency(selectedCountryObj.currency);
    } else {
      setCurrency(""); // Clear currency if no country is found
    }
  };

  const handleLoginState = () => {
    setIsLogin(true);
    setIsSignUp(false);
    setIsShop(false);
    setIsResetPassword(false);
    setUserId("");
    setEmail("");
    setFullName("");
    setLocation("");
    setCountry("");
    setBusinessType("");
    setCategory("");
    setShopName("");
    setCurrency("");
  };

  const handleSignUpState = () => {
    setIsLogin(false);
    setIsSignUp(true);
    setIsShop(false);
    setIsResetPassword(false);
    setUserId("");
    setEmail("");
    setFullName("");
    setLocation("");
    setCountry("");
    setBusinessType("");
    setCategory("");
    setShopName("");
    setCurrency("");
  };

  const handleResetPasswordState = () => {
    setIsLogin(false);
    setIsSignUp(false);
    setIsShop(false);
    setIsResetPassword(true);
    setUserId("");
    setEmail("");
    setFullName("");
    setLocation("");
    setCountry("");
    setBusinessType("");
    setCategory("");
    setShopName("");
    setCurrency("");
  };

  const handleShopState = () => {
    setIsLogin(false);
    setIsSignUp(false);
    setIsShop(true);
    setIsResetPassword(false);
    setUserId("");
    setEmail("");
    setFullName("");
    setLocation("");
    setCountry("");
    setBusinessType("");
    setCategory("");
    setShopName("");
    setCurrency("");
  };

  useEffect(() => {
    const checkScreen = () => {
      const isSmall = window.matchMedia('(max-width: 1023px)').matches;
      setIsSmallScreen(isSmall);
    };

    checkScreen(); // Run once on load
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Handle sign up logic
      console.log('Sign up data:', {
        fullName,
        email,
        password,
        confirmPassword,
        country,
        currency
      });
      // Add your sign up API call here
    } else {
      // Handle login logic
      try {
        const result = await login({ email, password }).unwrap();
        dispatch(setCredentials(result));
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        background: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '20px'
      }}
    >
      {/* LEFT IMAGE SECTION — Hide on xs, sm, md */}
      <div
        style={{
          flex: 1,
          display: isSmallScreen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px'
        }}
      >
        <div
          style={{
            backgroundImage: `url("/images/laptop.avif")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            maxWidth: '500px',
            height: '300px',
            borderRadius: '20px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '12px 20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            Run your store <span style={{ color: '#a78bfa' }}>Rule</span> your day! 
            <br></br>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>SwiftaPos ™</span>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN FORM — Always visible */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={0}
          style={{
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            background: '#ffffff'
          }}
        >
          {/* Login form */}
          {isLogin ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MovieFilterIcon style={{ color: 'white', fontSize: '32px' }} />
                </div>
                <h2 style={{ margin: 0, fontWeight: 700 }}>Welcome Back</h2>
                <p style={{ color: '#6b7280', marginTop: '8px' }}>Login in to continue</p>
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <TextField
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                {error && (
                  <Alert severity="error">
                    Login failed. Please check your credentials.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    height: '48px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)'
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LoginIcon sx={{ mr: 1 }} />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </div>
          ) : ""}

          {/* Sign up form */}
          {isSignUp ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <HowToRegIcon style={{ color: 'white', fontSize: '32px' }} />
                </div>
                <h2 style={{ margin: 0, fontWeight: 700 }}>Create An Account</h2>
                <p style={{ color: '#6b7280', marginTop: '8px' }}>One more step on track</p>
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <TextField
                  type="text"
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactMailIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                
                {/* Updated AutoComplete with proper props */}
                <AutoCompleteCountries 
                  value={country}
                  onChange={handleCountryChange}
                  label="Select Country"
                  variant="outlined"
                  placeholder="Choose your country..."
                  required={true}
                />

                {error && (
                  <Alert severity="error">
                    Registration failed. Please try again.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    height: '48px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)'
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <KeyboardTabIcon sx={{ mr: 1 }} />
                      Next
                    </>
                  )}
                </Button>
              </form>
            </div>
          ) : ""}

          {/* Shop form */}
          {isShop ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MovieFilterIcon style={{ color: 'white', fontSize: '32px' }} />
                </div>
                <h2 style={{ margin: 0, fontWeight: 700 }}>Getting started</h2>
                <p style={{ color: '#6b7280', marginTop: '8px' }}>Sign in to continue</p>
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <TextField
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                {error && (
                  <Alert severity="error">
                    Login failed. Please check your credentials.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    height: '48px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)'
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LoginIcon sx={{ mr: 1 }} />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </div>
          ) : ""}

          {/* Reset password */}
          {isResetPassword ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <LockResetIcon style={{ color: 'white', fontSize: '32px' }} />
                </div>
                <h2 style={{ margin: 0, fontWeight: 700 }}>Forgot Your Password</h2>
                <p style={{ color: '#6b7280', marginTop: '8px' }}>Enter your email to reset</p>
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <TextField
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    )
                  }}
                />

                {error && (
                  <Alert severity="error">
                    Login failed. Please check your credentials.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    height: '48px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)'
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      We could not find associated email account...
                    </>
                  ) : (
                    <>
                      <LoginIcon sx={{ mr: 1 }} />
                      Reset
                    </>
                  )}
                </Button>
              </form>
            </div>
          ) : ""}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <a
              href="#"
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '12px'
              }}
            >
              {isResetPassword || isLogin ? (
                <span onClick={handleSignUpState}>Create an Account</span>
              ) : ""}
            </a>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {isResetPassword || isSignUp ? (
                <>Have an account?</>
              ) : isLogin ? (
                <>Forgot Password?</>
              ) : ""}
              <a href="#" style={{ color: '#8b5cf6', fontWeight: 600 }}>
                {isResetPassword || isSignUp ? (
                  <span onClick={handleLoginState}> Login</span>
                ) : isLogin ? (
                  <span onClick={handleResetPasswordState}> Reset</span>
                ) : ""}
              </a>
            </p>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default LoginForm;