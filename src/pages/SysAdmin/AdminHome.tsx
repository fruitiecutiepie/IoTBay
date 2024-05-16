// VIEW // Andrew's Code

import { A, useNavigate } from "@solidjs/router";
import { For, Show, onMount, createSignal } from 'solid-js';
import { User, UserNumber } from '../../../dataTypes';
import { createStore } from 'solid-js/store';
import { fetchAuthUserGet } from '../../serviceAuth/authUser';
import { fetchAddStaffUID, fetchDeleteStaffUID, fetchStaffUIDAuth } from "../../serviceAdmin/staffUID";
import { fetchAddUser, fetchDeleteUser, fetchDisableUser, fetchIsUserDisabled, fetchUpdateUser, fetchUserList } from "../../serviceAdmin/staffList";
import { fetchAddUserNumber, fetchUserNumberGetAll } from "../../serviceAdmin/userNumber";
import useFormStore from "../../common/useFormStore";
import { password } from "bun";

// This contains all the information we might want to access or update from the html.
type AdminHomeStore = {
  user: User | undefined;
  userStaffType: string | undefined;
  staffList: User[] | undefined;
  customerList: User[] | undefined;
  phoneNumberList: UserNumber[] | undefined;
  inactiveCustomers: string[] | undefined;
  inactiveStaff: string[] | undefined;
}

// Provides default values so we can create the 'store'.
const defaultAdminHomeStore: AdminHomeStore = {
  user: undefined,
  userStaffType: undefined,
  staffList: undefined,
  customerList: undefined,
  phoneNumberList: undefined,
  inactiveCustomers: undefined,
  inactiveStaff: undefined
}

