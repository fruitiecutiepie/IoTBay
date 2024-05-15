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
    path: '/ordermanagement',
    component: lazy(() => import('./pages/OrderManagement')),
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
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
