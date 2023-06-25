import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

import Swal from "sweetalert2";
import useAxiosBaseUrl from "../../utils/hooks/useAxiosBaseUrl";

const RegisterPage = () => {
  // const [error, setError] = useState("");
  const { axiosBase } = useAxiosBaseUrl();
  const { registerUser, updateUser, loginWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const image_host_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;
  const handleRegister = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_host_url, { method: "POST", body: formData })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.success) {
          const imageURL = result.data.display_url;
          const { name, email, password } = data;

          try {
            await registerUser(email, password).then(
              async (result) => {
                const registeredUser = result.user;
                await updateUser(registeredUser, name, imageURL);

                const newUser = {
                  name: name,
                  email: email,
                  photo: imageURL,
                };
                const res = await axiosBase.post(
                  "/create-user",
                  newUser
                );
                if (res) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  setTimeout(() => {
                    navigate("/");
                  }, 1500);
                }
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle().then(async (result) => {
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

          navigate("/");
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
          navigate("/");
        } else {
          console.log(error);
        }
      }
    });
  };

  const password = watch("password", "");

  return (
    <div className=" py-[150px] md:px-[350px]">
      <div className="card card-side flex  shadow-xl">
        <div
          className="w-[40%] text-black hidden lg:block"
          style={{
            backgroundImage: `url('/images/bg/background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className=" text-4xl font-bold pl-5 pt-10">REGISTER</h1>
          <div className="mt-52 text-center">
            <h3 className=" text-4xl   font-bold ">
              Welcome to{" "}
              <span className=" text-orange">AdrenalineX</span>
            </h3>
            <div className=" text-lg mt-5">
              Already Have an Account?......
              <br />
              <Link
                to="/login"
                className=" underline text-orange font-bold"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h1 className=" text-center font-bold  text-5xl">
            AdrenalineX
          </h1>
          <form
            className=" lg:w-3/4 lg:m-auto"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="form-control">
              <label className="label">
                <span className="text-lg ">Image</span>
              </label>
              <input
                type="file"
                placeholder="Please Enter a Image File"
                {...register("image", { required: true })}
                className="file-input file-input-bordered file-input-primary bg-gray-100 w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                })}
                placeholder="Please Enter Your Name"
                className="input input-bordered"
              />
            </div>

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
                <p className="text-error">Email is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Password</span>
              </label>
              <input
                type="password"
                placeholder="Please Enter Your Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                })}
                className={`input input-bordered ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <p className=" text-error">
                  Password must be at least 6 characters long, contain
                  a capital letter, and a special character.
                </p>
              )}
              {errors.password && (
                <p className="text-error">Password is required.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-lg">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password,
                })}
                className={`input input-bordered ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="text-error">
                  Confirm Password is required.
                </p>
              )}
              {errors.confirmPassword?.type === "validate" && (
                <p className="text-error">Passwords do not match.</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary-custom"
              >
                Register
              </button>
            </div>
          </form>
          <div className=" text-center font-bold mt-1">or</div>
          <div className=" lg:w-3/4 lg:m-auto">
            <div className="form-control mt-1">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-primary-custom"
              >
                <FcGoogle /> Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
