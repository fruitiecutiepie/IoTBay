import { createStore } from "solid-js/store";
import { User } from "../../dataTypes";
import { fetchAuthUserGet } from "../serviceAuth/authUser";
import { onMount } from "solid-js";

type WelcomeStore = {
  user: User | undefined;
}

const defaultWelcomeStore: WelcomeStore = {
  user: undefined,
}

export default function Welcome() {
  const [configStore, setConfigStore] = createStore(defaultWelcomeStore);

  onMount(async () => {
    const user = await fetchAuthUserGet();
    if (user) {
      setConfigStore('user', user);
    }
  });

  return (
    <div
      class="text-gray-700 p-8 flex flex-col justify-center items-center"
    >
      <h1
        class="text-3xl font-bold"
      >
        Welcome, {configStore.user ? configStore.user.name : 'Guest'}!
      </h1>
      <p
        class="text-sm mt-4"
      >
        You've successfully logged in.
      </p>
    </div>
  )
}