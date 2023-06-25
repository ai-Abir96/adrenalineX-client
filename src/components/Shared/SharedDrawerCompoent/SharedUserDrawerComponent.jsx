import useAuth from "../../../utils/hooks/useAuth";

const SharedUserDrawerComponent = () => {
  const { user } = useAuth();
  return (
    <>
      <li className="self-center ">
        <img
          src={user?.photoURL}
          className="rounded-full h-[150px] w-[150px]"
          alt=""
        />
      </li>
      <li className="lg:mb-16 mb-10 uppercase">
        <h1 className=" text-orange self-center  lg:text-lg text-sm  font-bold">
          {user?.displayName}
        </h1>
      </li>
    </>
  );
};

export default SharedUserDrawerComponent;
