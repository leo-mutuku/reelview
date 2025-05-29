import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './features/api/apiSlice';
import { setCredentials } from './features/auth/authSlice';
import {
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Fade,
  Slide
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed',
      padding: '20px',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    backgroundOrbs: {
      position: 'absolute' as const,
      inset: 0,
      overflow: 'hidden',
      zIndex: 1
    },
    orb1: {
      position: 'absolute' as const,
      top: '-160px',
      right: '-160px',
      width: '320px',
      height: '320px',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'float 6s ease-in-out infinite'
    },
    orb2: {
      position: 'absolute' as const,
      bottom: '-160px',
      left: '-160px',
      width: '320px',
      height: '320px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'float 8s ease-in-out infinite reverse'
    },
    orb3: {
      position: 'absolute' as const,
      top: '160px',
      left: '160px',
      width: '240px',
      height: '240px',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(40px)',
      animation: 'float 7s ease-in-out infinite'
    },
    loginCard: {
      position: 'relative' as const,
      zIndex: 10,
      maxWidth: '440px',
      width: '100%',
      padding: '40px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
      animation: 'slideUp 0.8s ease-out'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '40px'
    },
    iconContainer: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      borderRadius: '50%',
      margin: '0 auto 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
      animation: 'bounce 2s infinite'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '12px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '400'
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px'
    },
    inputField: {
      animation: 'fadeInLeft 0.6s ease-out'
    },
    submitButton: {
      height: '56px',
      borderRadius: '16px',
      fontSize: '18px',
      fontWeight: '600',
      textTransform: 'none' as const,
      background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
      transition: 'all 0.3s ease',
      animation: 'fadeInUp 0.6s ease-out 0.4s both'
    },
    submitButtonHover: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
      boxShadow: '0 15px 35px rgba(139, 92, 246, 0.5)',
      transform: 'translateY(-2px)'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    additionalLinks: {
      textAlign: 'center' as const,
      marginTop: '32px',
      animation: 'fadeIn 0.6s ease-out 0.6s both'
    },
    forgotPassword: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      cursor: 'pointer' as const,
      marginBottom: '12px',
      display: 'block'
    },
    signupText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px'
    },
    signupLink: {
      color: '#a78bfa',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      cursor: 'pointer' as const
    },
    errorAlert: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#fca5a5',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      animation: 'shake 0.5s ease-out'
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
      
      <div style={styles.container}>
        {/* Animated background elements */}
        <div style={styles.backgroundOrbs}>
          <div style={styles.orb1}></div>
          <div style={styles.orb2}></div>
          <div style={styles.orb3}></div>
        </div>

        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
          <Paper 
            elevation={0}
            style={styles.loginCard}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.iconContainer}>
                <LoginIcon style={{ color: 'white', fontSize: '36px' }} />
              </div>
              <h2 style={styles.title}>Welcome Back</h2>
              <p style={styles.subtitle}>Sign in to continue to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Email Field */}
              <Fade in={true} timeout={1000}>
                <div style={styles.inputField}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        </InputAdornment>
                      ),
                      style: { color: 'white' }
                    }}
                    InputLabelProps={{
                      style: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.3s ease'
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b5cf6',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8b5cf6',
                      },
                    }}
                  />
                </div>
              </Fade>

              {/* Password Field */}
              <Fade in={true} timeout={1200}>
                <div style={{...styles.inputField, animationDelay: '0.2s'}}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { color: 'white' }
                    }}
                    InputLabelProps={{
                      style: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.3s ease'
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b5cf6',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease'
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8b5cf6',
                      },
                    }}
                  />
                </div>
              </Fade>

              {/* Error Alert */}
              {error && (
                <Fade in={true}>
                  <Alert 
                    severity="error" 
                    sx={styles.errorAlert}
                  >
                    Login failed. Please check your credentials.
                  </Alert>
                </Fade>
              )}

              {/* Submit Button */}
              <Fade in={true} timeout={1400}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    ...styles.submitButton,
                    '&:hover': styles.submitButtonHover,
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  {isLoading ? (
                    <div style={styles.loadingContainer}>
                      <CircularProgress size={24} style={{ color: 'white' }} />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div style={styles.loadingContainer}>
                      <LoginIcon />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </Fade>

              {/* Additional Links */}
              <Fade in={true} timeout={1600}>
                <div style={styles.additionalLinks}>
                  <a 
                    href="#" 
                    style={styles.forgotPassword}
                    onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                    onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    Forgot your password?
                  </a>
                  <p style={styles.signupText}>
                    Don't have an account?{' '}
                    <a 
                      href="#" 
                      style={styles.signupLink}
                      onMouseOver={(e) => (e.target as HTMLElement).style.color = '#c4b5fd'}
                      onMouseOut={(e) => (e.target as HTMLElement).style.color = '#a78bfa'}
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </Fade>
            </form>
          </Paper>
        </Slide>
      </div>
    </>
  );
};

export default LoginForm;