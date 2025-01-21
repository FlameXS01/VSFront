export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@sidebase/nuxt-auth",
  ],

  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.backend_url, // Variable de entorno para el backend
    },
  },

  auth: {
    baseURL: process.env.backend_url, // URL base de tu backend
    provider: {
      type: "local",
      endpoints: {
        
        signIn: {
          path: "/api/user/login",
          method: "post"
        },
        signUp: {
          path: "/api/user/add-usuario",
          method: "post"
        },
        signOut: {
          path: "/api/user/out-session",
          method: "post"
        },
        getSession: {
          path: "/api/user/usuario-by-id/me", ///dudas acerca de esto 
          method: "get"
        }
      },
      pages: {
        login: "/login" // Página de inicio de sesión en tu frontend
      },
      session: {
        dataType: {
          id: 'number',
          username: 'string',
          email: 'string',
          phone_number: 'string',
          rol: "'administrador' | 'usuario'",
          //twoFactorEnabled: "boolean", // Opcional según el diseño
        },
        dataResponsePointer: "/" 
      },
      token: {
        signInResponseTokenPointer: "/accessToken", 
        maxAgeInSeconds: 3600, 
        type: "Bearer", 
        headerName: "Authorization" 
      },
      refresh: {
        isEnabled: true, 
        endpoint: {
          path: '/CheckpointReviews/usuarios/refresh-token', // Ruta para renovar el access token
          method: 'post'
        },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refreshToken', // Ruta al refresh token en la respuesta
          refreshRequestTokenPointer: '/refreshToken', // Ruta al token enviado para renovar
          maxAgeInSeconds: 86400, // Tiempo de vida del refresh token (1 días)
          cookieName: 'refresh_token' // Nombre de la cookie para almacenar el refresh token (opcional)
        }
      }
    },
    globalAppMiddleware: {
      isEnabled: true, // Habilitar middleware global
      allow404WithoutAuth: true // Permitir 404 sin autenticación
    }
  },
    compatibilityDate: '2025-01-15'
});