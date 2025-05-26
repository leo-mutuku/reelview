// reactRouterAdapter.ts
import { useNavigate, useLocation } from 'react-router-dom';
import type { Router } from '@toolpad/core';

export function useReactRouterAdapter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate(to) {
      // Convert URL object to string if needed
      const path = typeof to === 'string' ? to : to.toString();
      navigate(path);
    },
  };
}
