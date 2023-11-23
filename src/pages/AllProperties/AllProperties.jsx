
const AllProperties = () => {
    return (
      <div>
        <h1 className="text-5xl font-extrabold text-center mb-5">All Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://i.ibb.co/Xtpy2PW/banner.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                - Property title
                <div className="badge badge-secondary">verification status</div>
              </h2>
              <p>price range.</p>
              <p>property location.</p>
              <div className="flex items-center mt-3">
                <div className="avatar mx-auto">
                  <div className="w-12 rounded-full">
                    <img src="https://i.ibb.co/Xtpy2PW/banner.jpg" />
                  </div>
                </div>
                <h4 className="w-2/3">Agent name.</h4>
              </div>
            </div>

            <button className="btn btn-primary">Details</button>
          </div>

          
        </div>
      </div>
    );
};

export default AllProperties;