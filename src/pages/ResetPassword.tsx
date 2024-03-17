import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../common/firebaseClientInit'

import useFormStore from '../common/useFormStore';

export default function ResetPassword() {
  const { formStore, setFormStore } = useFormStore();
  
  const resetPassword = () => {
    sendPasswordResetEmail(auth, formStore.fields.email)
      .then(() => {
        setFormStore(prev => ({ ...prev, result: "Password reset link sent" }));
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
        setFormStore(prev => ({ ...prev, errors: { ...prev.errors, submission: "An error occurred. Please try again." } }));
      });
  }

  return (
    <div
      class="flex flex-col pt-5 px-5 pb-safe"
    >
      <h1
        class="font-display font-bold text-2xl text-center mb-2"
      >
        Reset Password
      </h1>
      <div
        class="flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg justify-center self-center"
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
                onInput={(e) => {
                  setFormStore(prev => ({ ...prev, fields: { ...prev.fields, email: e.currentTarget.value } }));
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.currentTarget.value)) {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, email: "Invalid email address" } }));
                  } else {
                    setFormStore(prev => ({ ...prev, errors: { ...prev.errors, email: "" } }));
                  }
                }}
                class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
              />
              {formStore.errors.email && <div class="text-sm mb-2 self-start text-red-500">{formStore.errors.email}</div>}
            </div>
            {formStore.errors.submission && <div class="text-sm mt-2 text-red-500">{formStore.errors.submission}</div>}
            {formStore.result && <div class="text-sm mt-2 text-green-500">{formStore.result}</div>}
          </div>
          <div 
            class="flex flex-col items-center"
            >
            <button type="submit"
              onClick={resetPassword}
              disabled={!formStore.fields.email || !!formStore.errors.email}
              class="flex items-center justify-center rounded-full text-white font-display bg-indigo-500 w-full my-4 py-3 disabled:bg-indigo-300 hover:bg-indigo-600 transition duration-300"
              >
              Send password reset link
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}