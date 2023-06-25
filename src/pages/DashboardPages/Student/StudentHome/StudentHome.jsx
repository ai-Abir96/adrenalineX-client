import useAuth from "../../../../utils/hooks/useAuth";

const StudentHome = () => {
  const { user } = useAuth();
  return (
    <div className=" text-5xl text-center lg:mt-[300px] mt-[150px]">
      Welcome <br />
      <span className="text-orange">{user?.displayName}</span>
    </div>
  );
};

export default StudentHome;
