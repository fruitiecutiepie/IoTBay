import { deleteUser, sendEmailVerification, updateProfile } from 'firebase/auth';
import { createStore } from "solid-js/store";
import { A, useNavigate } from '@solidjs/router';
import { createEffect, For, onMount } from 'solid-js';

import { userSignal } from '../common/userSignal';
import { User, UserSession } from '../../dataTypes';
import { fetchAuthUserGet, fetchAuthUserInsertOrUpdate } from '../serviceAuth/authUser';
import { fetchAuthUserSessionGet } from '../serviceAuth/authUserSession';

type SettingsStore = {
  user: User | undefined;
  userSessions: UserSession[] | undefined;

  searchQuery: string | undefined;
}

const defaultSettingsStore: SettingsStore = {
  user: undefined,
  userSessions: undefined,

  searchQuery: "",
}

export default function Settings() {
  const navigate = useNavigate();
  const [configStore, setConfigStore] = createStore(defaultSettingsStore);
  
  const updateUserProfile = async () => {
    updateProfile(userSignal(), {
      displayName: configStore.user.name,
    })
    .then(async () => {
      alert("Profile updated")

      await fetchAuthUserInsertOrUpdate({
        uid: configStore.user.uid,
        name: configStore.user.name || '',
        email: configStore.user.email,
        email_verified: userSignal().emailVerified,
      });
      const user = await fetchAuthUserGet();
      setConfigStore('user', user);
    })
    .catch((err) => {
      console.error(err)
      alert("An error occurred. Please try again.")
    });
  }

  const sendVerificationEmail = () => {
    if (window.confirm("Do you want to resend the verification email?")) {
      sendEmailVerification(userSignal())
        .then(() => {
          alert("Verification email sent")
        })
        .catch((err) => {
          console.error(err)
          alert("An error occurred. Please try again.")
        });
    }
  }

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      deleteUser(userSignal())
        .then(() => {
          console.log("Account deleted")
          navigate('/');
        })
        .catch((err) => {
          console.error(err)
          alert("An error occurred. Please try again.")
        });
    }
  }

  const fetchUserSessions = async (uid: string) => {
    const userSession = await fetchAuthUserSessionGet(uid);
    setConfigStore('userSessions', userSession);
  }

  const filteredUserSessions = () => {
    return configStore.searchQuery
      ? configStore.userSessions.filter(session =>
        new Date(session.login_at).getDate() === new Date(configStore.searchQuery).getDate()
        || (session.logout_at && new Date(session.logout_at).getDate() === new Date(configStore.searchQuery).getDate())
      )
      : configStore.userSessions;
  }

  onMount(async () => {
    const user = await fetchAuthUserGet();
    if (user) {
      setConfigStore('user', user);
    }

    fetchUserSessions(configStore.user.uid);
  });

  createEffect(() => {
    console.log(configStore.user);
  })

  return (
    <div
      class="flex flex-col items-center justify-center"
    >
      <div
        class="flex flex-col p-5 w-full items-center"
      >
        <div 
          class="flex flex-col items-center justify-center w-full max-w-2xl"
        >
          <h1
            class="text-3xl font-bold"
          >
            Settings
          </h1>
          <div
            class="flex flex-col px-5 py-2 space-y-2 rounded-lg mt-5 w-full"
          >
            <label
              class="flex space-x-2"
            >
              <span
                class="font-bold"
              >
                Name: 
              </span>
              <input
                type="text"
                class="border border-gray-300 rounded-md w-full px-2"
                value={configStore.user && configStore.user.name}
                onInput={(e) => setConfigStore("user", "name", e.currentTarget.value)}
              />
            </label>
            <label
              class="flex space-x-2"
            >
              <span
                class="font-bold"
              >
                Email: 
              </span>
              <input
                type="email"
                class="border border-gray-300 rounded-md w-full px-2"
                value={configStore.user && configStore.user.email}
                onInput={(e) => setConfigStore("user", "email", e.currentTarget.value)}
                disabled
              />
            </label>
          </div>
          <div
            class="flex flex-col items-center justify-center w-full py-2"
          >
            <button
              class="flex items-center justify-center rounded-full text-white bg-indigo-500 w-1/2 mt-4 py-3 disabled:bg-indigo-300 hover:bg-indigo-600 transition duration-300"
              onClick={updateUserProfile}
            >
              Save
            </button>
          </div>
          <div
            class="flex space-x-2 items-center justify-center w-full pt-2 pb-4"
          >
            <A
              href="/forgot"
              class="text-sm text-indigo-500 hover:underline transition duration-300"
            >
              Change password
            </A>
            {configStore.user && configStore.user.email_verified &&
              <>
                <span
                  class="text-sm"
                >
                  |
                </span>
                <A
                  href="#"
                  onClick={sendVerificationEmail}
                  class="text-sm text-indigo-500 hover:underline transition duration-300"
                >
                  Resend verification email
                </A>
              </>
            }
            <span
              class="text-sm"
            >
              |
            </span>
            <A
              href="#"
              onClick={deleteAccount}
              class="text-sm text-indigo-500 hover:underline transition duration-300"
            >
              Delete account
            </A>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-center p-5 w-full max-w-4xl border-t"
      >
        <h1
          class="text-xl font-bold py-5"
        >
          Access Logs
        </h1>
        <div
          class="flex flex-col items-center w-3/4"
        >
          {configStore.userSessions
            ? (
              <div
                class="flex flex-col items-center justify-center space-y-2 w-full max-w-2xl py-2"
              >
                <div
                  class="flex items-center w-full justify-center"
                >
                  <label
                    class="flex items-center w-full justify-center py-2 space-x-2"
                  >
                    <p
                      class="font-bold w-40"
                    >
                      Filter by Date:
                    </p>
                    <input
                      type="date"
                      class="border border-gray-300 rounded-md w-full px-2"
                      value={configStore.searchQuery}
                      onInput={(e) => setConfigStore('searchQuery', e.currentTarget.value)}
                    />
                  </label>
                </div>
                <div
                  class="grid grid-cols-2 space-y-2 items-center justify-center w-full"
                >
                  <div
                    class="grid grid-cols-2 col-span-2 w-full border-b border-gray-300"
                  >
                    <p
                      class="font-bold py-2"
                    >
                      Login At
                    </p>
                    <p
                      class="font-bold py-2"
                    >
                      Logout At
                    </p>
                  </div>
                  <For
                    each={filteredUserSessions()}
                    fallback={
                      <>
                        <p>
                          No sessions found.
                        </p>
                      </>
                    }
                  >
                    {(session, index) => (
                      <>
                        <p
                          class="-ml-4"
                        >
                          <b>{index() + 1}. </b>{new Date(session.login_at).toLocaleString()}
                        </p>
                        <p>
                          {session.logout_at ? new Date(session.logout_at).toLocaleString() : "–"}
                        </p>
                      </>
                    )}
                  </For>
                </div>
              </div>
            )
            :
            <p
              class="text-center"
            >
              Loading...
            </p>
          }
        </div>
      </div>
    </div>
  );
}