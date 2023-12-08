import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Cookies from "js-cookie";
import { routes } from "../../App";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_VERIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const CONVERT_TOKEN_URL = `${BASE_URL}/auth/convert-token/`;

export default function AuthVerificationPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();

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

        Cookies.set("access_token", tokenData.access_token, {
          expires: tokenData.expires_in,
          secure: true,
        });
        Cookies.set("refresh_token", tokenData.refresh_token, {
          expires: tokenData.expires_in,
          secure: true,
        });
      } catch (error) {
        console.error("Error during fetch data:", error);
      }
    };
    exchangeGoogleAccessToken().then(() => navigate(routes.POSTS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return null;
}
