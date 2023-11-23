import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import UserReview from "../UserReview/UserReview";

const Home = () => {
    return (
        <div className="space-y-5">
        <Banner/>
            <Advertisement />
            <UserReview/>
      </div>
    );
};

export default Home;