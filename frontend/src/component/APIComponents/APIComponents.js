import { Button, Divider, Typography, Box, TextField } from "@mui/material";

// Button
export const ButtonComp = ({ sx, children, ...rest }) => {
  return (
    <Button {...rest} sx={{ bgcolor: "#111827", color: "white", ...sx }}>
      {children || "Click Me"}
    </Button>
  );
};

// Typography
export const TypographyComp = ({ sx, children, ...rest }) => {
  return <Typography {...rest} sx={{ ...sx }}></Typography>;
};

// Divider
export const DividerComp = ({ sx, children, ...rest }) => {
  return <Divider {...rest} sx={{ ...sx }}></Divider>;
};
// Divider
export const BoxComp = ({ sx, children, ...rest }) => {
  return <Box {...rest} sx={{ ...sx }}></Box>;
};
export const TextFieldComp = ({ sx, children, ...rest }) => {
  return <TextField {...rest} sx={{ ...sx }}></TextField>;
};
