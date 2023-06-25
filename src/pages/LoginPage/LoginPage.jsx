import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosBaseUrl from "../../utils/hooks/useAxiosBaseUrl";

const LoginPage = () => {
  const [error, setError] = useState("");
  const { logIn, loginWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { axiosBase } = useAxiosBaseUrl();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    const { email, password } = data;
    logIn(email, password)
      .then((res) => {
        const user = res.user;
        if (user) {
          Swal.fire({
            icon: "success",
            title: "Logged In Successful",
            timer: 1500,
            timerProgressBar: true,
          });
        }
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(async (result) => {
        const loggedUser = result.user;
        const newUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
        };

        try {
          const res = await axiosBase.post("/create-user", newUser);

          if (res) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            });

            navigate(from, { replace: true });
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Logged In Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          } else {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" py-[150px] md:px-[350px] ">
      <div className="card card-side flex  shadow-2xl">
        <div
          className="w-[40%] text-white hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/bg/register.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className=" text-4xl font-bold  pl-5 pt-5">LOGIN</h1>
          <div className="mt-32 text-center ">
            <h3 className=" text-4xl   font-bold ">
              Welcome to{" "}
              <span className="text-orange">AdrenalineX</span>
            </h3>
            <div className=" text-lg mt-5">
              Do not Have an Account?......Please
              <br />
              <Link
                to="/register"
                className=" text-orange underline font-bold"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h1 className=" text-center font-bold  text-5xl">
            AdrenalineX
          </h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control">
              <label className="label">
                <span className="text-lg">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                placeholder="Please Enter Your Email"
                className={`input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-700 text-xs">
                  Email is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative inset-0">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute top-[50%] text-black transform translate-y-[-50%] right-3"
                  onClick={toggleVisibility}
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>
              {errors.password && (
                <p className=" text-red-700 text-xs">
                  Password must be at least 6 characters, contains a
                  capital letter, and a special character.
                </p>
              )}
              {errors.password && (
                <p className="text-red-700 text-xs">
                  Password is required.
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn ${
                  Object.keys(errors).length > 0
                    ? "btn-disabled bg-gray-500"
                    : "btn-primary-custom"
                }`}
              >
                Login
              </button>
            </div>
          </form>
          <div className=" text-center font-bold mt-1">or</div>
          <div>
            <div className="form-control mt-1">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-primary-custom"
              >
                <BsGoogle /> Login with Google
              </button>
            </div>
            <p className=" text-red-700 my-4">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
