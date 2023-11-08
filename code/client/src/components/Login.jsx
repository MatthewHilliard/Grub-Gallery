import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import checkmark from "../assets/checkmark.png";
import foodsafety from "../assets/food-safety.png";
import Axios from 'axios'

function Login({ user, setUser, isAuthenticated, setIsAuthenticated }) {
    console.log("user:", user, isAuthenticated)
    // initialize (or retrieve) `user`
    useEffect(() => {
        // check localStorage cache to see if user has been saved
        const localStorageUser = localStorage.getItem('user')
        if (localStorageUser) {
            // update user and authentication status
            setUser(JSON.parse(localStorageUser))
            setIsAuthenticated(true)
        } else if (!isAuthenticated) {
            // only attempt to login if NOT authenticated
            try {
                /* global google */
                google.accounts.id.initialize({
                    client_id: "1040079796712-hqafp6aje8gvaa6iotq38i478h5n8f83.apps.googleusercontent.com",
                    callback: handleCallbackResponse
                });
            
                google.accounts.id.renderButton(
                    document.getElementById("signInDiv"),
                    { theme: "outline", size: "large"}
                )
                //prompts user and asks if they want to log in with previously used accounts
                google.accounts.id.prompt();
            } catch (error) {
                console.log("Error signing in user with Google:", error)
            }
        }
    }, [])

    // update authentication status every time `user` object changes
    useEffect(() => {
        setIsAuthenticated(Object.keys(user).length > 0) // true if length > 0
    }, [user])

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential)
        var userObject = jwtDecode(response.credential)
        console.log("user:", userObject)
        // update `user` state
        setUser(userObject)

        // store user in local storage
        localStorage.setItem('user', JSON.stringify(userObject))

        // hide sign in button when user is logged in
        document.getElementById("signInDiv").hidden = true

        // call MongoDB `createUsers` endpoint
        Axios.post("http://localhost:3000/users/createUsers", {
            name: userObject.name,
            email: userObject.email
          })
          .then((response) => {
            console.log(response)
          })
    }
    
    function handleSignOut(event) {
        setUser({})
        // hides sign in button when user is logged in
        document.getElementById("signInDiv").hidden = false
        // clear user from local storage
        localStorage.removeItem('user')
    }
    

    // If we have no user: sign in button
    // If we have a user: show the log out button

    return (
        <div className="grid grid-cols-2 gap-y-6 relative top-[150px] flex-shrink-0">
            <div className="pl-60">
                <img src={foodsafety} className="h-80 w-80"/>
            </div>

            {/* If the user is not empty, show sign out button (otherwise show sign-in */}
            {isAuthenticated &&
                <>
                    <button className="google-btn w-60 h-10" onClick={(e) => handleSignOut(e)}>Sign Out</button>
                    <div> 
                        <img src={user.picture}></img>
                        <h3>{user.name}</h3>
                    </div>
                </>
            }
            <div id="signInDiv" className="row-span-2"></div>

            <div className="col-span-2 pl-[130px] py-4">
                <h1 className="text-4xl font-semibold">Find healthy and trusted recipes</h1>
            </div>
            <div className="col-span-2 pl-[160px] flex">
                <img src={checkmark} className="h-8 pr-5"/>
                <h1 className="text-2xl">Find your favorite meals and recipes</h1>
            </div>
            <div className="col-span-2 pl-[160px] flex">
                <img src={checkmark} className="h-8 pr-5"/>
                <h1 className="text-2xl">Filter suggestions for allergens, macros... etc.</h1>
            </div>
            <div className="col-span-2 pl-[160px] flex">
                <img src={checkmark} className="h-8 pr-5"/>
                <h1 className="text-2xl">Instantly save recipes with Google Calender</h1>
            </div>
        </div>
    )
}

export default Login