import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import checkmark from "../assets/checkmark.png";
import foodsafety from "../assets/food-safety.png";
import Axios from 'axios'

function Login({ user, setUser, isAuthenticated, setIsAuthenticated }) {
    
    // initialize (or retrieve) `user`
    // useEffect renders or loads everything inside, "[isAuthenticated]" makes this render everytime isAuthenticated changes
    useEffect(() => {
        // if authenticated, don't render login button
        if (isAuthenticated) {
            // hide sign in button when user is logged in
            document.getElementById("signInDiv").hidden = true
        } else {
            // only attempt to login if NOT authenticated
            try {
                /* global google */
                // Initilizes the sign in with Google. If the Google API returns something, then we will handle that response with handleCallbackResponse **** <- unsure
                google.accounts.id.initialize({
                    client_id: "1040079796712-hqafp6aje8gvaa6iotq38i478h5n8f83.apps.googleusercontent.com",
                    callback: handleCallbackResponse
                });

                // Creates a sign in with Google button, with the button being placed within the "signInDiv" container
                google.accounts.id.renderButton(
                    document.getElementById("signInDiv"),
                    { theme: "outline", size: "large", shape: "pill" }
                )

                //prompts user and asks if they want to log in with previously used accounts
                google.accounts.id.prompt();
            } catch (error) {
                console.log("Error signing in user with Google:", error)
            }
        }
    }, [isAuthenticated])

    // update authentication status every time `user` object changes
    useEffect(() => {
        setIsAuthenticated(Object.keys(user).length > 0) // true if length > 0
    }, [user])

    function handleCallbackResponse(response) {
        //console.log("Encoded JWT ID Token: " + response.credential)

        // response.credential are the Google user's credentials, jwtDecode is for decryption
        var userObject = jwtDecode(response.credential)

        //console.log("user:", userObject)

        // Sets the user to userObject, which is an class with attributes that represent credentials about the user
        setUser(userObject)

        // store user in local storage
        localStorage.setItem('user', JSON.stringify(userObject))

        // hides sign in button when user is logged in (caution: only hides it, user can still click on it)
        document.getElementById("signInDiv").hidden = true

        // body : object of data being sent to backend endpoint
        const body = {
            name: userObject.name,
            email: userObject.email,
            user_id: userObject.sub
        }
        // Call backend's MongoDB 'createUsers' endpoint to create the user, backend sends "response" back ("response" pretty useless unless debugging)
        // Backend takes in "req.body", which is the name & email retrieved from Google
        Axios.post("http://localhost:3000/users/createUsers", body)
            .then((response) => {
                console.log("Create User API call response: " + response)
            })
    }

    // For when the user clicks the sign out button
    function handleSignOut(event) {

        // Sets current `user` to nothing and updates `isAuthenticated`
        setUser({})
        setIsAuthenticated(false)

        // Restores the sign in button (Makes it re-appear)
        // NOTE: likely want to replace this with something that will automatically navigate user back to "login" page. (Assuming currently NOT in login page)
        document.getElementById("signInDiv").hidden = false

        // clear user from local storage
        localStorage.removeItem('user')
    }


    // If we have no user: sign in button
    // If we have a user: show the log out button

    return (
        <div className="flex justify-center items-center mt-[150px] ml-[300px] mr-[300px]">
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
            <div className="box-border h-[500px] w-[600px] min-w-[400px] rounded-3xl bg-[#B28370] boxShadow">
                {/* Sign Out Button */}
                {isAuthenticated ? 
                    <button className="google-btn w-60 h-10" onClick={(e) => handleSignOut(e)}>
                        Sign Out
                    </button>
                    :
                    <div className='flex flex-col gap-[50px] text-white'>
                        <div className='flex flex-col gap-[20px] mt-[80px] ml-[50px] mr-[50px]'>
                            <h1 className="text-[40px] font-semibold">Sign up or log in</h1>
                            <p className="text-[20px]">Login below to start utilizing GrubGallery’s advanced features (e.g. Google Calendar, personalized meal suggestions...)</p>
                        </div>
                        
                        <div id="signInDiv" className="mb-4 md:mb-0 ml-auto mr-auto"></div>
                    </div>
                }

                {/* Login Page Content (can't remove this fudging thing for some reason (app will break) */}
                <div id="signInDiv" className="mb-4 md:mb-0"></div>
            </div>

        </div>

    )
}

export default Login