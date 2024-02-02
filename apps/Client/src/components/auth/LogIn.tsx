import { RyderLogo } from "../../assets/svg";

const LogIn = () => {
  return (
    <div className="grid grid-cols-5">
      <div className="loginBackground">
        <h1 className="max-w-[474px] w-full text-4xl font-bold">
          Delivery service just got easier, elegant & superb with{" "}
          <span className="text-orange-500">Ryder</span>
        </h1>
      </div>
      <div className="ml-20 mr-32 col-span-2 flex flex-col pt-20">
        <div className="flex items-center mb-10">
          <RyderLogo />
          <span className="font-bold text-3xl text-gray-900 pl-2">Ryder</span>
        </div>
        <h1 className="mb-8 text-xl font-bold  text-sky-950">Login</h1>
        <form className="space-y-4 " action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm  text-sky-950">
              Email
            </label>
            <div className="email-input-container">
              <input
                type="email"
                name="email"
                id="email"
                className="pl-10 border border-sky-950 text-sky-950 text-sm rounded block w-full px-4 py-2 "
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-sky-950"
            >
              Password
            </label>
            <div className="password-input-container">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="pl-10 border border-sky-950 text-sky-950 text-sm rounded block w-full px-4 py-2"
              />
            </div>
          </div>
          <div className="">
            <a href="#" className="text-sm text-blue-400 hover:cursor ">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out rounded-md text-sm p-2"
          >
            Login
          </button>
          <p className="text-sm text-sky-950">
            Don’t have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:cursor">
              Create account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
