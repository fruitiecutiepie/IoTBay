import { createStore } from "solid-js/store";

export default function paymentsStore() {
  const [formStore, setFormStore] = createStore({
    Payments: {
      paymentid: '',
      orderid: '',
      paymentmethod: '',
      creditcarddetails: '',
      amount: '',
      date: '',
    },
    CardDetails: {
      paymentmethod: '',
      holdername: '', 
      creditcardnumber: 0,
      confirmedcard: 0, 
      expirydate: 0,
      billingaddress: '', 
    },
    result: '',
  });

  return {
    formStore,
    setFormStore,
  };
}