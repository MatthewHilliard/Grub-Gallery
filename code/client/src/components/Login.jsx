import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

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
        <div>
            this is a page to register users
            <div id="signInDiv" className="w-64"></div>
            {/* If the user is not empty, show sign out button*/}
            { Object.keys(user).length != 0 &&
                <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
            }
            {/* shows name and pfp of google user */}
            {   user && 
                <div> 
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            }   
        </div>
    )
}

export default Login