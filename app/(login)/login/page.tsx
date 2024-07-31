"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent } from "react";
import { z } from "zod";

const SignInPage = () => {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [errMsg, setEM] = React.useState("");
  const router = useRouter();
  const UserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const myUser = UserSchema.parse(formData);

      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myUser),
      });
      const data = await response.json();
      if (response.status != 200) {
        throw { server: data.message };
      }
      localStorage.setItem("user", JSON.stringify(data.data));
      router.push("/dashboard");
    } catch (error: any) {
      if (error["server"]) setEM(error.server);
      else {
        console.log(JSON.stringify(error.issues?.[0]?.message));
        setEM(error.issues?.[0]?.message);
      }
    }
  };
  return (
    <>
      <form className="pt-4 gap-2 text-white text-lg" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Your email"
          className="input w-full mb-4"
          onChange={handleChange}
        />
        <label className="input input-bordered ct gap-2 w-full mb-4">
          <input
            type={`${!showPassword ? "password" : "text"}`}
            className="grow"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <svg
            // stroke="#808080"
            fill="#9f9f9f"
            strokeWidth="0"
            className="cursor-pointer text-xl"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowPassword(!showPassword)}
          >
            <path d="M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z"></path>
          </svg>
        </label>
        <button className="btn text-white font-normal text-xl w-full bg-gradient-to-t from-[#4c36cc] to-[#9c93d4] mb-6 border-none">
          Login
        </button>
        <div className="text-black w-full ct gap-1 ">
          Don’t have an account? Create a
          <span
            className="text-[#0054A1] cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            new account
          </span>
        </div>
      </form>
      {errMsg && (
        <div className="toast toast-start">
          <div className="alert alert-error">
            {errMsg}
            <X
              className="cursor-pointer hover:stroke-yellow-300 stroke-2"
              onClick={() => setEM("")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPage;
