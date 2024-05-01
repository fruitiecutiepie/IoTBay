import { A } from "@solidjs/router";
import { useNavigate } from '@solidjs/router';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../common/firebaseClientInit'

import useFormStore from "../common/useFormStore";
import { fetchUserSessionInsertLogin } from "../backendService/serviceUser";

export default function SignUp() {
  const navigate = useNavigate();
  const { formStore, setFormStore } = useFormStore();

  const hasFormErrors = () => {
    return (!!formStore.errors.email || !!formStore.errors.password || !!formStore.errors.confirmPassword) ||
      (!formStore.fields.email || !formStore.fields.password || !formStore.fields.confirmPassword);
  }
  
  const signUp = () => {
    createUserWithEmailAndPassword(auth, formStore.fields.email, formStore.fields.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        
        await fetchUserSessionInsertLogin(user.uid);
        updateProfile(user, {
          displayName: formStore.fields.name,
        });

        sendEmailVerification(user);
        navigate('/welcome');
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
        if (err.code === 'auth/email-already-in-use') {
          setFormStore(prev => ({ ...prev, errors: { ...prev.errors, submission: "Account already exists. Please log in." } }));
        } else {
          setFormStore(prev => ({ ...prev, errors: { ...prev.errors, submission: "An error occurred. Please try again." } }));
        }
      });
  }

  return (
    <div
      class="flex flex-col pt-5 px-5 pb-safe"
    >
      <h1
        class="font-display font-bold text-2xl text-center mb-4"
      >
        Register for IoTBay
      </h1>
      <div
        class="flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg justify-center self-center"
      >
        <form action="javascript:void(0)" method="post">
          <div class="flex flex-col my-4 w-full">
            <div class="flex flex-col items-center">
              <input
                type="text"
                required
                placeholder={"Full name"}
                autocomplete="name"
                value={formStore.fields.name}
                onInput={(e) => setFormStore(prev => ({ ...prev, fields: { ...prev.fields, name: e.currentTarget.value } }))}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
              />
              <input
                type="email"
                required
                placeholder={"Email address"}
                autocomplete="email"
                value={formStore.fields.email}
                onInput={(e) => {
                  setFormStore(prev => ({ ...prev, fields: { ...prev.fields, email: e.currentTarget.value } }));
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.currentTarget.value)) {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, email: "Invalid email address" } }));
                  } else {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, email: "" } }));
                  }
                }}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none border focus:border-indigo-500 autofill:bg-transparent"
                />
              {formStore.errors.email && <div class="text-sm mb-2 self-start text-red-500">{formStore.errors.email}</div>}
              <input
                type="password"
                required
                placeholder="Password"
                autocomplete="password"
                value={formStore.fields.password}
                onInput={(e) => {
                  setFormStore(prev => ({ ...prev, fields: { ...prev.fields, password: e.currentTarget.value } }));
                  if (e.currentTarget.value.length < 8 ||
                    !/[A-Z]/.test(e.currentTarget.value) ||
                    !/[a-z]/.test(e.currentTarget.value) ||
                    !/[0-9]/.test(e.currentTarget.value) ||
                    !/[!@#$%^&*]/.test(e.currentTarget.value)) {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, password: "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character" } }));
                  } else {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, password: "" } }));
                  }

                  if (formStore.fields.password !== formStore.fields.confirmPassword) {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, confirmPassword: "Passwords must match" } }));
                  } else {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, confirmPassword: "" } }));
                  }
                }}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500"
              />
              {formStore.errors.password && <div class="text-sm mb-2 self-start text-red-500">{formStore.errors.password}</div>}
              <input
                type="password"
                required
                placeholder="Confirm password"
                autocomplete="password"
                value={formStore.fields.confirmPassword}
                onInput={(e) => {
                  setFormStore(prev => ({ ...prev, fields: { ...prev.fields, confirmPassword: e.currentTarget.value } }));
                  if (formStore.fields.password !== formStore.fields.confirmPassword) {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, confirmPassword: "Passwords must match" } }));
                  } else {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, confirmPassword: "" } }));
                  }
                }}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500"
              />
              {formStore.errors.confirmPassword && <div class="text-sm mb-2 self-start text-red-500">{formStore.errors.confirmPassword}</div>}
            </div>
            {formStore.errors.submission && <div class="text-sm mt-2 text-red-500">{formStore.errors.submission}</div>}
          </div>
          <div 
            class="flex flex-col items-center"
          >
            <button type="submit"
              onClick={signUp}
              disabled={hasFormErrors()}
              class="flex items-center justify-center rounded-full text-white font-display bg-indigo-500 w-full my-4 py-3 disabled:bg-indigo-300 hover:bg-indigo-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
          <div
              class="flex flex-col w-full min-h-[3.5rem] justify-center text-sm mt-8 items-center"
            >
              <p
                class="w-full text-center"
              >
                Already a user? 
                <A href="/login"
                  class="text-indigo-500"
                >
                  Log in
                </A>
              </p>
            </div>
        </form>
      </div>
    </div>
  )
}