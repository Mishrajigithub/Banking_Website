
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/Fotter';
import Landing from './component/HomePage';
import Navbar from './component/Navbar';
import { AllCustomer } from './component/AllCustomer';
import { SingleCustomer } from './component/singleCustomer';
import { TransactionHistory } from './component/TransactionHistory';

function App() {
  return (

   <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/all-profile' element={<AllCustomer />} />
        <Route path='/customer/:id' element={<SingleCustomer />} />
        <Route path='/history' element={<TransactionHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
   </>

  );
}

export default App;
