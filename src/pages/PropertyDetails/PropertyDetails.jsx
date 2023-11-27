import { useLoaderData } from "react-router-dom";

const PropertyDetails = () => {
      const property = useLoaderData();
    return (
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={property?.propertyImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{property?.propertyTitle}</h1>
            <p className="py-6">{property?.propertyDescription}</p>
            <p className="mb-2">Price : ${property?.propertyPrice}</p>
            <p className="mb-2">Location : ${property?.propertyLocation}</p>
            <p className="mb-2">Agent Name : ${property?.agentName}</p>
            <button className="btn btn-primary">Add to wishlist</button>
          </div>
        </div>
      </div>
    );
};

export default PropertyDetails;