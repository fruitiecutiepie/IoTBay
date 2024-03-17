import { Show } from 'solid-js';
import { user } from '../common/userSignal';

export default function Home() {
  return (
    <div
      class="text-gray-700 p-8 flex flex-col justify-center items-center"
    >
      <Show when={user()}
        fallback={
          <div
            class="flex flex-col items-center w-full"
          >
            <h1
              class="text-2xl font-bold"
            >
              Hello Guest!
            </h1>
            <p class="mt-4">
              This is the homepage. You are not logged in.
            </p>
          </div>
        }
      >
        <div
          class="flex flex-col items-center w-full"
        >
          <h1
            class="text-2xl font-bold"
          >
            Hello {user().displayName}!
          </h1>
          <p
            class="mt-4"
          >
            This is the homepage. You are logged in.
          </p>
        </div>
      </Show>
    </div>
  );
}
