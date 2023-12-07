const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function AuthPage() {
  const handleClick = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "token",
      scope: "email profile",
    };
    const authUrl =
      `${oauth2Endpoint}?` +
      Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
    window.open(authUrl);
  };

  return (
    <div>
      <button onClick={handleClick}>Sign in with Google</button>
    </div>
  );
}
