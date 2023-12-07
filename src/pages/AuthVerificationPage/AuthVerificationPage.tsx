import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_VERIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const CONVERT_TOKEN_URL = `${BASE_URL}/auth/convert-token/`;
const GET_ARTICLES_URL = `${BASE_URL}/articles`;

export default function AuthVerificationPage() {
  const { hash } = useLocation();
  const TOKEN = hash.slice(14, 231);

  useEffect(() => {
    const exchangeGoogleAccessToken = async () => {
      const body = {
        grant_type: "convert_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        backend: "google-oauth2",
        token: TOKEN,
      };

      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      };

      try {
        const response = await fetch(CONVERT_TOKEN_URL, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const getArticles = async () => {
          const requestOptions = {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
            method: "GET",
          };

          try {
            const response = await fetch(GET_ARTICLES_URL, requestOptions);
            const data = await response.json();
            console.log("Data:", data);
          } catch (error) {
            console.error("Error during load articles:", error);
          }
        };
        getArticles();
      } catch (error) {
        console.error("Error during exchange google access token:", error);
      }
    };
    exchangeGoogleAccessToken();
  }, [TOKEN]);

  return null;
}
