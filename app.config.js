export default ({ config }) => {
    const ENV = process.env.EXPO_PUBLIC_ENV || "production";
  
    const ENV_CONFIG = {
      development: {
        API_URL: "https://vodiumtravels-api.onrender.com/api/v1",
        SOCKET_URL: "https://vodiumtravels-api.onrender.com",
      },
      production: {
        API_URL: "https://vodiumtravels-api.onrender.com/api/v1",
        SOCKET_URL: "https://vodiumtravels-api.onrender.com",
      },
    };
  
    return {
      ...config,
      name: "Vodium",
      slug: "vodium",
      extra: {
        ...ENV_CONFIG[ENV],
      },
    };
  };
  