import { Helmet } from "react-helmet";
import Header from "../../components/navbars/AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { register, registerGoogle } from "../../store/actions/user.actions";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../../validation/Auth";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Register: React.FC = () => {
  const { error, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const registerWithGoogle = (data: any) => {
    dispatch(registerGoogle(data));
  };
  return (
    <>
      <Helmet>
        <title>Register to SyncWorks</title>
      </Helmet>
      <div>
        <Header />
      </div>
      <section className="w-full dark:bg-dark-bg items-center  h-screen pt-7 px-3 flex justify-center ">
        <div className="w-full h-[80%] md:w-[500px] rounded-xl pb-10 mt-9 flex justify-center pt-9 items-center flex-col">
          <div className="flex flex-col justify-center  items-center text-center p-4 mb-4">
            <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl dark:text-dark-text ">
              Welcome to SyncWorks,
            </h1>
            <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl dark:text-dark-text">
              Sign Up to get Started.
            </h1>
            
            <h4 className="text-gray-400 text-sm dark:text-neutral-300">
              Enter your details to proceed further
            </h4>
          </div>
          <div className="flex w-[90%] md:w-[400px] flex-col justify-center bg-grey-400 items-center text-center">
            <div className="mt-[-10px] mb-5">
              {error && typeof error === "string" && (
                <p className="text-red-500">{error}</p>
              )}
            </div>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={toFormikValidationSchema(validationSchema)}
              onSubmit={async (values) => {
                try {
                  if (!executeRecaptcha) {
                    console.log("Execute recaptcha not yet available");
                    return;
                  }
                  const token = await executeRecaptcha("register_form");
                  console.log("reCAPTCHA Token:", token);
                  const resultAction = await dispatch(register(values));
                  if (register.fulfilled.match(resultAction)) {
                    navigate("/verify-data", { state: { formData: values } });
                  }
                } catch (error: unknown) {
                  console.log(error, "Error during signup");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4 w-full">
                  <div className="relative flex justify-between">
                    <div className="flex flex-col w-[48%]">
                      <Field
                        type="text"
                        placeholder="First name"
                        id="firstname"
                        name="firstname"
                        className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none  focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                      />
                    </div>

                    <div className="flex flex-col w-[48%]">
                      <Field
                        type="text"
                        placeholder="Last name"
                        id="lastname"
                        name="lastname"
                        className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none  focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Field
                      type="text"
                      placeholder="Email"
                      id="email"
                      name="email"
                      className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none  focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <div className="relative">
                    <Field
                      type="password"
                      placeholder="Create Password"
                      id="password"
                      name="password"
                      className="bg-slate-100 p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-600 dark:text-white w-full border-gray-200 focus:border-blue-200 focus:outline-none  focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <div className="relative">
                    <Field
                      type="password"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="bg-slate-100 dark:bg-neutral-800 dark:border-neutral-600 p-2 rounded-lg border dark:text-white  w-full border-gray-200    focus:outline-none  focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="bg-syncworks-blue text-white font-semibold p-2 rounded-lg  hover:opacity-95 disabled:opacity-80 mt-9"
                  >
                    {loading || isSubmitting ? (
                      <>
                        <span className="flex justify-center items-center gap-2">
                          Processing
                          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvYWRlci1waW53aGVlbCI+PHBhdGggZD0iTTIyIDEyYTEgMSAwIDAgMS0xMCAwIDEgMSAwIDAgMC0xMCAwIi8+PHBhdGggZD0iTTcgMjAuN2ExIDEgMCAxIDEgNS04LjcgMSAxIDAgMSAwIDUtOC42Ii8+PHBhdGggZD0iTTcgMy4zYTEgMSAwIDEgMSA1IDguNiAxIDEgMCAxIDAgNSA4LjYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==" className="w-5 animate-spin" />
                      
                        {/*<LoaderPinwheel className="w-5 animate-spin" /> */}
                        </span>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <p className="mb-[-10px] dark:text-white">or</p>
                  <div className="flex justify-center w-full ">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        registerWithGoogle(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                      size="large"
                      shape="circle"
                      width="300"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
