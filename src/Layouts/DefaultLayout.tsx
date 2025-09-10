import { type ReactElement } from "react";
import Header from "./components/Header";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
interface DefaultLayoutProps {
  children: ReactElement;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
