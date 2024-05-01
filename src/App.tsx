import { onCleanup, type Component } from 'solid-js';
import { Link, useNavigate, useRoutes } from '@solidjs/router';

import { routes } from './routes';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser, userSignal } from './common/userSignal';
import { auth } from './common/firebaseClientInit';
import { fetchAuthUserSessionInsertLogout } from './serviceAuth/authUserSession';
import { fetchAuthUserDelete, fetchAuthUserInsertOrUpdate } from './serviceAuth/authUser';

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
        console.error(err)
      });
  }

  const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchAuthUserInsertOrUpdate({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        email_verified: user.emailVerified,
      });
      setUser(user);
    } else {
      await fetchAuthUserSessionInsertLogout(userSignal().uid);
      await fetchAuthUserDelete();
      setUser(null);
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
            <li class="py-2 px-4">
                {/* <Link href="/test" class="no-underline hover:underline">
                  Test
                </Link> */}
              </li>
            {userSignal()
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
