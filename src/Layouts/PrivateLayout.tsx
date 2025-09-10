import { Box } from "@mui/material";
import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "~/hooks/useAppSelector";

interface AuthLayoutProps {
  children: ReactElement;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        maxHeight: "100vh",
        padding: "24px",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
