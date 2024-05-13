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
    path: '/forgot',
    component: lazy(() => import('./pages/ResetPassword')),
  },
  {
    path: '/admin',
    component: lazy(() => import('./pages/SysAdmin/AdminHome')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
