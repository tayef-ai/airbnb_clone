import { useRouter } from "next/router";
import { useState } from "react";
import "../../app/globals.css"
export default function createProperty() {
  const BASE_URL = "http://localhost:8000/api";

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    available_start: "",
    available_end: "",
    photos: [{ url: "", alt_text: "Room Image" }],
    rooms: [{ name: "", capacity: 3 }],
    amenities: [{ name: "" }],
    property_type: { name: "" },
  });

  const router = useRouter();

  const handleChange = (e, parentField = null, index = null) => {
    if (parentField) {
      let newItem = null;
      if (index !== null) {
        newItem = [...formState[parentField]];
        newItem[index][e.target.name] = e.target.value;
      } else {
        newItem = formState[parentField];
        newItem[e.target.name] = e.target.value;
      }

      setFormState({ ...formState, [parentField]: newItem });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formState),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/properties/" + data.id);
    } else {
      console.error(data);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="my-5 text-3xl font-semibold">Create Property</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <textarea
          placeholder="description"
          name="description"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="date"
          name="available_start"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="date"
          name="available_end"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          onChange={(e) => handleChange(e, "photos", 0)}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          onChange={(e) => handleChange(e, "rooms", 0)}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Amenity Name"
          onChange={(e) => handleChange(e, "amenities", 0)}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Property Type"
          onChange={(e) => handleChange(e, "property_type")}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Property
        </button>
      </form>
    </div>
  );
}
