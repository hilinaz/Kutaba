import backg from "../assets/splash 4.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <section
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: `url(${backg})` }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-20 w-full p-5 flex justify-between items-center mt-6 ">
          <div className="text-white font-extrabold text-2xl flex gap-2 items-center ml-[2rem]">
            <img
              className="rounded-full w-10 h-10 object-cover"
              src={logo}
              alt="BugIT Logo"
            />
            <p>BugIT</p>
          </div>

          <div className="flex gap-4 sm:gap-6 text-white text-lg font-medium mr-6  sm:mr-7">
            <button
              onClick={() => navigate("/signin")}
              className="rounded-full px-5 py-2 text-orange-500 
                         transition duration-300 ease-in-out hover:bg-[#ff7700] hover:text-white"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="text-white px-4 py-2 transition duration-300 ease-in-out hover:text-orange-400"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="relative z-10 flex-grow flex items-center justify-start px-8 sm:px-16">
          <div className="max-w-xl">
            <p className="text-white mb-5 text-lg  uppercase tracking-wider">
              Set budgets, and reach financial goals
            </p>
            <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-8">
              Take Control of Your Money. Efficiently Track Every Expense
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() => navigate("/home")}
                className="text-white px-10 py-3 rounded-lg font-semibold
                           bg-[#ff7700] hover:bg-orange-700 
                           transition duration-300 ease-in-out shadow-lg 
                           focus:outline-none focus:ring-4 focus:ring-orange-600/50"
              >
                Free Start
              </button>

              <button
                className="text-white px-10 py-3 rounded-lg font-semibold
                           border border-white hover:border-orange-500 hover:text-orange-500
                           hover:bg-white transition duration-300 ease-in-out 
                           focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 sm:px-16 bg-white text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Next Section: Features & Benefits
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl">
          This is the section that comes after your hero background. You can add
          features, pricing, testimonials, or whatever content you need here to
          encourage sign-ups.
        </p>
      </section>
    </div>
  );
}

export default Landing;
