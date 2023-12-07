import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_VERIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const CONVERT_TOKEN_URL = `${BASE_URL}/auth/convert-token/`;
const GET_ARTICLES_URL = `${BASE_URL}/articles`;

export default function AuthVerificationPage() {
  const { hash } = useLocation();

  useEffect(() => {
    const token = queryString.parse(hash).access_token;

    const exchangeGoogleAccessToken = async () => {
      try {
        const body = {
          grant_type: "convert_token",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          backend: "google-oauth2",
          token,
        };
        const convertTokenRequestOptions = {
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        };
        const fetchTokenConversion = await fetch(
          CONVERT_TOKEN_URL,
          convertTokenRequestOptions
        );
        if (!fetchTokenConversion.ok) {
          throw new Error(`HTTP error! Status: ${fetchTokenConversion.status}`);
        }
        const tokenData = await fetchTokenConversion.json();

        const getArticlesRequestOptions = {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
          method: "GET",
        };
        const fetchArticles = await fetch(
          GET_ARTICLES_URL,
          getArticlesRequestOptions
        );
        const articlesData = await fetchArticles.json();
        console.log("Data:", articlesData);
      } catch (error) {
        console.error("Error during fetch data:", error);
      }
    };
    exchangeGoogleAccessToken();
  }, [hash]);

  return null;
}
