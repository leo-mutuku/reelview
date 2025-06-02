import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './features/api/apiSlice';
import { setCredentials } from './features/auth/authSlice';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
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

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
    } catch (err) {
      console.error('Login failed:', err);
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
            backgroundImage: `url("/images/cinema1_03.jpg")`,
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
            Experience the <span style={{ color: '#a78bfa' }}>magic</span> of cinema
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
              Forgot your password?
            </a>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Don’t have an account?{' '}
              <a href="#" style={{ color: '#8b5cf6', fontWeight: 600 }}>
                Sign up
              </a>
            </p>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default LoginForm;
