import { deleteUser, sendEmailVerification, updateProfile } from 'firebase/auth';
import { createStore } from "solid-js/store";
import { A, useNavigate } from '@solidjs/router';
import { For, createEffect, onMount } from 'solid-js';

import { UserSession } from '../../backend/serviceUserSession/userSessionModel';

import { userSignal } from '../common/userSignal';
import { fetchUserSessionGet } from '../backendService/serviceUser';

type SettingsStore = {
  user: {
    name: string | undefined;
    email: string | undefined;
    emailVerified: boolean | undefined;
  }
  userSessions: UserSession[] | undefined;
}

const defaultSettingsStore: SettingsStore = {
  user: {
    name: undefined,
    email: undefined,
    emailVerified: undefined,
  },
  userSessions: undefined,
}

export default function Settings() {
  const navigate = useNavigate();
  const [configStore, setConfigStore] = createStore(defaultSettingsStore);

  const updateUserProfile = async () => {
    updateProfile(userSignal(), {
      displayName: configStore.user.name,
    })
    .then(() => {
      alert("Profile updated")
    })
    .catch((err) => {
      console.error(err)
      alert("An error occurred. Please try again.")
    });
  }

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
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

  const fetchUserSession = async () => {
    const userSession = await fetchUserSessionGet(userSignal().uid);
    setConfigStore('userSessions', userSession);
  }

  onMount(() => {
    fetchUserSession();
    if (userSignal()) {
      setConfigStore('user', {
        name: userSignal().displayName,
        email: userSignal().email,
        emailVerified: userSignal().emailVerified,
      });
    }
  });

  return (
    <div
      class=""
    >
      <div
        class="flex flex-col pt-5 px-5 w-full items-center"
      >
        <div 
          class="flex flex-col items-center justify-center w-1/2"
        >
          <h1
            class="text-3xl font-display font-bold"
          >
            Settings
          </h1>
          <p
            class="text-sm mt-2"
          >
            Manage your account settings.
          </p>
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
                value={configStore.user.name}
                onInput={(e) => setConfigStore(prev => ({ ...prev, name: e.currentTarget.value }))}
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
                value={configStore.user.email}
                onInput={(e) => setConfigStore(prev => ({ ...prev, email: e.currentTarget.value }))}
                disabled
              />
            </label>
          </div>
          <div
            class="flex flex-col items-center justify-center w-full py-2"
          >
            <button
              class="flex items-center justify-center rounded-full text-white font-display bg-green-500 w-full my-2 py-2 disabled:bg-green-300 hover:bg-green-600 transition duration-300"
              onClick={updateUserProfile}
            >
              Save
            </button>
          </div>
          <div
            class="flex space-x-2 items-center justify-center w-full"
          >
            <A href="/forgot"
              class="text-sm mt-2 underline"
            >
              Change password
            </A>
            {!configStore.user.emailVerified &&
              <p
                onClick={() => sendEmailVerification(userSignal()).then(() => alert("Verification email sent"))}
                class="text-sm mt-2 underline"
              >
                Resend verification email
              </p>
            }
          </div>
        </div>
        <div
          class="flex flex-col items-end justify-center w-1/2"
        >
          <div
            class="flex flex-col items-center justify-end p-5"
          >
            <button type="submit"
              onClick={deleteAccount}
              class="flex items-center justify-center rounded-full text-white font-display bg-red-500 w-full my-2 py-2 disabled:bg-red-300 hover:bg-red-600 transition duration-300"
              >
              Delete Account
            </button>
            <p
              class="text-sm mt-2 text-red-500"
            >
              This action is irreversible.
            </p>
          </div>
        </div>
        <div
          class="flex flex-col items-center justify-center w-full"
        >
          <h1
            class="text-2xl font-bold"
          >
            Active Sessions
          </h1>
          <div
            class="flex flex-col items-center w-1/2"
          >
            {configStore.userSessions
              ? (
                <div
                  class="flex flex-col items-center w-full"
                >
                  <For
                    each={configStore.userSessions}
                    fallback={
                      <p
                        class="text-center"
                      >
                        No active sessions
                      </p>
                    }
                  >
                    {(session, index) => (
                      <div
                        class="grid grid-cols-7 items-center w-full border-b border-gray-300 py-2"
                      >
                        <div
                          class="grid grid-cols-2 col-span-5 bg-slate-300 items-center justify-center w-full"
                        >
                          <p>
                            Logged in at: {new Date(session.login_at).toLocaleString()}
                          </p>
                          <p>
                            Logged out at: {session.logout_at ? new Date(session.logout_at).toLocaleString() : "–"}
                          </p>
                        </div>
                      </div>
                    )}
                  </For>
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
    </div>
  );
}