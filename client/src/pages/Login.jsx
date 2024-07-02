import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";
import { githubLogo, googleLogo } from "../assets";

const Login = () => {
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // ============== Google Login Start here =====================
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider.setCustomParameters({ prompt: "select_account" }))
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        toast.success("Logged in with Google");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google Login Failed");
      });
  };
  // ============== Google Login End here =======================
  // ============== GitHub Login Start here =====================
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        toast.success("Logged in with GitHub");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error("GitHub Login Failed");
      });
  };
  // ============== GitHub Login End here =======================
  // ============== Logout Start here ===========================
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout Failed");
      });
  };
  // ============== Logout End here =============================

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={handleGoogleLogin}
          className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 hover:bg-orange-100 cursor-pointer duration-300"
        >
          <img className="w-8" src={googleLogo} alt="googleLogo" />
          <span className="text-sm text-gray-900"> Sign in with Google</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={handleGithubLogin}
          className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 hover:bg-orange-100 cursor-pointer duration-300"
        >
          <img className="w-8" src={githubLogo} alt="githubLogo" />
          <span className="text-sm text-gray-900"> Sign in with GitHub</span>
        </div>
      </div>
      {userInfo && (
        <button
          onClick={handleSignOut}
          className="bg-black text-white text-base w-60 h-12 tracking-wide rounded-md hover:bg-gray-800 duration-300"
        >
          Sign Out
        </button>
      )}

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
