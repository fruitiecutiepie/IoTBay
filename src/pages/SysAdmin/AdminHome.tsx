import { A, useNavigate } from "@solidjs/router";
import { Show, onMount } from 'solid-js';
import { User } from '../../../dataTypes';
import { createStore } from 'solid-js/store';
import { fetchAuthUserGet } from '../../serviceAuth/authUser';
import { fetchStaffUIDAuth } from "../../serviceAdmin/staffUID";

type AdminHomeStore = {
  user: User | undefined;
}

const defaultAdminHomeStore: AdminHomeStore = {
  user: undefined
}

export default function AdminHome() {
  const [configStore, setConfigStore] = createStore(defaultAdminHomeStore);
  var isAdmin: boolean = false;
  var isSysAdmin: boolean = false;

  onMount(async () => {
    const user = await fetchAuthUserGet();
    setConfigStore('user', user);

    isAdmin = await fetchStaffUIDAuth(configStore.user.uid, false);
    isSysAdmin = await fetchStaffUIDAuth(configStore.user.uid, true);
  });

  return (
    <div class="text-gray-700 p-8 flex flex-col justify-center items-center">
      <Show when={isAdmin}
        fallback={
          <Show when={isSysAdmin}
            fallback={
              /* The user is an admin but not a SysAdmin */
              <div>

              </div>
            }
          >
            {/* The user is a SysAdmin */}
            <div>

            </div>
          </Show>
        }
      >
        {/* The user is not an admin or SysAdmin */}
        <div class="flex flex-col justify-center items-center w-full">
          <h1 class="text-3xl font-bold">
            You are not authorised to view this page.
          </h1>
        </div>
      </Show>
    </div>
  )
}
