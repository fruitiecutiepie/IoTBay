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