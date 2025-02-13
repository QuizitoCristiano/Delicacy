import { Box, Stack } from "@mui/system";
import { MyHeader } from "../Header/Header";
import { Face2, Highlight, Home } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Stack sx={{ width: "100vw", height: "auto", bgcolor: "grey	" }}>
      <MyHeader />

      <Box
        sx={{
          width: "100%",
          mt: "0vh",
          height: "100vh",
          bgcolor: "black",
          color: "blue",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
