import { createStore } from "solid-js/store";

export default function useFormStore() {
  const [formStore, setFormStore] = createStore({
    fields: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    errors: {
      email: '',
      password: '',
      confirmPassword: '',
      submission: '',
      phone: '',
    },
    result: '',
  });

  return {
    formStore,
    setFormStore,
  };
}