import useLoginForm from "../../hooks/useLoginForm";
import FormField from "../../components/common/FormField";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="flex w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left side with image and overlay text */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/Login-img.jpg"
            alt="Sports Court"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-blue-900/70 flex items-center justify-center p-8">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome to Court Link</h2>
              <p className="text-xl mb-6">Book your favorite sports courts with ease</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-green-400 rounded-full"></div>
                  <span className="text-lg">Find available courts nearby</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-blue-400 rounded-full"></div>
                  <span className="text-lg">Book instantly online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
                  <span className="text-lg">Play without hassle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
              <p className="text-gray-600 mt-2">Access your Court Link account</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                register={register}
                error={errors.email}
                className="focus:ring-green-500"
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password}
                className="focus:ring-green-500"
              />
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                  />
                  <label htmlFor="remember" className="text-gray-700">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-green-600 hover:text-green-800 font-medium">
                  Forgot password?
                </Link>
              </div>
              
              <div className="form-control mt-6">
                <Button 
                  type="submit" 
                  className="btn-primary bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl w-full transition duration-300 ease-in-out transform hover:-translate-y-1" 
                  loading={loading}
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-6">
                <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
                <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                  <span className="sr-only">Sign in with Apple</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.146 21.646c-.636.58-1.363.87-2.13.87-1.158 0-2.039-.578-2.643-1.734-.605-1.156-.908-2.767-.908-4.834 0-2.05.352-3.651 1.058-4.798.706-1.147 1.707-1.72 3.003-1.72.706 0 1.344.15 1.917.45.573.301.968.723 1.184 1.267h.071c-.028-.407-.042-.914-.042-1.52V5.203c0-.407.021-.691.063-.852a.818.818 0 01.25-.45c.13-.108.315-.162.557-.162.242 0 .427.057.557.17a.815.815 0 01.25.486c.38.155.56.432.56.832v12.29c0 .407-.018.694-.056.861a.819.819 0 01-.25.457c-.13.108-.315.162-.557.162-.242 0-.427-.057-.557-.17a.821.821 0 01-.25-.486c-.035-.15-.053-.426-.053-.827v-.532zm-1.744-.896c.485 0 .919-.16 1.304-.48.384-.321.576-.722.576-1.202v-5.659c0-.497-.198-.905-.594-1.226-.397-.32-.824-.48-1.283-.48-.763 0-1.329.333-1.7.999-.37.666-.555 1.721-.555 3.166 0 1.446.182 2.501.547 3.167.366.666.932.999 1.705.999zm6.336-9.923c-.664 0-1.198-.235-1.6-.704-.403-.47-.604-1.12-.604-1.95 0-.83.204-1.48.612-1.95.409-.47.94-.704 1.592-.704.651 0 1.182.235 1.592.704.409.47.613 1.12.613 1.95 0 .83-.204 1.48-.613 1.95-.41.47-.94.704-1.592.704zm0-.955c.295 0 .516-.113.663-.338.148-.226.221-.622.221-1.19 0-1.08-.295-1.62-.884-1.62-.589 0-.883.54-.883 1.62 0 1.042.294 1.563.883 1.563z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-green-600 hover:text-green-800 font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;