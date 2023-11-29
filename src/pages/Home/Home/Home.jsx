import { Helmet } from "react-helmet-async";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import Feature from "../Feature/Feature";
import UserReview from "../UserReview/UserReview";

const Home = () => {
    return (
      <div className="space-y-5">
        <Helmet>
          <title>Dream Home | Home</title>
        </Helmet>
        <Banner />
        <Advertisement />
        <Feature/>
        <UserReview />
        <FAQ/>
      </div>
    );
};

export default Home;