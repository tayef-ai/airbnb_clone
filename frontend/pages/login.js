import axios from "axios"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useState } from "react";
import "../app/globals.css"

export default function login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/api/login/", {
      username: username,
      password: password,
    }).then(response => {
      localStorage.setItem("token", response.data.key)
      router.push("/")
    })
  }
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="w-full max-w-lg">
        <form 
        className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-16 mb-4"
        onSubmit = {handleLogin}>
          <a href="/">
            <Image
            className="mx-auto w-auto"
            src={"/Airbnb-logo.png"}
            width={100}
            height={100}
            alt="Airbnb logo"
            />
          </a>
        <div className="text-center text-3xl my-5 font-semibold">Login</div>
        <div className="mb-4">
          <label
          htmlFor="username"
          className="block text-gray-700 text-lg font-bold mb-2"
          >Username</label>
          <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>
          <a href="/register" className="text-blue-600 underline">
            New User?
          </a>
        </form>
      </div>
    </div>
  )
}
