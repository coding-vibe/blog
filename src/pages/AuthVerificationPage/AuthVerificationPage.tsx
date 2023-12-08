import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";
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

        const response = await axios.post(CONVERT_TOKEN_URL, body);

        const { access_token, expires_in, refresh_token } = response.data;

        Cookies.set("access_token", access_token, {
          expires: expires_in,
          secure: true,
        });
        Cookies.set("refresh_token", refresh_token, {
          expires: expires_in,
          secure: true,
        });

        navigate(routes.POSTS);
      } catch (error) {
        console.error("Error during fetch data:", error);
      }
    };
    exchangeGoogleAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return null;
}
