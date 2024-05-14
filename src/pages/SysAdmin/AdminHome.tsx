import { A, useNavigate } from "@solidjs/router";
import { For, Show, onMount, createSignal } from 'solid-js';
import { User, UserNumber } from '../../../dataTypes';
import { createStore } from 'solid-js/store';
import { fetchAuthUserGet } from '../../serviceAuth/authUser';
import { fetchStaffUIDAuth } from "../../serviceAdmin/staffUID";
import { fetchUserList } from "../../serviceAdmin/staffList";
import { fetchAddUserNumber, fetchUserNumberGetAll } from "../../serviceAdmin/userNumber";

type AdminHomeStore = {
  user: User | undefined;
  userStaffType: string | undefined;
  staffList: User[] | undefined;
  customerList: User[] | undefined;
  phoneNumberList: UserNumber[] | undefined;
}

const defaultAdminHomeStore: AdminHomeStore = {
  user: undefined,
  userStaffType: undefined,
  staffList: undefined,
  customerList: undefined,
  phoneNumberList: undefined
}

export default function AdminHome() {
  const [configStore, setConfigStore] = createStore(defaultAdminHomeStore);
  const [selectedCustomer, setSelectedCustomer] = createSignal();
  const [selectedStaff, setSelectedStaff] = createSignal();

  onMount(async () => {
    const user = await fetchAuthUserGet();
    setConfigStore('user', user);

    const staffList = await fetchUserList("staff");
    setConfigStore('staffList', staffList);

    const customerList = await fetchUserList("customer");
    setConfigStore('customerList', customerList);

    const phoneNumberList = await fetchUserNumberGetAll();
    setConfigStore('phoneNumberList', phoneNumberList);

    const isAdmin = await fetchStaffUIDAuth(configStore.user.uid, "Admin");
    const isSysAdmin = await fetchStaffUIDAuth(configStore.user.uid, "SysAdmin");

    if (isAdmin) {
      setConfigStore('userStaffType', "Admin");
    }
    if (isSysAdmin) {
      setConfigStore('userStaffType', "SysAdmin");
    }
    else {
      setConfigStore('userStaffType', "User");
    }

  });

  const addStaff = () => {};
  const updateStaff = () => {};
  const deleteStaff = () => {};

  return (
    <div class="text-gray-700 p-8 flex flex-col justify-center items-center">
      {
        configStore.userStaffType==="SysAdmin" ? (
          <div class="flex justify-center items-start space-x-8 px-8 py-4">
            <div class="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
              <div class="text-center text-2xl font-bold text-gray-700 mb-4">
                Customer List
              </div>
              <div class="relative overflow-x-auto overflow-y-auto" style="width: 30vw; height: 70vh">
                <div class="table w-full border-collapse">
                  <div class="table-header-group bg-gray-100">
                    <div class="table-row">
                      <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Name</div>
                      <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Email</div>
                      <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Phone Number</div>
                    </div>
                  </div>
                  <div class="table-row-group">
                    <For each={configStore.customerList} fallback={<div>Loading...</div>}>
                      {(user, index) => {
                        const userPhone = configStore.phoneNumberList.find((u) => u.uid === user.uid)?.phone ?? 'No Phone Number Found';
                        return (
                          <div class={`table-row ${selectedCustomer() === index() ? 'bg-blue-100' : 'hover:bg-gray-50'}
                              cursor-pointer`} onClick={() => setSelectedCustomer(index)}>
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
                  <button class="flex-1 mr-2 text-sm font-semibold text-green-600 hover:text-green-800 py-2 px-4 rounded-lg bg-gray-200 shadow" onClick={addStaff}>Add User</button>
                  <button class={`flex-1 mx-2 text-sm font-semibold text-blue-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-blue-800'} shadow`}
                    disabled={selectedCustomer() === undefined} onClick={updateStaff}>Update User</button>
                  <button class={`flex-1 mx-2 text-sm font-semibold text-yellow-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-yellow-800'} shadow`}
                    disabled={selectedCustomer() === undefined} onClick={addStaff}>Promote User</button>
                  <button class={`flex-1 mx-2 text-sm font-semibold text-orange-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-orange-800'} shadow`}
                    disabled={selectedCustomer() === undefined} onClick={updateStaff}>Deactivate User</button>
                  <button class={`flex-1 mx-2 text-sm font-semibold text-red-600 py-2 px-4 rounded-lg ${selectedCustomer() === undefined ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:text-red-800'} shadow`}
                    disabled={selectedCustomer() === undefined} onClick={deleteStaff}>Delete User</button>
                </div>
            </div>

            <div class="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
              <div class="text-center text-2xl font-bold text-gray-700 mb-4">
                Staff List
              </div>
              <div class="relative overflow-x-auto overflow-y-auto" style="width: 30vw; height: 70vh">
                <div class="table w-full border-collapse">
                  <div class="table-header-group bg-gray-100">
                    <div class="table-row">
                      <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Name</div>
                      <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Email</div>
                      <div class="table-cell px-4 py-2 font-bold text-left text-gray-700">Phone Number</div>
                    </div>
                  </div>
                  <div class="table-row-group">
                    <For each={configStore.staffList}>
                      {(user, index) => (
                        <div class={`table-row ${selectedStaff() === index() ? 'bg-blue-100' : 'hover:bg-gray-50'}
                            cursor-pointer`} onClick={() => setSelectedStaff(index)}>
                          <div class="table-cell px-4 py-2 border-t">{user.name}</div>
                          <div class="table-cell px-4 py-2 border-t">{user.email}</div>
                          <div class="table-cell px-4 py-2 border-t">{user.email}</div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
                <div class="flex justify-between mt-4">
                  <button class="flex-1 mr-2 text-sm font-semibold text-yellow-600 hover:text-yellow-800 py-2 px-4 rounded-lg bg-gray-200 shadow" onClick={addStaff}>Demote Staff User</button>
                  <button class="flex-1 mx-2 text-sm font-semibold text-blue-600 hover:text-blue-800 py-2 px-4 rounded-lg bg-gray-200 shadow" onClick={updateStaff}>Update Staff User</button>
                  <button class="flex-1 mx-2 text-sm font-semibold text-orange-600 hover:text-orange-800 py-2 px-4 rounded-lg bg-gray-200 shadow" onClick={updateStaff}>Deactivate Staff User</button>
                  <button class="flex-1 ml-2 text-sm font-semibold text-red-600 hover:text-red-800 py-2 px-4 rounded-lg bg-gray-200 shadow" onClick={deleteStaff}>Delete Staff User</button>
                </div>
            </div>
          </div>
        ) :
        configStore.userStaffType==="Admin" ? (
          <>
          </>
        ) :
        <div class="flex flex-col justify-center items-center w-full">
          <h1 class="text-3xl font-bold">
            You are not authorised to view this page.
          </h1>
        </div>
      }
    </div>
  )
}