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
    // Andrew's code start.
    searchCustomer: {
      name: '',
      phone: '',
      email: '',
    },
    searchStaff: {
      name: '',
      phone: '',
      email: '',
    },
    // Andrew's code end.
    result: '',
  });

  return {
    formStore,
    setFormStore,
  };
}