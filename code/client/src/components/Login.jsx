// import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { signInWithGoogle, handleSignOut } from "../Firebase"
import Axios from 'axios'
import checkmark from "../assets/checkmark.png";
import foodsafety from "../assets/food-safety.png";

function Login({ isAuthenticated }) {

    // handleSignIn : calls signInWithGoogle function from Firebase.js and sends user to backend
    const handleSignIn = async () => {
        try {
            // if google auth fails (jump to error catch)
            const { result } = await signInWithGoogle();
            if (result) {
                // body: object of data being sent to backend endpoint
                const body = {
                    name: result.displayName,
                    email: result.email,
                    user_id: result.uid
                };


                // Call backend's MongoDB 'createUsers' endpoint to create the user
                Axios.post("http://localhost:3000/users/createUser", body)
                    .then((response) => {
                        console.log("Create User API call response: ", response);
                    })
                    .catch((error) => {
                        console.log("Error making Axios post request:", error);
                    });
            }

        } catch (error) {
            console.log("Error handling sign in:", error);
        }
    };


    return (
        <div className="flex justify-center items-center gap-[200px] mt-[100px] ml-[100px] mr-[100px]">
            {/* Column 1 */}
            <div className='flex flex-col gap-[50px] items-center mr-auto'>
                <img src={foodsafety} className="max-w-[300px]" />


                {/* Main Content */}
                <h1 className="text-[34px] font-semibold">Find healthy and trusted recipes</h1>

                {/* Checkmarks and Text */}
                <div className="flex flex-col gap-[20px] text-[24px]">
                    <div className="flex items-center mb-4">
                        <img src={checkmark} className="h-8 pr-5" />
                        <h1>Find your favorite meals and recipes</h1>
                    </div>
                    <div className="flex items-center mb-4">
                        <img src={checkmark} className="h-8 pr-5" />
                        <h1>Filter suggestions for allergens, macros... etc.</h1>
                    </div>
                    <div className="flex items-center">
                        <img src={checkmark} className="h-8 pr-5" />
                        <h1>
                            Instantly save recipes with{' '}
                            <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer" className="underline">
                                Google Calendar
                            </a>
                        </h1>
                    </div>
                </div>

            </div>


            {/* Column 2 */}
            <div className="flex justify-center items-center box-border h-[500px] w-[600px] min-w-[400px] rounded-3xl bg-[#B28370] boxShadow">
                {/* Sign Out Button */}
                {isAuthenticated ?
                    <button className="google-btn w-60 " onClick={handleSignOut}>
                        Sign Out
                    </button>
                    :
                    <div className='flex flex-col gap-[50px] text-white'>
                        <div className='flex flex-col gap-[20px] mt-[80px] ml-[50px] mr-[50px]'>
                            <h1 className="text-[40px] font-semibold">Sign up or log in</h1>
                            <p className="text-[20px]">Login below to start utilizing GrubGallery’s advanced features (e.g. Google Calendar, personalized meal suggestions...)</p>
                        </div>

                        <button className="google-btn mb-4 md:mb-0 ml-auto mr-auto" onClick={handleSignIn}>
                            Sign In With Google
                        </button>
                    </div>
                }
            </div>

        </div>

    )
}

export default Login