export default function AdminHome() {
  // These are all solidjs components for easy data management.
  const [configStore, setConfigStore] = createStore(defaultAdminHomeStore); // Create's the specified store from the default values.
  // Signals are similar to stores but typically only store one variable.
  const [selectedCustomer, setSelectedCustomer] = createSignal<User | undefined>(); // Stores the customer currently selected in the table.
  const [selectedStaff, setSelectedStaff] = createSignal<User | undefined>(); // Stores the staff member currently selected in the table.
  const [uidToUpdate, setUidToUpdate] = createSignal<string | undefined>(); // Stores the UID of a user being updated.
  const { formStore, setFormStore } = useFormStore(); // Handles the information from any inputs on the page.

  const hasFormErrors = () => { // Returns true if the inputs are valid and false if they aren't
    return (!!formStore.errors.email || !!formStore.errors.phone || !!formStore.errors.password) ||
      (!formStore.fields.email || !formStore.fields.phone || !formStore.fields.password);
  }
  const hasUpdateFormErrors = () => { // Same as hasFormErrors, but excludes the password as we don't want that to be updated so easily.
    return (!!formStore.errors.email || !!formStore.errors.phone) ||
      (!formStore.fields.email || !formStore.fields.phone);
  }

  // This refreshes most of the stores and signals on the page without actually having to refresh the page.
  // This is also mostly where the view interfaces with the controller.
  async function configInit() {
    const user = await fetchAuthUserGet();
    setConfigStore('user', user); // Stores the user browsing the website..

    const phoneNumberList = await fetchUserNumberGetAll();
    setConfigStore('phoneNumberList', phoneNumberList); // Stores every single phone number from the database.

    const staffList = await filterStaff();
    const customerList = await filterCustomers();

    // Because fetchIsUserDisabled is async, it is best to use map() instead of forEach() to find which accounts are deactivated.
    const inactiveCustomersPromises = customerList.map(async (customer) => {
      var isDisabled = false;
      if (customer.uid)
        isDisabled = await fetchIsUserDisabled(customer.uid);
      //console.log(isDisabled);
      return isDisabled ? customer.uid : null;
    });
    const inactiveCustomers = (await Promise.all(inactiveCustomersPromises)).filter(uid => uid !== null);
    setConfigStore('inactiveCustomers', inactiveCustomers); // Stores all the inactive customer account UIDs.

    
    const inactiveStaffPromises = staffList.map(async (staff) => {
      const isDisabled = await fetchIsUserDisabled(staff.uid);
      return isDisabled ? staff.uid : null;
    });
    const inactiveStaff = (await Promise.all(inactiveStaffPromises)).filter(uid => uid !== null);
    setConfigStore('inactiveStaff', inactiveStaff); // Stores all the inactive staff account UIDs.

    // Checks if the user is an admin or sysadmin.
    const isAdmin = await fetchStaffUIDAuth(configStore.user.uid, "Admin");
    const isSysAdmin = await fetchStaffUIDAuth(configStore.user.uid, "SysAdmin");

    // Stores the user's administrator status.
    if (isAdmin) {
      setConfigStore('userStaffType', "Admin");
    }
    if (isSysAdmin) {
      setConfigStore('userStaffType', "SysAdmin");
    }
    else {
      setConfigStore('userStaffType', "User");
    }
  }

  onMount(async () => { // Runs when the page first renders.
    await configInit(); 
  });

  // Filters each customer depending on the search parameters.
  const filterCustomers = async (): Promise<User[]> => {
    const list = await fetchUserList("customer");
    var filteredList: User[] = new Array;

    list.forEach(customer => {
      // This finds the phone number if it has a corresponding UID.
      const customerPhone = configStore.phoneNumberList.find((u) => u.uid === customer.uid)?.number ?? "No Phone Number Found";
      if (customer.name.toLowerCase().includes(formStore.searchCustomer.name.toLowerCase()) && 
            customer.email.toLowerCase().includes(formStore.searchCustomer.email.toLowerCase()) &&
            customerPhone.toLowerCase().includes(formStore.searchCustomer.phone.toLowerCase())) {
        
        filteredList.push(customer);
      }
    });

    setConfigStore('customerList', filteredList);
    return filteredList;
  }

  // Filter's each staff member depending on the search parameters.
  const filterStaff = async (): Promise<User[]> => {
    const list = await fetchUserList("staff");
    var filteredList: User[] = new Array;

    list.forEach(staff => {
      const staffPhone = configStore.phoneNumberList.find((u) => u.uid === staff.uid)?.number ?? "No Phone Number Found";
      if (staff.name.toLowerCase().includes(formStore.searchStaff.name.toLowerCase()) && 
            staff.email.toLowerCase().includes(formStore.searchStaff.email.toLowerCase()) &&
            staffPhone.toLowerCase().includes(formStore.searchStaff.phone.toLowerCase())) {
        
        filteredList.push(staff);
      }
    });

    setConfigStore('staffList', filteredList);
    return filteredList;
  }

  // Used to handle the selection of customer's in the table in the UI.
  const setCustomer = (user: User) => {
    if (selectedCustomer()?.uid === user.uid) {
      setSelectedCustomer(undefined);
    }
    else {
      setSelectedCustomer(user);
    }
  }
  
  // Used to handle the selection of staff in the table in the UI.
  const setStaff = (user: User) => {
    if (selectedStaff()?.uid === user.uid) {
      setSelectedStaff(undefined);
    }
    else {
      setSelectedStaff(user);
    }
  }

  // Resets the add/update user form on the bottom of the page.
  const refreshForm = () => {
    setFormStore(prev => ({ ...prev, fields: { name: "", email: "", password: "", confirmPassword: "", phone: "" } }));
    setUidToUpdate(undefined);
  }

  /*************************************************************
    The remaining functions respond to user input from the UI.
  *************************************************************/

  // Add's a user to firebase and sets up their phone number in the database.
  const addUser = async () => {
    // Create a new user and populate it's fields with values from the formStore.
    var user: User = {
      uid: "0", // This is unused in this method - firebase assignes a uid later.
      name: formStore.fields.name,
      email: formStore.fields.email,
      email_verified: true, // Not really verified, but it can be assumed the SysAdmin is inputting valid emails.
    };
    const uid = await fetchAddUser(user, formStore.fields.password); // Add's the user to firebase and returns it's UID.
    //console.log("Adding number " + formStore.fields.phone + " to " + uid );
    await fetchAddUserNumber(uid, formStore.fields.phone); // The uid is used to store the user's phone number in the database.
    await configInit();
    refreshForm();
  }

  // These expressions populate the text entries with existing values that might be updated.
  const startUpdateUser = () => {
    setUidToUpdate(selectedCustomer().uid);
    const customerPhone = configStore.phoneNumberList.find((u) => u.uid === selectedCustomer().uid)?.number ?? "";
    setFormStore(prev => ({ ...prev, fields: { name: selectedCustomer().name, email: selectedCustomer().email, password: "", confirmPassword: "", phone: customerPhone } }));
  }
  const startUpdateStaff = () => {
    setUidToUpdate(selectedStaff().uid);
    const customerPhone = configStore.phoneNumberList.find((u) => u.uid === selectedStaff().uid)?.number ?? "";
    setFormStore(prev => ({ ...prev, fields: { name: selectedStaff().name, email: selectedStaff().email, password: "", confirmPassword: "", phone: customerPhone } }));
  }

  // Updates the user info on firebase and also updates their phone number in the database.
  const updateUser = async () => {
    const uid = uidToUpdate();
    var user: User = {
      uid: uid,
      name: formStore.fields.name,
      email: formStore.fields.email,
      email_verified: true,
    };
    await fetchUpdateUser(user);
    await fetchAddUserNumber(uid, formStore.fields.phone);
    await configInit();
    refreshForm();
  }

  // Add's the selected user's uid to the staffUID list in the database.
  const promoteStaff = async () => {
    await fetchAddStaffUID(selectedCustomer().uid);
    await configInit();
  };

  // Deactivates a user's account on firebase.
  const deactivateUser = async () => {
    await fetchDisableUser(selectedCustomer().uid, true);
    await configInit();
  }

  // Activates a user's account on firebase.
  const activateUser = async () => {
    await fetchDisableUser(selectedCustomer().uid, false);
    await configInit();
  }

  // Deletes a user's account on firebase.
  const deleteUser = async() => {
    await fetchDeleteUser(selectedCustomer().uid)
    await configInit();
  };

  // Remove's the selected staff member's uid from the staffUID list in the database.
  const demoteStaff = async() => {
    await fetchDeleteStaffUID(selectedStaff().uid)
    await configInit();
  }

  // Deactivates a staff member's account on firebase.
  const deactivateStaff = async () => {
    await fetchDisableUser(selectedStaff().uid, true);
    await configInit();
  }

  // Activates a staff member's account on firebase.
  const activateStaff = async () => {
    await fetchDisableUser(selectedStaff().uid, false);
    await configInit();
  }

  // Deletes a staff member's account on firebase.
  const deleteStaff = async () => {
    await fetchDeleteUser(selectedStaff().uid)
    await configInit();
  }

  // Start of HTML code.
  return (
    <div class="text-gray-700 p-8 flex flex-col justify-center items-center">
      {
        configStore.userStaffType==="SysAdmin" ? (
          <>
            <div class="flex justify-center items-start space-x-8 px-8 py-4">
              <div class="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <div class="text-center text-2xl font-bold text-gray-700 mb-4">
                  Customer List
                </div>
                <div class="relative overflow-x-auto overflow-y-auto" style="width: 30vw; height: 30vh">
                  <div class="table w-full border-collapse">
                    <div class="table-header-group bg-gray-100">
                      <div class="table-row">
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Name</div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Email</div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Phone Number</div>
                      </div>
                    </div>
                    <div class="table-header-group bg-gray-100">
                      <div class="table-row">
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">
                          <input
                            type="text"
                            required
                            placeholder={"Search Name"}
                            autocomplete="name"
                            value={formStore.searchCustomer.name} // Set to the value currently in the formstore.
                            // This onInput sets the value in the formstore and then calls filterCustomers() which filters the customers base on that value.
                            onInput={(e) => { setFormStore(prev => ({ ...prev, searchCustomer: { ...prev.searchCustomer, name: e.currentTarget.value } })); filterCustomers() }}
                            class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
                          />
                        </div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">
                          <input
                            type="text"
                            required
                            placeholder={"Search Email"}
                            autocomplete="email"
                            value={formStore.searchCustomer.email}
                            onInput={(e) => { setFormStore(prev => ({ ...prev, searchCustomer: { ...prev.searchCustomer, email: e.currentTarget.value } })); filterCustomers() }}
                            class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
                          />
                        </div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">
                          <input
                            type="text"
                            required
                            placeholder={"Search Phone"}
                            autocomplete="phone"
                            value={formStore.searchCustomer.phone}
                            onInput={(e) => { setFormStore(prev => ({ ...prev, searchCustomer: { ...prev.searchCustomer, phone: e.currentTarget.value } })); filterCustomers() }}
                            class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="table-row-group">
                      <For each={configStore.customerList} fallback={<div>Loading...</div>}>
                        {(user, index) => { // A for loop html component to handle displaying user information.
                          const userPhone = configStore.phoneNumberList.find((u) => u.uid === user.uid)?.number ?? 'No Phone Number Found';
                          return (
                            // Handles the selection of users.
                            <div class={`table-row ${selectedCustomer()?.uid === user.uid ? 'bg-blue-100' : 'hover:bg-gray-50'}
                                cursor-pointer`} onClick={() => {setCustomer(user); configInit();}}> 
                              <div class="table-cell px-4 py-2 border-t">{user.name}</div>
                              <div class="table-cell px-4 py-2 border-t">{user.email}</div>
                              <div class="table-cell px-4 py-2 border-t">{userPhone}</div>
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                </div>
                  <div class="flex justify-between mt-4">
                    {/* If a customer is not selected, all the buttons will be greyed out and unselectable. */}
                    <button class={`flex-1 mx-2 text-sm font-semibold text-blue-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-blue-800'} shadow`}
                      disabled={selectedCustomer() === undefined} onClick={startUpdateUser}>Update User</button>
                    <button class={`flex-1 mx-2 text-sm font-semibold text-yellow-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-yellow-800'} shadow`}
                      disabled={selectedCustomer() === undefined} onClick={promoteStaff}>Promote User</button>
                    {configStore.inactiveCustomers.find((u) => u === selectedCustomer().uid) ? // If // Change which button is shown depending on the active/inactive status of the customer
                      (
                        <button class={`flex-1 mx-2 text-sm font-semibold text-green-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-green-800'} shadow`}
                          disabled={selectedCustomer() === undefined} onClick={activateUser}>Activate User</button>
                      ) : // Else
                        <button class={`flex-1 mx-2 text-sm font-semibold text-orange-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-orange-800'} shadow`}
                          disabled={selectedCustomer() === undefined} onClick={deactivateUser}>Deactivate User</button>
                      }
                    <button class={`flex-1 mx-2 text-sm font-semibold text-red-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-red-800'} shadow`}
                      disabled={selectedCustomer() === undefined} onClick={deleteUser}>Delete User</button>
                  </div>
              </div>

              {/* This block is almost identical to the customer block, except it handles staff members.*/}
              <div class="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <div class="text-center text-2xl font-bold text-gray-700 mb-4">
                  Staff List
                </div>
                <div class="relative overflow-x-auto overflow-y-auto" style="width: 30vw; height: 30vh">
                  <div class="table w-full border-collapse">
                    <div class="table-header-group bg-gray-100">
                      <div class="table-row">
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Name</div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Email</div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Phone Number</div>
                      </div>
                    </div>
                    <div class="table-header-group bg-gray-100">
                      <div class="table-row">
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">
                          <input
                            type="text"
                            required
                            placeholder={"Search Name"}
                            autocomplete="name"
                            value={formStore.searchStaff.name}
                            onInput={(e) => { setFormStore(prev => ({ ...prev, searchStaff: { ...prev.searchStaff, name: e.currentTarget.value } })); filterStaff() }}
                            class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
                          />
                        </div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">
                          <input
                            type="text"
                            required
                            placeholder={"Search Email"}
                            autocomplete="email"
                            value={formStore.searchStaff.email}
                            onInput={(e) => { setFormStore(prev => ({ ...prev, searchStaff: { ...prev.searchStaff, email: e.currentTarget.value } })); filterStaff() }}
                            class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
                          />
                        </div>
                        <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">
                          <input
                            type="text"
                            required
                            placeholder={"Search Phone"}
                            autocomplete="phone"
                            value={formStore.searchStaff.phone}
                            onInput={(e) => { setFormStore(prev => ({ ...prev, searchStaff: { ...prev.searchStaff, phone: e.currentTarget.value } })); filterStaff() }}
                            class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none focus:border-indigo-500 autofill:bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="table-row-group">
                      <For each={configStore.staffList} fallback={<div>Loading...</div>}>
                        {(user, index) => {
                          const userPhone = configStore.phoneNumberList.find((u) => u.uid === user.uid)?.number ?? 'No Phone Number Found';
                          return (
                            <div class={`table-row ${selectedStaff()?.uid === user.uid ? 'bg-blue-100' : 'hover:bg-gray-50'}
                                cursor-pointer`} onClick={() => {setStaff(user); configInit();}}>
                              <div class="table-cell px-4 py-2 border-t">{user.name}</div>
                              <div class="table-cell px-4 py-2 border-t">{user.email}</div>
                              <div class="table-cell px-4 py-2 border-t">{userPhone}</div>
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                </div>
                  <div class="flex justify-between mt-4">
                  <button class={`flex-1 mx-2 text-sm font-semibold text-yellow-600 py-2 px-4 rounded-lg ${selectedStaff() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-yellow-800'} shadow`}
                      disabled={selectedStaff() === undefined} onClick={demoteStaff}>Demote Staff User</button>
                    <button class={`flex-1 mx-2 text-sm font-semibold text-blue-600 py-2 px-4 rounded-lg ${selectedStaff() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-blue-800'} shadow`}
                      disabled={selectedStaff() === undefined} onClick={startUpdateStaff}>Update Staff User</button>
                    {configStore.inactiveStaff.find((u) => u === selectedStaff().uid) ?
                      (
                        <button class={`flex-1 mx-2 text-sm font-semibold text-green-600 py-2 px-4 rounded-lg ${selectedStaff() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-green-800'} shadow`}
                          disabled={selectedStaff() === undefined} onClick={activateStaff}>Activate Staff User</button>
                      ) :
                        <button class={`flex-1 mx-2 text-sm font-semibold text-orange-600 py-2 px-4 rounded-lg ${selectedStaff() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-orange-800'} shadow`}
                          disabled={selectedStaff() === undefined} onClick={deactivateStaff}>Deactivate Staff User</button>
                      }
                    <button class={`flex-1 mx-2 text-sm font-semibold text-red-600 py-2 px-4 rounded-lg ${selectedStaff() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-red-800'} shadow`}
                      disabled={selectedStaff() === undefined} onClick={deleteStaff}>Delete Staff User</button>
                  </div>
              </div>
            </div>

            {/* This is where users are added and updated. */}
            <div class="flex justify-center items-start space-x-8 px-8 py-4">
              <form action="javascript:void(0)" method="post">
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
                    type="phone"
                    required
                    placeholder={"Phone Number"}
                    autocomplete="phone"
                    value={formStore.fields.phone}
                    onInput={(e) => {
                      setFormStore(prev => ({ ...prev, fields: { ...prev.fields, phone: e.currentTarget.value } }));
                      if (!/^\d{10}$/.test(e.currentTarget.value)) {
                        setFormStore(prev => ({ ...prev, errors: { ...prev.errors, phone: "Phone number must contain 10 digits." } }));
                      } else {
                        setFormStore(prev => ({ ...prev, errors: { ...prev.errors, phone: "" } }));
                      }
                    }}
                    class="border-x-0 border-t-0 border-b bg-transparent w-full my-2 py-2 px-4 focus:ring-0 focus:outline-none border focus:border-indigo-500 autofill:bg-transparent"
                    />
                  {formStore.errors.phone && <div class="text-sm mb-2 self-start text-red-500">{formStore.errors.phone}</div>}
                  { uidToUpdate() === undefined ? ( // uidToUpdate() is undefined unless we are actively updating a user.
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
                    ) :
                    <>
                    </>
                  }
                  {formStore.errors.password && <div class="text-sm mb-2 self-start text-red-500">{formStore.errors.password}</div>}
                  <div class="flex justify-between mt-4">
                    { uidToUpdate() === undefined ? ( // uidToUpdate() is undefined unless we are actively updating a user.
                        <button class={`flex-1 mx-2 text-sm font-semibold text-green-600 py-2 px-4 rounded-lg ${hasFormErrors() ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-green-800'} shadow`} disabled={hasFormErrors()} onClick={addUser}>Add User</button>
                      ) :
                        <button class={`flex-1 mx-2 text-sm font-semibold text-blue-600 py-2 px-4 rounded-lg ${hasUpdateFormErrors() ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-blue-800'} shadow`} disabled={hasUpdateFormErrors()} onClick={updateUser}>Update User</button>
                    }
                    <button class="flex-1 mx-2 text-sm font-semibold text-red-600 py-2 px-4 rounded-lg bg-gray-200 hover:text-red-800 shadow" onClick={refreshForm}>Cancel</button>
                  </div>
              </form>
              
            </div>
          </>
        ) :
        configStore.userStaffType==="Admin" ? (
          <></>
        ) :
        configStore.userStaffType==="User" ? (
          <div class="flex flex-col justify-center items-center w-full">
            <h1 class="text-3xl font-bold">
              You are not authorised to view this page.
            </h1>
          </div>
        ) :
        <div class="flex flex-col justify-center items-center w-full">
          <h1 class="text-3xl font-bold">
            Loading...
          </h1>
        </div>
      }
    </div>
  )
}