import { deleteUser, sendEmailVerification, updateProfile } from 'firebase/auth';
import { createStore } from "solid-js/store";
import { A, useNavigate } from '@solidjs/router';
import { user } from '../common/userSignal';

export default function Settings() {
  const navigate = useNavigate();
  const [configStore, setConfigStore] = createStore({
    name: user().displayName,
    email: user().email,
    emailVerified: user().emailVerified,
  })
  
  const updateUserProfile = async () => {
    updateProfile(user(), {
      displayName: configStore.name,
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
      deleteUser(user())
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
                value={configStore.name}
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
                value={configStore.email}
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
            {!user().emailVerified &&
              <p
                onClick={() => sendEmailVerification(user()).then(() => alert("Verification email sent"))}
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
      </div>
    </div>
  );
}