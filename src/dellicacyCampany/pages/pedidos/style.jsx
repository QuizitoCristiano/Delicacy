import { Box, Stack, Button, styled, Input } from "@mui/material";

export const StylePedidos = {
  container: styled(Stack)(({}) => ({
    position: "relative",
    display: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "78vw",
    height: "85vh",
  })),
  headerLinks: styled(Stack)(({}) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingInline: '12px',
    flexDirection: "row",
    width: "100%",
    height: "50px",
    backgroundColor: 'white'
  })),
};
