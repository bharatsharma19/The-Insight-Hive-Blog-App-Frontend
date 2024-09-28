import axios from "axios";
import { useState } from "react";
import { LabelledInput } from "./LabelledInput";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { SignUpType, SignInType } from "@bharatsharma19/mediuminputparser";
import { Appbar } from "./Appbar";

// Sign Up Header
const SignUpHeader = () => (
    <div className="text-center px-10">
        <div className="text-3xl font-extrabold">Create an Account</div>
        <div className="text-slate-500">
            Already have an account?
            <Link to="/signin" className="pl-2 underline">Login</Link>
        </div>
    </div>
);

// Sign In Header
const SignInHeader = () => (
    <div className="text-center px-10">
        <div className="text-3xl font-extrabold">Login</div>
        <div className="text-slate-500">
            Don't have an account?
            <Link to="/signup" className="pl-2 underline">Register</Link>
        </div>
    </div>
);

// Sign Up Form
const SignUpForm = ({ postInputs, setPostInputs }: { postInputs: SignUpType; setPostInputs: (inputs: SignUpType) => void }) => (
    <div className="pt-4">
        <LabelledInput label={"Username"} id={"username"} placeholder={"What Should we Call You?"} onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })} />
        <LabelledInput label={"Name"} id={"name"} placeholder={"John Doe"} onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} />
        <LabelledInput label={"Email Address"} id={"email"} placeholder={"john.doe@gmail.com"} onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
        <LabelledInput label={"Contact Number"} id={"contact"} placeholder={"1234567890"} onChange={(e) => setPostInputs({ ...postInputs, contact: e.target.value })} />
        <LabelledInput type={"password"} id={"password"} label={"Password"} placeholder={"Password"} onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} />
    </div>
);

// Sign In Form
const SignInForm = ({ postInputs, setPostInputs }: { postInputs: SignInType; setPostInputs: (inputs: SignInType) => void }) => (
    <div>
        <LabelledInput label={"Email Address"} id={"email"} placeholder={"john.doe@gmail.com"} onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
        <LabelledInput type={"password"} id={"password"} label={"Password"} placeholder={"Password"} onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} />
    </div>
);

// Main Auth component
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();

    const [signUpInputs, setSignUpInputs] = useState<SignUpType>({
        email: "",
        password: "",
        username: "",
        name: "",
        contact: "",
    });

    const [signInInputs, setSignInInputs] = useState<SignInType>({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = async () => {
        setIsLoading(true);
        try {
            await toast.promise(
                axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/user/${type}`,
                    (type === "signup") ? signUpInputs : signInInputs,
                ),
                {
                    loading: (type === "signup" ? "Registering..." : "Logging in..."),
                    success: (type === "signup" ? "Registration Successful" : "Login Successful"),
                    error: (type === "signup" ? "Registration Failed!" : "Login Failed!"),
                }
            ).then((result) => {
                localStorage.setItem("token", result.data.jwt);
                localStorage.setItem("name", result.data.name);
            }).finally(() => {
                navigate("/blogs");
            });
        } catch (error) {
            // Error handling already managed by toast.promise
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center items-center min-h-screen pt-24 px-4 md:px-0"> {/* Added margin-top for content */}
                <div className="w-full max-w-md">
                    {type === "signup" ? (
                        <div>
                            <SignUpHeader />
                            <SignUpForm postInputs={signUpInputs} setPostInputs={setSignUpInputs} />
                        </div>
                    ) : (
                        <div>
                            <SignInHeader />
                            <SignInForm postInputs={signInInputs} setPostInputs={setSignInInputs} />
                        </div>
                    )}

                    <div className="pt-8">
                        <button
                            type="button"
                            id={type === "signup" ? "signup-button" : "signin-button"}
                            className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full w-full"
                            onClick={sendRequest}
                            disabled={isLoading}
                        >
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};
