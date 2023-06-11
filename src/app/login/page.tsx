"use client";
import axios from "axios";

axios.defaults.withCredentials = true;
const AUTH_SERVICE = "http://127.0.0.1:3000";
import { useState } from "react";
import { encrypt } from "../../helpers/aes";
export default function loginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    const encPassword = encrypt(password);
    try {
      console.log(
        (
          await axios.post(`${AUTH_SERVICE}/auth/login`, {
            username,
            password: encPassword,
          })
        )?.data
      );
      console.log({ cookie: document.cookie });
    } catch (error) {
      console.log({ error });
    }
  };
  const handleValidate = async () => {
    const { data } = await axios.get(
      `${AUTH_SERVICE}/auth/validate-access?uri=/api`
    );
    console.log({ data });
  };
  const handleRefresh = async () => {
    const { data } = await axios.get(`${AUTH_SERVICE}/auth/refresh`);
    console.log({ data });
  };
  return (
    <div className="login max-w-5xl max-h-screen bg-slate-100 mx-auto ">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
        className="login-form mx-auto block border min-w-4xl min-h-[40vh] bg-white px-6 py-2"
      >
        <label htmlFor="username" className="block my-2 text-slate-700">
          Username:
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          className="border block"
        />
        <label htmlFor="password" className="block my-2 text-slate-700">
          Password:
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="border block mt-4 text-slate-600"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
          Login
        </button>
      </form>
      <div className="button-list bg-transparent">
        <button
          onClick={handleValidate}
          className="bg-green-600 text-white px-4 py-2 rounded block"
        >
          Validate Access
        </button>
        <button
          onClick={handleRefresh}
          className="bg-purple-600 text-white px-4 py-2 rounded block"
        >
          Refresh Access
        </button>
      </div>
    </div>
  );
}
