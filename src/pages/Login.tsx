import { A, useNavigate } from "@solidjs/router";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../common/firebaseClientInit'
import useFormStore from "../common/useFormStore";

import { fetchAuthUserSessionInsertLogin } from "../serviceAuth/authUserSession";

export default function Login() {
  const navigate = useNavigate();
  const { formStore, setFormStore } = useFormStore();
  
  const signIn = () => {
    signInWithEmailAndPassword(auth, formStore.fields.email, formStore.fields.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await fetchAuthUserSessionInsertLogin(user.uid);
        navigate('/welcome');
      })
      .catch((err) => {
        console.error(`${err.code}: ${err.message}`);
        setFormStore(prev => ({ ...prev, errors: { ...prev.errors, submission: "Incorrect. Please try again." } }));
      });
  }

  return (
    <div
      class="flex flex-col pt-5 px-5 pb-safe"
    >
      <h1
        class="font-bold text-3xl text-center mb-4"
      >
        Welcome to IoTBay
      </h1>
      <div
        class="flex flex-col w-full h-full max-w-sm md:max-w-md lg:max-w-lg justify-center self-center"
      >
        <form action="javascript:void(0)" method="post">
          <div class="flex flex-col my-4 w-full">
            <div class="flex flex-col items-center">
              <input
                type="email"
                required
                placeholder={"Email address"}
                autocomplete="email"
                value={formStore.fields.email}
                onInput={(e) => setFormStore(prev => ({ ...prev, fields: { ...prev.fields, email: e.currentTarget.value } }))}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
              />
              <input
                type="password"
                required
                placeholder="Password"
                autocomplete="password"
                value={formStore.fields.password}
                onInput={(e) => setFormStore(prev => ({ ...prev, fields: { ...prev.fields, password: e.currentTarget.value } }))}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
              />
            </div>
            {formStore.errors.submission && <div class="text-sm mt-2 text-red-500">{formStore.errors.submission}</div>}
            <A
              href="/forgot"
              class="text-sm mt-2 self-end text-indigo-500 hover:underline transition duration-300"
            >
              Forgot password?
            </A>
          </div>
          <div 
            class="flex flex-col items-center"
          >
            <button type="submit"
              onClick={signIn}
              disabled={!formStore.fields.email || !formStore.fields.password}
              class="flex items-center justify-center rounded-full text-white bg-indigo-500 w-full my-4 py-3 disabled:bg-indigo-300 hover:bg-indigo-600 transition duration-300"
            >
              Log In
            </button>
          </div>
          <div
            class="flex flex-col w-full min-h-[3.5rem] justify-center text-sm mt-8 items-center"
          >
            <p
              class="w-full text-center"
            >
              Not a user yet? 
              <A href="/signup"
                class="text-indigo-500 hover:underline transition duration-300"
              >
                Create an account
              </A>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}