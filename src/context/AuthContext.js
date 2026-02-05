import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingSeen, setOnboardingSeen] = useState(false);

  /* =========================
     BOOTSTRAP (APP START)
  ========================= */
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        // Onboarding state
        const seen = await AsyncStorage.getItem(
          "vodium_onboarding_seen"
        );
        setOnboardingSeen(!!seen);

        // Auth state (cookie-like)
        const storedToken = await AsyncStorage.getItem(
          "vodium_token"
        );
        const storedUser = await AsyncStorage.getItem(
          "vodium_user"
        );

        // Only restore session if BOTH exist
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          api.defaults.headers.common.Authorization =
            `Bearer ${storedToken}`;
        }
      } catch (err) {
        console.log("Auth bootstrap error", err);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  /* =========================
     LOGIN
     (cookie-like persistence)
  ========================= */
  const login = async (token, user, remember = true) => {
    setToken(token);
    setUser(user);

    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    if (remember) {
      await AsyncStorage.setItem("vodium_token", token);
      await AsyncStorage.setItem(
        "vodium_user",
        JSON.stringify(user)
      );
    }
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = async () => {
    setToken(null);
    setUser(null);

    delete api.defaults.headers.common.Authorization;

    await AsyncStorage.removeItem("vodium_token");
    await AsyncStorage.removeItem("vodium_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        onboardingSeen,
        setOnboardingSeen,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
