import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import checkmark from "../assets/checkmark.png";
import foodsafety from "../assets/food-safety.png";
import Axios from 'axios'

function Login({ user, setUser, isAuthenticated, setIsAuthenticated }) {
    //console.log("user:", user, isAuthenticated)

    // initialize (or retrieve) `user`
    // useEffect renders or loads everything inside, "[]" makes this render once
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
                    { theme: "outline", size: "large" }
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

        // Call backend's MongoDB 'createUsers' endpoint to create the user, backend sends "response" back ("response" pretty useless unless debugging)
        // Backend takes in "req.body", which is the name & email retrieved from Google
        Axios.post("http://localhost:3000/users/createUsers", {
            name: userObject.name,
            email: userObject.email
        })
            .then((response) => {
                console.log(response)
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
        <div className="grid grid-cols-2 gap-y-6 relative top-[150px] flex-shrink-0"> {/* Outter grid for entire web page */}

            {/* For the photo */}
            <div className="pl-60">
                <img src={foodsafety} className="h-80 w-80" />
            </div>

            {/* If the user is not empty, show sign out button (otherwise show sign-in */}
            {
                isAuthenticated &&
                <>
                    <button className="google-btn w-60 h-10" onClick={(e) => handleSignOut(e)}>Sign Out</button>
                </>
            }
            {/* This is for the "login" page, displays checkmarks and text about the benefits of loggin in */}

            <div id="signInDiv" className="row-span-2"></div>

            <div className="col-span-2 pl-[130px] py-4">
                <h1 className="text-4xl font-semibold">Find healthy and trusted recipes</h1>
            </div>
            <div className="col-span-2 pl-[160px] flex">
                <img src={checkmark} className="h-8 pr-5" />
                <h1 className="text-2xl">Find your favorite meals and recipes</h1>
            </div>
            <div className="col-span-2 pl-[160px] flex">
                <img src={checkmark} className="h-8 pr-5" />
                <h1 className="text-2xl">Filter suggestions for allergens, macros... etc.</h1>
            </div>
            <div className="col-span-2 pl-[160px] flex">
                <img src={checkmark} className="h-8 pr-5" />
                <h1 className="text-2xl">Instantly save recipes with Google Calender</h1>
            </div>
        </div >
    )
}

export default Login