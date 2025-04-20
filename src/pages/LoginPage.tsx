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
  const [tokenInput, setTokenInput] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (tokenInput.trim()) {
      login(tokenInput.trim());
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome to Vuexy! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-500">Please sign-in to your account</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email or username"
                className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 h-12 rounded-lg"
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
                  placeholder="••••••••••"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 h-12 rounded-lg pr-10"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <EyeOff size={20} />
                </button>
              </div>
            </div>

            <Button
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 rounded-lg"
              onClick={handleLogin}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-gray-300 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor="remember" className="text-gray-600">
                  Remember Me
                </Label>
              </div>
              <a href="/forgot-password" className="text-purple-500 hover:text-purple-600 text-sm">
                Forgot Password?
              </a>
            </div> */
}

{
  /* <div className="text-center">
              <p className="text-gray-500">
                New on our platform?
                <a href="/register" className="text-purple-500 hover:text-purple-600 ml-1">
                  Create an account
                </a>
              </p>
            </div> */
}

{
  /* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div> */
}

{
  /* <div className="flex justify-center space-x-6">
              <button className="text-blue-600 hover:text-blue-700">
                <Facebook size={24} />
              </button>
              <button className="text-blue-400 hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </button>
              <button className="text-gray-800 hover:text-gray-900">
                <Github size={24} />
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="none"
                >
                  <path d="M12 24c6.624 0 12-5.376 12-12S18.624 0 12 0 0 5.376 0 12s5.376 12 12 12z" fill="#fff" />
                  <path d="M12 24c6.624 0 12-5.376 12-12S18.624 0 12 0 0 5.376 0 12s5.376 12 12 12z" fill="#fff" />
                  <path
                    d="M12.0003 4.8C8.0243 4.8 4.8003 8.024 4.8003 12C4.8003 15.976 8.0243 19.2 12.0003 19.2C15.9763 19.2 19.2003 15.976 19.2003 12C19.2003 8.024 15.9763 4.8 12.0003 4.8Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M12.0004 14.4C13.3259 14.4 14.4004 13.3255 14.4004 12C14.4004 10.6745 13.3259 9.6 12.0004 9.6C10.6749 9.6 9.60039 10.6745 9.60039 12C9.60039 13.3255 10.6749 14.4 12.0004 14.4Z"
                    fill="#fff"
                  />
                  <path d="M7.20039 7.2L10.8004 10.8H13.2004L9.60039 7.2H7.20039Z" fill="#FBBC05" />
                  <path d="M13.2004 13.2H10.8004L7.20039 16.8H9.60039L13.2004 13.2Z" fill="#34A853" />
                  <path d="M16.8004 7.2H14.4004L10.8004 10.8H13.2004L16.8004 7.2Z" fill="#4285F4" />
                  <path d="M13.2004 13.2L14.4004 14.4L16.8004 16.8L13.2004 13.2Z" fill="#4285F4" />
                  <path d="M16.8004 16.8L14.4004 14.4L13.2004 13.2H10.8004L7.20039 16.8H16.8004Z" fill="#EA4335" />
                  <path d="M7.20039 7.2L10.8004 10.8L13.2004 13.2L14.4004 14.4L16.8004 16.8V7.2H7.20039Z" fill="none" />
                </svg>
              </button>
            </div> */
}
