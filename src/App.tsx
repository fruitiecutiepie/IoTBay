import { onCleanup, onMount, type Component } from 'solid-js';
import { Link, useNavigate, useRoutes } from '@solidjs/router';

import { routes } from './routes';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser } from './common/userSignal';
import { auth } from './common/firebaseClientInit';
import { fetchAuthUserSessionInsertLogin, fetchAuthUserSessionInsertLogout } from './serviceAuth/authUserSession';
import { fetchAuthUserDelete, fetchAuthUserGet, fetchAuthUserInsertOrUpdate } from './serviceAuth/authUser';
import { User } from '../dataTypes';
import { createStore } from 'solid-js/store';

type AppStore = {
  user: User | undefined;
}

const defaultAppStore: AppStore = {
  user: undefined,
}

const App: Component = () => {
  const Route = useRoutes(routes);
  const navigate = useNavigate();

  const [configStore, setConfigStore] = createStore(defaultAppStore);

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
        name: user.displayName || '',
        email: user.email,
        email_verified: user.emailVerified,
      });
      await fetchAuthUserSessionInsertLogin(user.uid);
      setUser(user);
    } else {
      await fetchAuthUserSessionInsertLogout(configStore.user.uid);
      await fetchAuthUserDelete();
      setUser(null);
    }
  });

  onMount(async () => {
    const user = await fetchAuthUserGet();
    if (user) {
      setConfigStore('user', user);
    }
  });

  onCleanup(() => {
    unsub();
  })

  return (
    <>
      <nav
        class="text-gray-900 px-7 pt-5"
      >
        <ul
          class="flex items-center justify-between"
        >
          <div>
            <Link
              href="/"
            >
              <h1
                class="font-bold font-serif text-3xl hover:text-indigo-600"
              >
                IoTBay
              </h1>
            </Link>
          </div>
          <div
            class="flex items-center"
          >
            <li
              class="py-2 px-4"
            >
                {/* <Link href="/test" class="no-underline hover:underline">
                  Test
                </Link> */}
              </li>
            {configStore.user
              ? (
                <>
                  <li class="py-2 px-4">
                    <Link href="/settings" class="no-underline hover:underline">
                      Settings
                    </Link>
                  </li>
                  <li class="py-2 px-4">
                    <button type="submit"
                      class="no-underline hover:underline"
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
