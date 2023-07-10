import { useCallback, useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [varaint, setVariant] = useState("login");

  const toggleVaraint = useCallback(() => {
    setVariant((currentVaraint) =>
      currentVaraint === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
      toast.success(`Welcome Back`);
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Email or Password");
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("api/register", {
        email,
        name,
        password,
      });
      login();
      toast.success("Registered Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Email or Password");
    }
  }, [email, name, password, login]);

  const googleProvider = () => {
    signIn("google", { callbackUrl: "/profiles" });
    toast.error("Try credentials login");
  };
  const githubProvider = () => {
    signIn("github", { callbackUrl: "/profiles" });
    toast.error("Try credentials login");
  };

  return (
    <div
      className="
        relative 
        h-full
        w-full
        bg-[url('/images/hero.jpg')]
        bg-no-repeat
        bg-fixed
        bg-cover
        
        "
    >
      <div
        className="
          bg-black w-full h-full lg:bg-opacity-50
          "
      >
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div
            className="
                  bg-black
                      bg-opacity-70
                      px-16
                      py-16 
                      self-center
                      mt-2 
                      lg:w-2/5
                      lg:max-w-md
                      rounded-md 
                      w-full
                       "
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varaint === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {varaint === "register" && (
                <Input
                  label="Name"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="username"
                  type="text"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={varaint === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {varaint === "login" ? "Login" : "Sign up"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={googleProvider}
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={githubProvider}
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {varaint === "login"
                ? " First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVaraint}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {varaint === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
