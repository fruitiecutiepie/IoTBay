import { A, useNavigate } from "@solidjs/router";
import { For, Show, onMount } from 'solid-js';
import { User } from '../../../dataTypes';
import { createStore } from 'solid-js/store';
import { fetchAuthUserGet } from '../../serviceAuth/authUser';
import { fetchStaffUIDAuth } from "../../serviceAdmin/staffUID";
import { fetchUserList } from "../../serviceAdmin/staffList";

type AdminHomeStore = {
  user: User | undefined;
  userStaffType: string | undefined;
  staffList: User[] | undefined;
}

const defaultAdminHomeStore: AdminHomeStore = {
  user: undefined,
  userStaffType: undefined,
  staffList: undefined
}

export default function AdminHome() {
  const [configStore, setConfigStore] = createStore(defaultAdminHomeStore);

  onMount(async () => {
    const user = await fetchAuthUserGet();
    setConfigStore('user', user);

    const staffList = await fetchUserList("all");
    setConfigStore('staffList', staffList);

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

  return (
    <div class="text-gray-700 p-8 flex flex-col justify-center items-center">
      {
        configStore.userStaffType==="SysAdmin" ? (
          <div>
            <ul>
              <For each={configStore.staffList} fallback={<div>Loading...</div>}>
                {(user, index) => (
                  <li>{user.name}</li>
                )}
              </For>
            </ul>
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
