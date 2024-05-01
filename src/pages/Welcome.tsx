import { userSignal } from "../common/userSignal";

export default function Welcome() {
  return (
    <div
      class="text-gray-700 p-8 flex flex-col justify-center items-center"
    >
      <h1 class="text-2xl font-bold">
        Hello {userSignal() ? userSignal().displayName : 'Guest'}!
      </h1>
      <p class="mt-4">Welcome to IotBay.</p>
    </div>
  )
}