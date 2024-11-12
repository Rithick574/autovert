import { Helmet } from "react-helmet";
import Header from "../../components/navbars/AuthHeader";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../store/actions/user.actions";
import { AdminvalidationSchema } from "../../validation/Auth";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import LoginBG from "../../assets/animation/loginBg.json";
import { LoaderPinwheel } from "lucide-react";

const Login: React.FC = () => {
  const { error, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: AdminvalidationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(adminLogin(values)).unwrap();
        if (resultAction) {
          navigate("/admin/dashboard");
        }
      } catch (error: unknown) {
        console.log(error, "Error during login");
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login as Admin</title>
      </Helmet>
      <div className=" ">
        <Header />
        <section className="w-full h-screen pt-7 px-3 flex justify-center items-center bg-white dark:bg-dark-bg dark:text-dark-text">
          <div className="w-full dark:mt-11 h-[80%] flex justify-center pb-4 items-center flex-col">
            <div className="bg-white dark:bg-neutral-900 flex flex-col items-center p-7 lg:p9 rounded-xl ">
              <div className="flex flex-col bg--400 justify-center items-center text-center p-4 mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-48 mb-4"
                >
                  <Lottie
                    loop
                    autoplay
                    className="w-full h-full"
                    animationData={LoginBG}
                  />
                </motion.div>
                <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl">
                  Welcome to SyncWorks
                </h1>
                <h4 className="text-gray-400 text-sm">
                  Enter your details for admin privilege
                </h4>
              </div>
              <div className="flex w-[100%] bg--500 md:w-[400px] flex-col justify-center bg-grey-400 items-center text-center ">
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4 w-full"
                >
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-[-10px] flex justify-start">
                      {formik.errors.email}
                    </div>
                  )}

                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-[-10px] flex justify-start">
                      {formik.errors.password}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-syncworks-blue text-white font-semibold p-2 rounded-lg hover:opacity-95 disabled:opacity-80 mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex justify-center items-center gap-2">
                        Processing{" "}
                        <LoaderPinwheel className="w-5 animate-spin" />
                      </span>
                    ) : (
                      "Log in"
                    )}
                  </button>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
