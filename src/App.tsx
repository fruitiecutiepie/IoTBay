import { onCleanup, type Component, onMount } from 'solid-js';
import { Link, useNavigate, useRoutes } from '@solidjs/router';

import { routes } from './routes';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser, user } from './common/userSignal';
import { auth } from './common/firebaseClientInit';

const App: Component = () => {
  const Route = useRoutes(routes);
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log('User is signed in');
      console.log(user);
    } else {
      setUser(null);
      console.log('User is signed out');
      console.log(user);
    }
  });

  onCleanup(() => {
    unsub();
  })

  return (
    <>
      <nav class="text-gray-900 px-4 pt-3">
        <ul class="flex items-center justify-between">
          <div>
            <Link href="/" class="no-underline hover:underline">
              <h1 class="font-display font-bold text-4xl">
                IoTBay
              </h1>
            </Link>
          </div>
          <div
            class="flex items-center"
          >
            {user()
              ? (
                <>
                  <li class="py-2 px-4">
                    <Link href="/settings" class="no-underline hover:underline">
                      Settings
                    </Link>
                  </li>
                  <li class="py-2 px-4">
                    <button type="submit"
                      onClick={logOut}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )
              :
              <li class="py-2 px-4">
                <Link href="/login" class="no-underline hover:underline">
                  Login
                </Link>
              </li>
            }
          </div>
        </ul>
      </nav>

      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
