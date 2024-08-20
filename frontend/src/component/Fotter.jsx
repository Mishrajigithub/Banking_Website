import { Box, Typography } from "@mui/material";
import React from "react";


const Footer = () => {
    return (
        <Box sx={{ height: "8vh",width:"100vw", color: "white", display: "flex", justifyContent: "center", alignItems: "center" ,background:'#202c45'}}>
            <Typography>Copyright © 2024 Akash Kumar. All Rights Reserved.</Typography>
        </Box>
    );
};

export default Footer;
