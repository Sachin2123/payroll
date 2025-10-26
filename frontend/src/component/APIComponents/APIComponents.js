import { Button, Divider, Typography } from "@mui/material";

// Button
export const ButtonComponent = ({ sx, children, ...rest }) => {
  return (
    <Button {...rest} sx={{ bgcolor: "#111827", color: "white", ...sx }}>
      {children || "Click Me"}
    </Button>
  );
};

// Typography
export const TypographyComponent = () => {
  return <Typography></Typography>;
};

// Divider
export const DividerComponent = ({ sx, children, ...rest }) => {
  return <Divider {...rest} sx={{ ...sx }}></Divider>;
};
