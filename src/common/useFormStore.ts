import { createStore } from "solid-js/store";

export default function useFormStore() {
  const [formStore, setFormStore] = createStore({
    fields: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {
      email: '',
      password: '',
      confirmPassword: '',
      submission: '',
    },
    result: '',
  });

  return {
    formStore,
    setFormStore,
  };
}