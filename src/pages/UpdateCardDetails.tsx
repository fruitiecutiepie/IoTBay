import { createSignal } from 'solid-js';
import { useLocation, useNavigate } from '@solidjs/router';
import { addOrUpdatecarddetails } from '../CardDetails/authCardDetails';
import { CardDetail } from '../../dataTypes';
import { useContext } from 'solid-js';

function PaymentForm() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = createSignal('');
  const [holderName, setHolderName] = createSignal('');
  const [creditCardNumber, setCreditCardNumber] = createSignal('');
  const [confirmedCardNumber, setConfirmedCardNumber] = createSignal('');
  const [expiryDate, setExpiryDate] = createSignal('');
  const [billingAddress, setBillingAddress] = createSignal('');
  const [errors, setErrors] = createSignal({
    creditCard: '',
    expiryDate: ''
  });

const state = useLocation().state as CardDetail;  
  setPaymentMethod(state.paymentmethod);
  setHolderName(state.holdername);
  setCreditCardNumber((state.creditcardnumber).toString());
  setConfirmedCardNumber((state.confirmedcard).toString());
  setExpiryDate((state.expirydate).toString());
  setBillingAddress(state.billingaddress)
  console.log(state);


  const handleCreditCardChange = (e) => {
    setCreditCardNumber(e.target.value);
  };

  const handleConfirmedCardChange = (e) => {
    setConfirmedCardNumber(e.target.value);
    validateCreditCard(creditCardNumber(), e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
    validateExpiryDate(e.target.value);
  };

  const validateCreditCard = (creditCard, confirmedCard) => {
    if (creditCard.length !== 16 || confirmedCard.length !== 16) {
      setErrors(errors => ({ ...errors, creditCard: 'Check your card details and try again.' }));
    } else if (creditCard !== confirmedCard) {
      setErrors(errors => ({ ...errors, creditCard: 'Incorrect card details.' }));
    } else {
      setErrors(errors => ({ ...errors, creditCard: '' }));
    }
  };

  const validateExpiryDate = (expiryDate) => {
    if (expiryDate.length !== 4) {
      setErrors(errors => ({ ...errors, expiryDate: 'Incorrect expiry date.' }));
    } else {
      setErrors(errors => ({ ...errors, expiryDate: '' }));
    }
    if (expiryDate > 1230) {
      setErrors(errors => ({ ...errors, expiryDate: 'Expiry date cannot be higher than 12/30.' }));
    } else {
      setErrors(errors => ({ ...errors, expiryDate: '' }));
      setExpiryDate(expiryDate.toString());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any errors are present
    if (errors().creditCard || errors().expiryDate) {
      return;
    }

    const cardDetails:CardDetail = {
      paymentmethod: paymentMethod(),
      holdername: holderName(),
      creditcardnumber: parseInt(creditCardNumber(), 10),  
      confirmedcard: parseInt(confirmedCardNumber(), 10),
      expirydate: parseInt(expiryDate(),10),
      billingaddress: billingAddress(),
    }

    try {
      // Post card details to the server
      await addOrUpdatecarddetails(cardDetails);

      // Navigate to '/payments' after successful form submission
      navigate('/payments');
    } catch (error) {
      console.error('Error posting card details:', error);
      // Handle error
    }
  };

  return (
    <div class="p-8">
    <h1 class="text-2xl font-bold mt-4 flex justify-center">Credit card number = {creditCardNumber()} </h1>
    <form onSubmit={handleSubmit} class="max-w-md mx-auto">
        <div class="mb-4">
          <label class="text-gray-500" for="paymentMethod">Payment Method</label>
          <input
            type="text"
            id="paymentMethod"
            value={paymentMethod()}
            onInput={(e) => setPaymentMethod(e.target.value)}
            class="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            placeholder="Payment Method"
          />
        </div>
        <div class="mb-4">
          <label class="text-gray-500" for="holderName">Holder Name</label>
          <input
            type="text"
            id="holderName"
            value={holderName()}
            onInput={(e) => setHolderName(e.target.value)}
            class="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            placeholder="Holder Name"
          />
        </div>
        <div class="mb-4">
          <label class="text-gray-500" for="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate()}
            onInput={handleExpiryDateChange}
            class="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            placeholder="Expiry Date"
          />
          {errors().expiryDate && <p class="text-red-500">{errors().expiryDate}</p>}
        </div>
        <div class="mb-4">
          <label class="text-gray-500" for="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            value={billingAddress()}
            onInput={(e) => setBillingAddress(e.target.value)}
            class="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            placeholder="Billing Address"
          />
        </div>
        <button type="submit" onClick={handleSubmit} class="bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
          Re-Submit
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
