import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

function Login() {
    
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
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
    }, []);

    return (
        <div>
            this is a page to register users
            <div id="signInDiv" className="w-64"></div>
        </div>
    )
}

export default Login