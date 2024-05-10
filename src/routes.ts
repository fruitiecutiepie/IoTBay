import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/Home';
import Settings from './pages/Settings';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/welcome',
    component: lazy(() => import('./pages/Welcome')),
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/login',
    component: lazy(() => import('./pages/Login')),
  },
  {
    path: '/signup',
    component: lazy(() => import('./pages/SignUp')),
  },
  {
<<<<<<< HEAD
=======
    path: '/adminpanel', // route path to admin panel
    component: lazy(() => import('./pages/AdminPanel')),
  }, 
  {
    path: '/customer', // route path to customer management page
    component: lazy(() => import('./pages/Customer')),
  },
  {
>>>>>>> 02e4a66 (Julian)
    path: '/forgot',
    component: lazy(() => import('./pages/ResetPassword')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
<<<<<<< HEAD
=======
  
>>>>>>> 02e4a66 (Julian)
];
