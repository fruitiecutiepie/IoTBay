import { Link, useNavigate } from '@solidjs/router';
import { onMount, createSignal, useContext, createEffect } from 'solid-js';
import { fetchAllcarddetails, addOrUpdatecarddetails, deletecarddetails, fetchAllpayments } from '../CardDetails/authCardDetails';
import { SharedObjectContext } from '../common/Sharedstore';

export default function Home() {
  const [payments, setPayments] = createSignal([]);
  const [cardDetails, setCardDetails] = createSignal([]);
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedCard, setSelectedCard] = createSignal<number | undefined>();
  const { object, setObject } = useContext(SharedObjectContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    
    navigate('/updatecarddetails',{state: cardDetails()[selectedCard()]}) ;
  };

  onMount(async () => {
    try {
      // Fetch saved payment details from the fetch handler
      const paymentsData = await fetchAllpayments();
      setPayments(paymentsData);

      // Fetch card details from the fetch handler
      const cardDetailsData = await fetchAllcarddetails();
      setCardDetails(cardDetailsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  });

  const handleDeleteCardDetails = async () => {
    try {
      await deletecarddetails();
      // Refetch card details after deletion
      const updatedCardDetails = await fetchAllcarddetails();
      setCardDetails(updatedCardDetails);
    } catch (error) {
      console.error('Error deleting card details:', error);
      // Handle error
    }
  };

  const Handleupdate = async () => {
    handleNavigate();
  } 

  const handleSelectCard = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <div class="text-gray-700 p-8">
      <div class="flex justify-between mb-4">
        <div>
          <h1 class="text-xl font-semibold">Saved Payment Details</h1>
        </div>
        <div class="flex items-center space-x-2">
          <Link href="/carddetails">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-lg">Add Card Details</button>
          </Link>
        </div>
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          placeholder="Search by payment ID or by date"
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table class="table-auto w-full mb-8">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">Payment ID</th>
            <th class="border border-gray-300 px-4 py-2">Order ID</th>
            <th class="border border-gray-300 px-4 py-2">Payment Method</th>
            <th class="border border-gray-300 px-4 py-2">Credit Card Details</th>
            <th class="border border-gray-300 px-4 py-2">Amount</th>
            <th class="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments().map(payment => (
            <tr>
              <td class="border border-gray-300 px-4 py-2">{payment.paymentid}</td>
              <td class="border border-gray-300 px-4 py-2">{payment.orderid}</td>
              <td class="border border-gray-300 px-4 py-2">{payment.paymentmethod}</td>
              <td class="border border-gray-300 px-4 py-2">{payment.creditcarddetails}</td>
              <td class="border border-gray-300 px-4 py-2">{payment.amount}</td>
              <td class="border border-gray-300 px-4 py-2">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div class="flex justify-between mb-4">
        <h1 class="text-xl font-semibold">Saved Card Details</h1>
        <div class="flex items-center space-x-2">
          <Link href="/updatecarddetails">
            <button onClick = {Handleupdate} class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-lg">Update</button>
          </Link>
          <button onClick={handleDeleteCardDetails} class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg">Delete</button>
        </div>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">Payment Method</th>
            <th class="border border-gray-300 px-4 py-2">Holder Name</th>
            <th class="border border-gray-300 px-4 py-2">Credit Card Number</th>
            <th class="border border-gray-300 px-4 py-2">Confirmed Card Number</th>
            <th class="border border-gray-300 px-4 py-2">Expiry Date</th>
            <th class="border border-gray-300 px-4 py-2">Billing Address</th>
          </tr>
        </thead>
        <tbody>
          {cardDetails().map((card, index) => (
            <tr class={selectedCard() === index ? 'bg-blue-100' : 'hover:bg-gray-50 cursor-pointer'} onClick={() => handleSelectCard(index)}>
              <td class="border border-gray-300 px-4 py-2">{card.paymentmethod}</td>
              <td class="border border-gray-300 px-4 py-2">{card.holdername}</td>
              <td class="border border-gray-300 px-4 py-2">{card.creditcardnumber}</td>
              <td class="border border-gray-300 px-4 py-2">{card.confirmedcard}</td>
              <td class="border border-gray-300 px-4 py-2">{card.expirydate}</td>
              <td class="border border-gray-300 px-4 py-2">{card.billingaddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
