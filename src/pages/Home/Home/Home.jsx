import { Helmet } from "react-helmet-async";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import UserReview from "../UserReview/UserReview";

const Home = () => {
    return (
      <div className="space-y-5">
        <Helmet>
          <title>Dream Home | Home</title>
        </Helmet>
        <Banner />
        <Advertisement />
        <UserReview />
      </div>
    );
};

export default Home;