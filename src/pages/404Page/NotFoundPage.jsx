import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center mt-48 items-center font-extrabold">
          <img
            src="/images/bg/404.gif"
            alt=""
            className="w-full lg:w-[50%]"
          />
          <div className="text-7xl mt-5   text-red-600">
            404 - NotFound
          </div>
          <div></div>
          <div>
            <Link to="/">
              <button className="btn btn-primary-custom mt-24 text-2xl">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
