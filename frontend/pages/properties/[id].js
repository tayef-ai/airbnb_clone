import { CurrencyDollarIcon, InformationCircleIcon, MapPinIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const { default: RootLayout } = require("@/app/layout");
const { default: axios } = require("axios");
const { default: Image } = require("next/image");
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");

function PropertyDetails(){
    const router = useRouter()
    const {id} = router.query
    const [property, setProperty] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(id){
            axios.get("http://127.0.0.1:8000/api/properties/" + id, {
                headers: {Authorization: `Token ${token}`}
            }).then(res => {
                setProperty(res.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [id])
    if(!property){
        return <div>Loading...</div>
    }
    return(
        <RootLayout>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="w-full max-w-3xl p-4 bg-white rounded-md shadow-md">
                    <div className="flex justify-center">
                        <Image
                        className="rounded-lg shadow-lg"
                        src={property.photos[0].url}
                        alt={property.photos[0].alt_text}
                        width={1000}
                        height={600}
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h1 className="text-xl font-semibold text-gray-700">{property.title}</h1>
                        <p className="mt-2 text-m text-gray-600">{property.description}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <MapPinIcon className="h-6 mb-1 inline-block"></MapPinIcon><span className="font-light text-xl">{property.location}</span>
                        </div>
                        <div>
                            <CurrencyDollarIcon className="h-6 mb-1 inline-block"></CurrencyDollarIcon><span className="font-light text-xl text-gray-700">{property.price}</span>
                        </div>
                        </div>
                        <div className="mt-4">
                            <UserCircleIcon className="h-6 mb-1 inline-block"></UserCircleIcon><span className="text-m text-gray-700">Host: {property.host.username}</span>
                        </div>
                        <div className="mt-4">
                            <InformationCircleIcon className="h-6 mb-1 inline-block"></InformationCircleIcon>Amenities: {property.amenities.map((amenity) => {
                                return <span key={amenity.id} className="text-m mt-4 text-gray-700">{amenity.name}</span>
                            })}
                        </div>
                        <div className="mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-whitee font-bold py-2 px-4 rounded">Book Now</button>
                        </div>                    
                </div>
            </div>
        </RootLayout>
    )
}
export default PropertyDetails;