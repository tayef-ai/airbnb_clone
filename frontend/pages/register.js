import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import "../app/globals.css";


export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            alert("Passwords do not match");
            return;
        }

        axios.post('http://localhost:8000/api/registration/', {
            // email: email,
            username: username,
            password1: password1,
            password2: password2,
        }).then((response) => {
            // localStorage.setItem("token", response.data.key);
            console.log("hello=========")
            router.push("/login");
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-red-50">
            <div className="w-full max-w-lg">
                <form 
                className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-16 mb-4"
                onSubmit={handleRegister}
                >
                    <a href="/">
                        <Image
                        className="mx-auto w-auto"
                        src={"/Airbnb-logo.png"}
                        width={100}
                        height={100}
                        alt="Airbnb logo"
                        />
                    </a>

                    <div className="text-center text-3xl my-5 font-semibold">Register</div>
                    <div className="mb-4">
                        <label 
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="username">
                            Username
                        </label>

                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div> */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password1">Password</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password1"
                        type="password"
                        placeholder="Password"
                        value={password1}
                        onChange={e => setPassword1(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password2">Confirm Password</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password2"
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                        >Register</button>
                    </div>

                    <a href="/login" className="text-blue-600 underline">
                        Already have an account? Login
                    </a>
                </form>
            </div>

        </div>
  )
}
