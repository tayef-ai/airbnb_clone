import { Bars3Icon, GlobeAltIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
    const [searchInput, setSearchInput] = useState("");
    const [noOfGuests, setNoOfGuests] = useState(1);
    const handleClick = () => {
        fetch("");
    }
  return (
    <div>
        <header className="sticky top-0 z-50 px-5 py-2 bg-white shadow-md flex items-center justify-between">
            <a href='/'>
                <Image 
                    src = {"/Airbnb-logo.png"}
                    width = {100}
                    height = {100}
                    alt = "Airbnb Logo"
                />
            </a>
            <div>
                <input
                    className="w-96 placeholder:italic placeholder-text-slate-400 bg-white-border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:ring-shy-500 focus:ring-1 sm:text-sm"
                    placeholder="Search for anything"
                    type="text"
                    name="search"
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>
            <div className="flex items-center space-x-4 justify-end">
                <a href="/properties/createProperty" className="font-semibold hover:cusor-pointer p-2.5 rounded-full">
                    Host Your Home
                </a>
                <GlobeAltIcon className="h-6" />
                <a href="/login" className="flex space-x-2 border-2 p-2 rounded-full hover:cursor-pointer hover:shadow-md">
                    <Bars3Icon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </a>
            </div>
        </header>
        <div>
            <div className="flex align-center justify-center space-x-2">
                <UserIcon className="h-6" />
                <h1 className="text-center">Guests</h1>
                <input type="number" className="w-12 border-2 rounded-md" onChange={e => {setNoOfGuests(e.target.value)}} value={noOfGuests} min={1} max={5} />
                <button className="text-red-600 pl-16" onClick={handleClick}>Search</button>
            </div>
        </div>
    </div>
  )
}
