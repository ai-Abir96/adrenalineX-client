const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="lg:mx-[300px] my-[30px]">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-orange">
              AdrenalineX
            </h2>
            <p className="mt-2 w-2/3">
              A summer school camp providing exciting sports and
              recreational activities for participants of all ages.
            </p>

            <p className="mt-2">
              Phone: +8801302-794996
              <br />
              Email: info@adrenalinex.com
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Facilities
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Events
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
        <hr className="border-gray-700 my-6" />

        <hr className="border-gray-700 my-6" />
        <div className="text-center text-gray-400">
          <p className="mt-2">Mirpur, Dhaka, Bangladesh</p>
          &copy; {new Date().getFullYear()} AdrenalineX. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
