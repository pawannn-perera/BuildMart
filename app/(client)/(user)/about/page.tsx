const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
        About BuildMart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Text Content */}
        <div>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            BuildMart is your trusted partner for high-quality construction
            materials, catering to builders, contractors, and DIY
            enthusiasts alike. Established in 2024, we are committed to
            simplifying the construction process by providing a seamless
            online shopping experience.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Our extensive catalog includes everything from cement and
            bricks to plumbing supplies, electrical fittings, and paints.
            At BuildMart, we take pride in offering top-notch materials
            sourced from trusted manufacturers, ensuring that your projects
            are built to last.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={"/images/about.jpg"} // TypeScript will accept this
            alt="About BuildMart"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
