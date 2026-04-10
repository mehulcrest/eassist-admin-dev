import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../constants/auth";
import loginBg from "../assets/login-bg.jfif";
import logoImage from "../assets/logo.png";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // set dummy token
    localStorage.setItem(AUTH_TOKEN_KEY, "dummy_token_123");

    // redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-page">
      <div className="flex min-h-screen w-full flex-col lg:flex-row lg:overflow-hidden">
        <div
          className="relative flex w-full flex-col justify-around gap-16 bg-[#0d1120] py-20 px-20 xxl:px-40 text-white lg:w-1/2"
          style={{
            backgroundImage: `url(${loginBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold">
                <img src={logoImage} alt="eAssist logo" className="w-[100px] h-[95px] rounded-lg object-contain" />
              </div>
              <p className="text-2xl font-semibold">eAssist</p>
            </div>

            <h1 className="mb-4 max-w-sm text-4xl font-semibold leading-tight">
              Welcome to <span className="text-[#E4302F]">eAssist</span> Admin
              Console
            </h1>
            <p className="max-w-md text-lg text-white/80">
              Manage the elder services marketplace with full operational
              visibility.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="13" fill="#DFF3FF"/>
                  <path d="M25 15.4425C25.6718 14.6809 26.5596 14.1419 27.5453 13.8972C28.5309 13.6526 29.5677 13.7139 30.5177 14.073C31.4677 14.4321 32.2857 15.072 32.8631 15.9074C33.4405 16.7429 33.7497 17.7344 33.7497 18.75C33.7497 19.7656 33.4405 20.7571 32.8631 21.5926C32.2857 22.428 31.4677 23.0679 30.5177 23.427C29.5677 23.7861 28.5309 23.8474 27.5453 23.6028C26.5596 23.3581 25.6718 22.8191 25 22.0575M28.75 36.25H13.75V35C13.75 33.0109 14.5402 31.1032 15.9467 29.6967C17.3532 28.2902 19.2609 27.5 21.25 27.5C23.2391 27.5 25.1468 28.2902 26.5533 29.6967C27.9598 31.1032 28.75 33.0109 28.75 35V36.25ZM28.75 36.25H36.25V35C36.2502 33.6834 35.9038 32.3899 35.2456 31.2496C34.5874 30.1093 33.6406 29.1624 32.5005 28.504C31.3603 27.8456 30.0669 27.499 28.7503 27.4989C27.4336 27.4989 26.1402 27.8454 25 28.5038M26.25 18.75C26.25 20.0761 25.7232 21.3479 24.7855 22.2855C23.8479 23.2232 22.5761 23.75 21.25 23.75C19.9239 23.75 18.6521 23.2232 17.7145 22.2855C16.7768 21.3479 16.25 20.0761 16.25 18.75C16.25 17.4239 16.7768 16.1521 17.7145 15.2145C18.6521 14.2768 19.9239 13.75 21.25 13.75C22.5761 13.75 23.8479 14.2768 24.7855 15.2145C25.7232 16.1521 26.25 17.4239 26.25 18.75Z" stroke="url(#paint0_linear_2552_5621)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <defs>
                  <linearGradient id="paint0_linear_2552_5621" x1="25" y1="13.75" x2="25" y2="36.25" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#007AFF"/>
                  <stop offset="1" stop-color="#004999"/>
                  </linearGradient>
                  </defs>
                </svg>
                <div>
                <p className="text-base font-medium">Multi-Role Access</p>
                <p className="mt-1 text-sm text-white/75">
                  Role-based dashboard for every team member.
                </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" rx="13" fill="#FEE0E0"/>
                <path d="M25 20V25L28.75 28.75M36.25 25C36.25 26.4774 35.959 27.9403 35.3936 29.3052C34.8283 30.6701 33.9996 31.9103 32.955 32.955C31.9103 33.9996 30.6701 34.8283 29.3052 35.3936C27.9403 35.959 26.4774 36.25 25 36.25C23.5226 36.25 22.0597 35.959 20.6948 35.3936C19.3299 34.8283 18.0897 33.9996 17.045 32.955C16.0004 31.9103 15.1717 30.6701 14.6064 29.3052C14.041 27.9403 13.75 26.4774 13.75 25C13.75 22.0163 14.9353 19.1548 17.045 17.045C19.1548 14.9353 22.0163 13.75 25 13.75C27.9837 13.75 30.8452 14.9353 32.955 17.045C35.0647 19.1548 36.25 22.0163 36.25 25Z" stroke="url(#paint0_linear_2552_5651)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                <linearGradient id="paint0_linear_2552_5651" x1="25" y1="13.75" x2="25" y2="36.25" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F45A5A"/>
                <stop offset="1" stop-color="#8E3434"/>
                </linearGradient>
                </defs>
              </svg>
              <div>
                <p className="text-base font-medium">Real-Time Operations</p>
                <p className="mt-1 text-sm text-white/75">
                  Live job monitoring and instant interventions.
                </p>
              </div>
            </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" rx="13" fill="#DED9F9"/>
                <path d="M21.25 25L23.75 27.5L28.75 22.5M35.7725 17.48C31.8201 17.6899 27.9459 16.3233 25 13.68C22.0541 16.3233 18.1799 17.6899 14.2275 17.48C13.9094 18.7114 13.749 19.9782 13.75 21.25C13.75 28.2387 18.53 34.1125 25 35.7775C31.47 34.1125 36.25 28.24 36.25 21.25C36.25 19.9475 36.0838 18.685 35.7725 17.48Z" stroke="url(#paint0_linear_2552_5676)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                <linearGradient id="paint0_linear_2552_5676" x1="25" y1="13.68" x2="25" y2="35.7775" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6B51E3"/>
                <stop offset="1" stop-color="#3B2C7D"/>
                </linearGradient>
                </defs>
              </svg>
              <div>
                <p className="text-base font-medium">Compliance Ready</p>
                <p className="mt-1 text-sm text-white/75">
                  Audit trails and regulatory compliant workflows.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-[#f8f8f8] lg:w-1/2 lg:p-0">
          <div className="flex h-full w-full flex-col gap-1 rounded-[20px] px-6 py-4 lg:min-h-screen lg:w-[716px]">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full flex-col rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0px_0px_79px_0px_#0000001C] sm:p-10 lg:w-[480px] lg:p-12">
                <div>
                  <h2 className="text-3xl font-semibold text-navheaderColor">Welcome Back</h2>
                  <p className="mt-2 text-sm text-muted">
                    Sign in to your account with eAssist.
                  </p>
                  <form
                    className="mt-7 space-y-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleLogin();
                    }}
                  >
                    <div>
                      <label className="mb-1 block text-xs font-medium text-inputLabel">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none transition focus:border-gradientVia"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-inputLabel">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="w-full rounded-lg border border-inputBorder px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-gradientVia"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-muted"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[13px]">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="rounded border-inputBorder text-sm" />
                        <span className="text-sm mb-1">Remember this device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Sign In
                    </button>
                  </form>
                  <div className="flex justify-center mt-4">
                      <button type="button" className="text-gradientVia font-medium text-sm">
                        Forgot your password?
                      </button>
                  </div>
                </div>
                <p className="mt-10 text-center text-xs leading-relaxed text-muted">
                  Secure enterprise platform for managing elder services, P2P
                  operations, and marketplace governance.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
            <p className="text-center text-xs text-[#4B5563]">
              All administrative actions are logged for security and compliance.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-[#374151]">
              <button type="button" className="underline underline-offset-2">
                Contact Support
              </button>
              <button type="button" className="underline underline-offset-2">
                Privacy Policy
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;