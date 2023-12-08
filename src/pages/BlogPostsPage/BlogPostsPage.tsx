import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const GET_ARTICLES_URL = `${BASE_URL}/articles`;

export default function BlogPostsPage() {
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
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
  }, [accessToken]);

  return null;
}
