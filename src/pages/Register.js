import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // State variable for loading

  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if any of the fields are empty
    if (!username || !email || !password) {
      alert("Please fill out all the fields.");
      return; // Exit the function early if any field is empty
    }

    const data = {
      username: username,
      email: email,
      password: password,
    };

    axios.post("http://localhost:27438/auth", data).then((response) => {
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Success register");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div>
        {loading && (
          <div className="absolute inset-0 h-full bg-black bg-opacity-75 z-50 flex gap-4 flex-col justify-center items-center">
            <FidgetSpinner
              visible={true}
              height={80}
              backgroundColor="#f5b951"
              width={80}
              ariaLabel="fidget-spinner-loading"
              wrapperStyle={{}}
              wrapperClass="fidget-spinner-wrapper"
            />
            <p className="text-white  text-xl">Please wait ..</p>
          </div>
        )}
        <section className="flex-column justify-center items-center ">
          <div>
            <img
              src="/LOGO-UTM.png"
              className="text-center m-auto py-8 w-[24rem]"
            ></img>
          </div>

          <h1 className="relative z-10 text-center text-black font-bold text-3xl my-4">
            Registration Form
          </h1>

          <div className="container relative z-10 mx-auto min-h-screen ">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <form className="" method="post">
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block px-3 text-black  font-bold mb-2"
                    >
                      Username
                    </label>
                    <input
                      name="username"
                      id="username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      className="shadow appearance-none border rounded-3xl w-full py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Username"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block px-3 text-black  font-bold mb-2"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      className="shadow appearance-none border rounded-3xl w-full py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block px-3 text-black font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="shadow appearance-none border rounded-3xl w-full py-5 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className="mr-2"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className=" text-black" htmlFor="flexCheckDefault">
                      Remember me
                    </label>
                  </div>

                  <div className="flex items-center justify-center gap-4 font-bold text-xl">
                    <button
                      onClick={register}
                      className="bg-[#235785] transition hover:border-black  hover:bg-[#f5b951] border text-white font-bold p-2 rounded-full w-1/2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
