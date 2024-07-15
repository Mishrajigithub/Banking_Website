import { Box, Card, CardContent, Divider, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

export const TransactionHistory = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const result = await axios.get("https://basic-banking-website-7ujs.onrender.com/api/history");
            setData(result.data);
        } catch (error) {
            setError("Something went wrong in fetching transaction history details.");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
                height: 'auto',
                backgroundColor: '#f5f5f5',
            }}
        >
            {loading ? (
                <Box
                    sx={{
                        height: "80vh",
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <BounceLoader />
                </Box>
            ) : error ? (
                <Box
                    sx={{
                        height: "80vh",
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: 'red',
                        fontSize: "large",
                    }}
                >
                    {error}
                </Box>
            ) : (
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={10} md={10}>
                        <Card sx={{ minWidth: 275, mt: 2, mb: 2, p: 2, boxShadow: 3 }}>
                            <CardContent>
                                {data.length === 0 ? (
                                    <Typography align="center">No transaction history available.</Typography>
                                ) : (
                                    data.map((transaction, index) => (
                                        <Box key={transaction._id}>

                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }}>
                                                <Box display={"flex"} sx={{ justifyContent: { xs: 'space-between',sm:'space-between' } }}>
                                                    <Typography><strong>From:&nbsp;</strong></Typography>
                                                    <Typography>{transaction.From.name}</Typography>
                                                </Box>
                                                <Box display={"flex"}  sx={{ justifyContent: { xs: 'space-between',sm:'space-between' } }}>
                                                    <Typography><strong>To:&nbsp;</strong></Typography>
                                                    <Typography>{transaction.To.name}</Typography>
                                                </Box>
                                                <Box display={"flex"}  sx={{ justifyContent: { xs: 'space-between',sm:'space-between' } }}>
                                                    <Typography><strong>Amount: &nbsp;</strong></Typography>
                                                    <Typography>{transaction.amount}</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex" ,justifyContent: { xs: 'space-between',sm:'space-between' } }}>
                                                    <Typography><strong>Date: &nbsp;</strong></Typography>
                                                    <Typography>{new Date(transaction.Date).toLocaleString()}</Typography>
                                                </Box>
                                            </Box>

                                            {index < data.length - 1 && <Divider sx={{ my: 2 }} />}
                                        </Box>
                                    ))

                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};
