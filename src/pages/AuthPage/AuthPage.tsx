export default function AuthPage() {
  const handleClick = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      client_id:
        "931479452772-cvdr2ksv1ruvs0c0thg6jvs4dqk153t4.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/verify-auth",
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
