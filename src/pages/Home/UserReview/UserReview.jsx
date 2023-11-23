
const UserReview = () => {
    return (
      <div>
        <h2 className="text-5xl font-extrabold text-center mb-5">
          User Review
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body ">
              <div className="avatar mx-auto">
                <div className="w-24 rounded-full">
                  <img src="https://i.ibb.co/Xtpy2PW/banner.jpg" />
                </div>
              </div>
              <h2 className="text-center text-2xl md:text-3xl font-bold">Reviewer name</h2>
              <h3 className="text-3xl text-center">property title.</h3>
              <p className="text-center">Review description.</p>
                
            </div>
                </div>
                
          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body ">
              <div className="avatar mx-auto">
                <div className="w-24 rounded-full">
                  <img src="https://i.ibb.co/Xtpy2PW/banner.jpg" />
                </div>
              </div>
              <h2 className="text-center text-2xl md:text-3xl font-bold">Reviewer name</h2>
              <h3 className="text-3xl text-center">property title.</h3>
              <p className="text-center">Review description.</p>
                
            </div>
                </div>
                
          <div className="card bg-base-100 shadow-xl text-center">
            <div className="card-body ">
              <div className="avatar mx-auto">
                <div className="w-24 rounded-full">
                  <img src="https://i.ibb.co/Xtpy2PW/banner.jpg" />
                </div>
              </div>
              <h2 className="text-center text-2xl md:text-3xl font-bold">Reviewer name</h2>
              <h3 className="text-3xl text-center">property title.</h3>
              <p className="text-center">Review description.</p>
                
            </div>
                </div>
                
        </div>
      </div>
    );
};

export default UserReview;