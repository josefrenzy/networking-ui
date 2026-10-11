# NetworkingUI

Dashboard de red construido con **React 19 + TypeScript + Material UI v7**.

## Stack

| Capa | Tecnología |
|---|---|
| Framework UI | React 19 + TypeScript |
| Componentes | Material UI v7 |
| Routing | React Router DOM v7 |
| Auth SSO | `@react-oauth/google` + Apple Sign In JS SDK |
| Build | Vite |

## Funcionalidades

- 🔐 **Login con SSO**: Google OAuth 2.0 y Apple Sign In
- 📊 **Dashboard general**: tarjetas de métricas, gráfica de ancho de banda, utilización de red
- 🖥️ **Estado de dispositivos**: router, switches, APs, firewall con indicadores de estado
- 📋 **Actividad reciente**: feed de eventos de red
- 🔒 **Rutas protegidas**: redirige a `/login` si no hay sesión activa
- 📱 **Responsive**: sidebar colapsable en móvil

## Inicio rápido

```bash
# 1. Instala dependencias
npm install

# 2. Configura variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# 3. Levanta en desarrollo
npm run dev
```

## Configuración de SSO

### Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto → **APIs & Services → Credentials → OAuth 2.0 Client ID**
3. Agrega `http://localhost:5173` como **Authorized JavaScript origin**
4. Copia el Client ID y ponlo en `.env`:

```
VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
```

### Apple

1. Ve a [Apple Developer](https://developer.apple.com/) → **Certificates, Identifiers & Profiles**
2. Crea un **Services ID** (tipo "Sign In with Apple")
3. Registra el dominio y el redirect URI
4. Ponlos en `.env`:

```
VITE_APPLE_CLIENT_ID=com.yourcompany.networking-ui
VITE_APPLE_REDIRECT_URI=https://yourdomain.com/auth/apple/callback
```

> **Nota:** Apple Sign In con popup requiere HTTPS en producción. En desarrollo puedes usar un dominio registrado o proxy HTTPS.

## Estructura del proyecto

```
src/
├── context/        # AuthContext (estado de sesión)
├── components/
│   ├── layout/     # MainLayout (AppBar + Sidebar)
│   └── ProtectedRoute.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── PlaceholderPage.tsx
├── theme/          # Tema MUI personalizado
└── types/          # Tipos TypeScript (User, AuthState)
```
