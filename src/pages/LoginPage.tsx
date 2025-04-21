import {
  // Facebook, Github,
  EyeOff,
} from "lucide-react";
import { Button } from "./../components/ui/button";
// import { Checkbox } from "./../components/ui/checkbox"
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const URL = "https://consultapi.vindove.com/api/v1/admin/login";

    try {
      setIsLoading(true);

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("This is the login response data >>>>>>", data);

      if (response.ok) {
        const authToken = data.data["0"];
        // console.log("Token:", authToken);

        login(authToken);
        navigate("/");
      } else {
        console.error("Login failed:", data);
        alert(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-500">Please sign-in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 h-12 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-600">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 h-12 rounded-lg pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <EyeOff size={20} />
                </button>
              </div>
            </div>

            <Button
              disabled={isLoading}
              className={`w-full h-12 bg-gray-800 hover:bg-gray-600 rounded-lg transition-all ${isLoading && "cursor-disabled"}`}
              type="submit"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </form>
        </div>

        {/* {isLoading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-2xl text-gray-500">Loading...</p>
          </div>
        )} */}
      </div>
    </div>
  );
}
