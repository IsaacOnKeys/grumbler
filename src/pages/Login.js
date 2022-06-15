import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96 flex flex-col space-y-5">
        <h1 className="text-4xl text-primary font-semibold">Login</h1>
        <hr />
        <input
          type="text"
          placeholder="email"
          //focuse-border-not-working- check out tailwind css doc
          className="border focus:ring-1 border-primary  h-10 rounded-sm pl-5 hover:border-secondary focus:border-[#ffcd03]"
        />
        <input
          type="text"
          placeholder="password"
          //focuse-border-not-working- check out tailwind css doc
          className="border focus:ring-1 border-primary h-10 rounded-sm pl-5 hover:border-secondary"
        />
        <div>
          <button className="bg-primary h-10 rounded-sm pl-5 pr-5 font-bold text-white hover:ring-2 hover:ring-[#eee] hover:bg-secondary">
            LOGIN
          </button>
        </div>
        <hr />
        <Link
          to="/register"
          className="text-xl text-primary hover:text-secondary"
        >
          Not yet registered? Click here to register.
        </Link>
      </div>
    </div>
  );
}

export default Login;
