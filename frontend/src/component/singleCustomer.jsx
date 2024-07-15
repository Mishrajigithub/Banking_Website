import { Box, Card, CardContent, Divider, Grid, Input, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";


export const SingleCustomer = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");


  const loadData = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`http://localhost:8000/api/user/${id}`);
      setData(result.data);
    } catch (error) {
      setError("Something went wrong in fetching data of the user.");
    }
    setLoading(false);
  };

  const loadUserData = async () => {
    try {
      const result = await axios.get('http://localhost:8000/api/allUsers');
      const filteredUsers = result.data.filter(user => user._id !== id);
      setAllUser(filteredUsers);
    } catch (error) {
      setError("Something went wrong in fetching all users. Please try again later!");
    }
  };

  const handleTransfer = async () => {
    try {
      const result = await axios.post('http://localhost:8000/api/transaction', {
        From: id, To: selectedUser, amount: amount
      })
      window.alert("Transaction sucessfull");
      loadData();

    } catch (error) {
      window.alert("Transaction failed. please try again letter !")
    }
  }

  useEffect(() => {
    loadData();
    loadUserData();
  }, [id]);

  const handleUserChange = (event) => {

    setSelectedUser(event.target.value);

  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };



  return (
    <>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          height: '83vh',
          backgroundColor: '#f5f5f5',
          flexDirection: "row"
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
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
            <>

              <Grid item xs={12} sm={8} md={6}>
                <Card sx={{ minWidth: 275, maxWidth: 650, m: 2, p: 2, boxShadow: 3 ,height:"auto"}}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>User Details</Typography>
                    {data && (
                      <>
                        <Box display={"flex"} justifyContent={'space-between'} sx={{ mb: 1 }}>
                          <Typography variant="subtitle1"><strong>Name:</strong></Typography>
                          <Typography variant="body2">{data.name}</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={'space-between'} sx={{ mb: 1 }}>
                          <Typography variant="subtitle1"><strong>Profession:</strong></Typography>
                          <Typography variant="body2">{data.profession}</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={'space-between'} sx={{ mb: 1 }}>
                          <Typography variant="subtitle1"><strong>Email:</strong></Typography>
                          <Typography variant="body2">{data.email}</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={'space-between'} sx={{ mb: 1 }}>
                          <Typography variant="subtitle1"><strong>Account No:</strong></Typography>
                          <Typography variant="body2">{data.acc_no}</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={'space-between'} sx={{ mb: 3 }}>
                          <Typography variant="subtitle1"><strong>Balance:</strong></Typography>
                          <Typography variant="body2">{data.acc_balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 2 ,flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' }}}>
                         <Box sx={{ mb: { xs: 2, sm: 2, md: 0, lg: 0 } }}>

                            <Typography variant="subtitle1"><strong>Transfer money</strong></Typography>
                          </Box>

                         <Box sx={{ mb: { xs: 2, sm: 2, md: 0, lg: 0 } }}>

                            <Input placeholder="Enter amount" onChange={handleAmountChange} />
                          </Box>

                          <FormControl sx={{ minWidth: 140, mr: 2 }}>
                            <InputLabel id="user-select-label">Select User</InputLabel>
                            <Select
                              labelId="user-select-label"
                              id="user-select"
                              value={selectedUser}
                              label="User"
                              onChange={handleUserChange}
                            >
                              {allUser.map((u) => (
                                <MenuItem key={u._id} value={u._id}>{u.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                        </Box>
                        {

                          selectedUser && amount && (

                            <Box display={"flex"} justifyContent={'center'}>
                              <Button variant="contained" onClick={handleTransfer}>Transfer Money</Button>
                            </Box>

                          )
                        }
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box >
    </>
  );
};
