
const Feature = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-10">Our Feature</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/J2vx5Jk/verified.jpg"
              alt="Assignment"
              className="h-[300px]"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Verified Properties</h2>
            <p>
              Explore a curated selection of verified properties approved by our
              expert team.
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/ScRvvFt/secure.png"
              alt="Real-time Collaboration"
              className="h-[300px]"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Secure Transactions</h2>
            <p>
              Enjoy peace of mind with secure and transparent transactions for
              property purchases.
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/jrY0018/tour.jpg"
              alt="Feedback and Grading"
              className="h-[300px]"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Virtual Tours</h2>
            <p>
              Take virtual tours of properties from the comfort of your home
              before making a decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;