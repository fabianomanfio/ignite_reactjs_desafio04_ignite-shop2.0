import { styled } from "@stitches/react";

export const ContentCartContainer = styled("div", {
  width: "384px",
  margin: "32px auto 24px",
  display: "flex",
  alignItems: "start",
  gap: "20px",
});

export const ImageCartContainer = styled("div", {
  width: "102px",
  height: "93px",
  borderRadius: "8px",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductCartContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  span: {
    fontSize: "$md",
    color: "$gray300",
    marginBottom: "2px",
  },

  strong: {
    fontSizes: "$md",
    color: "$gray100",
    marginTop: "2px",
  },

  button: {
    background: "transparent",
    border: "none",
    textAlign: "start",
    marginTop: 10,
    color: "$green500",
    fontWeight: "bold",
    cursor: "pointer",
  },
});