import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../Redux/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem("currentToken");
  };
  return (
    <>
      <button onClick={handleClick}>Logout</button>
    </>
  );
};

export default Logout;
