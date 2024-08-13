import React from "react";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

interface ButtonFilterProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({ onClick, children }) => {
  return (
    <Button
      variant="outlined"
      className="Button-Filter"
      startIcon={<FilterAltOutlinedIcon />}
      onClick={onClick}
      size="medium"
      sx={{
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        height: "100%",
        backgroundColor: "#ffc300",
        marginLeft: "0.5rem",
        marginRight: "0.1rem",
        "&:hover": {
          backgroundColor: "#ffa200",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonFilter;
