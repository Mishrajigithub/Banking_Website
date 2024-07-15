import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BounceLoader } from "react-spinners";

export const AllCustomer = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
 

    const loadUserData = async () => {
        setLoading(true);
        try {
            const result = await axios.get('https://basic-banking-website-7ujs.onrender.com/api/allUsers');
            setUserData(result.data);
        } catch (error) {
            setError("Something went wrong. Please try again later!");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <>
            {loading ? (
                <Box sx={{ height: "80vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <BounceLoader />
                </Box>
            ) : error ? (
                <Box sx={{ height: "80vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", color: 'white', fontSize: "Large" }}>
                    {error}
                </Box>
            ) : (
                <Grid container spacing={1} justifyContent="center">
                    {userData.map((user) => (
                        <Grid item key={user._id} xs={12} sm={8} md={8}>
                            <Card sx={{ mb: 1 }}>
                                <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }}>
                                    <Box display={'flex'} alignItems="center" >
                                        <Typography ><strong>Name:&nbsp; </strong></Typography>
                                        <Typography>{user.name}</Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems="center" >
                                        <Typography ><strong>Profession:&nbsp;</strong></Typography>
                                        <Typography>{user.profession}</Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems="center">
                                        <Typography ><strong>Email:&nbsp;</strong></Typography>
                                        <Typography>{user.email}</Typography>
                                    </Box>
                                    <NavLink to={`/customer/${user._id}`} style={{ textDecoration: "none",}}>
                                        <Button variant="contained">View</Button>
                                    </NavLink>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};
