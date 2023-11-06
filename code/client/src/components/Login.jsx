import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import checkmark from "../assets/checkmark.png";
import foodsafety from "../assets/food-safety.png";

function Login() {
    const [ user, setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
        //hides sign in button when user is logged in
        document.getElementById("signInDiv").hidden = true;
    }
    
    function handleSignOut(event) {
        setUser({});
        //restores the sign in button when user logs out
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
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
    }, []);

    //If we have no user: sign in button
    //If we have a user: show the log out button

    return (
        <div className="grid grid-cols-2 gap-y-6 relative top-[150px] flex-shrink-0">
            <div className="pl-60">
                <img src={foodsafety} className="h-80 w-80"/>
            </div>
            <div id="signInDiv" className="row-span-2"></div>
            {/* If the user is not empty, show sign out button*/}
            { Object.keys(user).length != 0 &&
                <button className = "w-64" onClick={ (e) => handleSignOut(e)}>Sign Out</button>
            }
            {/* shows name and pfp of google user */}
            {   user && 
                <div> 
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            }       
            <div className="col-span-2 pl-[130px] py-4">
                <h1 className="text-4xl font-semibold">Find healthy and trusted recipes</h1>
            </div>
            <div className="col-span-2 pl-[200px] flex">
                <img src={checkmark} class="h-8 pr-5"/>
                <h1 className="text-2xl">Find your favorite meals and recipes</h1>
            </div>
            <div className="col-span-2 pl-[200px] flex">
                <img src={checkmark} class="h-8 pr-5"/>
                <h1 className="text-2xl">Filter suggestions for allergens, macros... etc.</h1>
            </div>
            <div className="col-span-2 pl-[200px] flex">
                <img src={checkmark} class="h-8 pr-5"/>
                <h1 className="text-2xl">Instantly save recipes with Google Calender</h1>
            </div>
        </div>
    )
}

export default Login