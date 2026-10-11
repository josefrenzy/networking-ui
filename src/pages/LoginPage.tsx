import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
// import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import type { User } from "../types/auth";

// TODO: Uncomment when SSO credentials are ready
// declare global {
//   interface Window {
//     AppleID?: {
//       auth: {
//         init: (config: object) => void;
//         signIn: () => Promise<{
//           authorization: { id_token: string };
//           user?: {
//             name?: { firstName?: string; lastName?: string };
//             email?: string;
//           };
//         }>;
//       };
//     };
//   }
// }

// const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID as string;
// const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI as string;

const LoginPage = () => {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  // TODO: Uncomment Apple SDK injection when credentials are ready
  // useEffect(() => {
  //   if (document.getElementById("apple-signin-sdk")) return;
  //   const script = document.createElement("script");
  //   script.id = "apple-signin-sdk";
  //   script.src =
  //     "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
  //   script.async = true;
  //   script.onload = () => {
  //     window.AppleID?.auth.init({
  //       clientId: APPLE_CLIENT_ID,
  //       scope: "name email",
  //       redirectURI: APPLE_REDIRECT_URI,
  //       usePopup: true,
  //     });
  //   };
  //   document.head.appendChild(script);
  // }, []);

  // TODO: Uncomment Google OAuth flow when credentials are ready
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const res = await fetch(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //         },
  //       );
  //       const profile = await res.json();
  //       const user: User = {
  //         id: profile.sub,
  //         name: profile.name,
  //         email: profile.email,
  //         avatarUrl: profile.picture,
  //         provider: "google",
  //       };
  //       loginWithGoogle(user);
  //     } catch {
  //       console.error("Error obteniendo perfil de Google");
  //     }
  //   },
  //   onError: () => console.error("Google login falló"),
  // });

  // TODO: Uncomment Apple OAuth flow when credentials are ready
  // const handleAppleLogin = async () => {
  //   try {
  //     const response = await window.AppleID?.auth.signIn();
  //     if (!response) return;
  //     const { user: appleUser, authorization } = response;
  //     const user: User = {
  //       id: authorization.id_token,
  //       name: appleUser?.name
  //         ? `${appleUser.name.firstName ?? ""} ${appleUser.name.lastName ?? ""}`.trim()
  //         : "Usuario Apple",
  //       email: appleUser?.email ?? "",
  //       provider: "apple",
  //     };
  //     loginWithApple(user);
  //   } catch {
  //     console.error("Apple login falló");
  //   }
  // };

  // ── Temporary bypass login ──────────────────────────────
  const handleDevLogin = () => {
    loginWithGoogle({
      id: "dev-user-001",
      name: "Dev User",
      email: "dev@networkingui.local",
      avatarUrl: undefined,
      provider: "google",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo / Brand */}
          <Stack sx={{ alignItems: "center", mb: 4 }} spacing={1}>
            <Box
              sx={{
                bgcolor: "primary.main",
                borderRadius: "50%",
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WifiIcon sx={{ fontSize: 36, color: "white" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              NetworkingUI
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Inicia sesión para acceder al panel de control
            </Typography>
          </Stack>

          {/* Dev mode notice */}
          <Alert severity="warning" sx={{ mb: 2, fontSize: "0.8rem" }}>
            Modo desarrollo — SSO desactivado temporalmente
          </Alert>

          <Stack spacing={2}>
            {/* TODO: Uncomment when Google credentials are ready */}
            {/* <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => googleLogin()}
              startIcon={
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              }
              sx={{
                borderColor: "divider",
                color: "text.primary",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              Continuar con Google
            </Button>

            <Divider>
              <Typography variant="caption" color="text.secondary">
                o
              </Typography>
            </Divider>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleAppleLogin}
              startIcon={
                <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              }
              sx={{
                bgcolor: "#000",
                "&:hover": { bgcolor: "#222" },
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              Continuar con Apple
            </Button> */}

            {/* Temporary dev login button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleDevLogin}
            >
              Entrar (modo desarrollo)
            </Button>

            <Divider>
              <Typography variant="caption" color="text.secondary">
                SSO próximamente
              </Typography>
            </Divider>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              disabled
              startIcon={
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              }
              sx={{ justifyContent: "flex-start", gap: 1 }}
            >
              Continuar con Google
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              disabled
              startIcon={
                <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              }
              sx={{ justifyContent: "flex-start", gap: 1 }}
            >
              Continuar con Apple
            </Button>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center", mt: 3 }}
          >
            Al iniciar sesión aceptas nuestros Términos de Servicio y Política
            de Privacidad.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
