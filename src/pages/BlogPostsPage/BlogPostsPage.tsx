import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_VERIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const GET_ARTICLES_URL = `${BASE_URL}/articles`;
const REVOKE_TOKEN_URL = `${BASE_URL}/auth/revoke-token/`;

export default function BlogPostsPage() {
  const accessToken = Cookies.get("access_token");

  const handleGetArticles = () => {
    const getArticles = async () => {
      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(GET_ARTICLES_URL, headers);
        console.log("Data:", response.data);
      } catch (error) {
        console.error("Error during fetch data:", error);
      }
    };

    getArticles();
  };

  const handleSignOut = () => {
    const body = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      token: accessToken,
    };

    const revokeToken = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const revokeToken = await axios.post(REVOKE_TOKEN_URL, body);
      } catch (error) {
        console.error("Error during fetch data:", error);
      }
    };

    revokeToken();
  };

  return (
    <div>
      <button onClick={handleGetArticles}>Get articles</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
