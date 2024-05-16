import { Show, onMount } from 'solid-js';
import { User } from '../../dataTypes';
import { createStore } from 'solid-js/store';
import { fetchAuthUserGet } from '../serviceAuth/authUser';
import { useNavigate } from "@solidjs/router";

type HomeStore = {
  user: User | undefined;
}

const defaultHomeStore: HomeStore = {
  user: undefined,
};

export default function Home () {
  const [configStore, setConfigStore] = createStore(defaultHomeStore);
  const navigate = useNavigate();

  onMount(async () => {
    const user = await fetchAuthUserGet();
    setConfigStore('user', user);
  });
  return (
    
    <div
      class="text-gray-700 p-8 flex flex-col justify-center items-center"
    >
      <Show when={configStore.user}
        fallback={
          <div
            class="flex flex-col items-center w-full"
          >
            <h1
              class="text-3xl font-bold"
            >
              Hello, Guest!
            </h1>
            <p class="text-sm mt-4">
              Welcome to the homepage. You are not logged in.
            </p>
          </div>
        }
      >
        <div
          class="flex flex-col justify-center items-center w-full"
        >
          <h1
            class="text-3xl font-bold"
          >
            Hello, {configStore.user.name}!
          </h1>
          <p class="text-sm mt-4">
            Welcome to the homepage. You are logged in.
          </p>
        </div>
      </Show>
    </div>
  );
}