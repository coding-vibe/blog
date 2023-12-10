import queryString from "query-string";

const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";

export default function AuthPage() {
  const handleClick = () => {
    const query = {
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "token",
      scope: "email profile",
    };
    const authUrl = queryString.stringifyUrl({
      url: AUTHORIZATION_ENDPOINT,
      query,
    });

    window.open(authUrl);
  };

  return <button onClick={handleClick}>Sign in with Google</button>;
}
