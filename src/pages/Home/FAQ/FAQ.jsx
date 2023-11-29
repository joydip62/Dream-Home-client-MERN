
const FAQ = () => {
    return (
      <div>
        <h1 className="text-5xl font-bold text-center my-10">
          Frequently Asked Questions
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <div className="collapse bg-base-200 mb-5">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-xl font-medium">
                How do I search for properties?
              </div>
              <div className="collapse-content">
                <p>
                  Use the search bar on the All Properties page to enter
                  Property title, location, price range, and other filters to
                  find properties that match your criteria.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-200 mb-5">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-xl font-medium">
                What is the property verification process?
              </div>
              <div className="collapse-content">
                <p>
                  Our expert team carefully reviews each property listing to
                  ensure accuracy and legitimacy before it is marked as
                  verified.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-200 mb-5">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-xl font-medium">
                How do I make a secure payment for a property?
              </div>
              <div className="collapse-content">
                <p>
                  Secure payment methods are available on our platform. Follow
                  the provided instructions during the purchasing process to
                  make a safe transaction.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="collapse bg-base-200 mb-5">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                What should I do if I encounter issues with a property?
              </div>
              <div className="collapse-content">
                <p>
                  Contact our customer support team, and they will assist you in
                  resolving any issues or concerns you may have with a property.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-200 mb-5">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                How can I stay updated on new property listings?
              </div>
              <div className="collapse-content">
                <p>
                  Subscribe to our newsletter to receive regular updates on new
                  property listings, promotions, and real estate trends.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-200 mb-5">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Can I access E-Group Study on mobile devices?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, E-Group Study is designed to be mobile-responsive. You
                  can access it on smartphones and tablets for a convenient
                  study experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FAQ;