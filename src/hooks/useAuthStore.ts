import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setAuthUser, clearAuthUser } from "@/store/features/authSlices";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const initializeAuth = () => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(setAuthUser(userData));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userInfo");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch(clearAuthUser());
  };

  return {
    ...auth,
    initializeAuth,
    logout,
  };
};
