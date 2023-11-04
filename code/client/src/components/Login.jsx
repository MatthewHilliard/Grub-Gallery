import { useEffect } from 'react';

function Login() {
    
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

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential);
    }
  
    return (
        <div>
            this is a page to register users
            <div id="signInDiv" className="w-64"></div>
        </div>
    )
}

export default Login