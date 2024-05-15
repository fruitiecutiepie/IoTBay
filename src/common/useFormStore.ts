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
    payments: {
      paymentid: String,
      orderid: String,
      paymentmethod: String,
      creditcarddetails: Number,
      amount: Number,
      date: Date,
    },
    paymentsstore: {
      paymentmethod: String,
      holdername:String, 
      creditcardnumber: Number,
      confirmedcard: Number, 
      expirydate: Number,
      billingaddress: String, 
    },
    result: '',
  });

  return {
    formStore,
    setFormStore,
  };
}