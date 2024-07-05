import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";

export const userInactivityStorage = new MMKV({
  id: "inactivty-storage",
});

const Provider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const locked = userInactivityStorage.getBoolean("locked") || false;

    if (locked) {
      router.replace("/(authenticated)/(modals)/lock");
    }

    if (nextAppState === "background") {
      recordStartTime();
    }

    if (nextAppState === "active" && appState.current.match(/background/)) {
      const elapsed =
        Date.now() - (userInactivityStorage.getNumber("startTime") || 0);

      if (elapsed > 3000 && isSignedIn) {
        router.replace("/(authenticated)/(modals)/lock");
        userInactivityStorage.set("locked", true);
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    userInactivityStorage.set("startTime", Date.now());
  };

  return children;
};

export default Provider;
