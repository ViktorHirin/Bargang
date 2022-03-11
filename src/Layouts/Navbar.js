import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar as Nb, Container, Nav, Image, Button
} from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import eventBus from '../Components/EventBus';


export default function Navbar() {

  const [addCss, setAddCss] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');



  useEffect(() => {
    if (window.innerWidth < 985) {
      setAddCss('header-navbar-nav');
    }
    eventBus.on('isConnected', (_event) => {
    
      setIsConnected(true);
      setAccount(_event.data.account);
      setBalance(parseInt(_event.data.balance) / (10**18));
      
    });

  }, [])
  return (
    <Nb expand="lg" variant="dark">
      <Container>
        <Nb.Brand href="#" className="mr-4">
          <Image src="logo.png" />
        </Nb.Brand>
        <Nb.Toggle aria-controls="basic-navbar-nav" />
        <Nb.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about" className="header-btn">About</Nav.Link>
            <Nav.Link href="#feature" className="header-btn">Feature</Nav.Link>
            <Nav.Link href="#roadmap" className="header-btn">Roadmap</Nav.Link>
            <Nav.Link href="#team" className="header-btn">Team</Nav.Link>
            <Nav.Link href="#faq" className="header-btn">FAQ</Nav.Link>
          </Nav>
        </Nb.Collapse>
        {
          (isConnected && account) && (
            <Nb.Collapse className="justify-content-end">
              <Nav.Link href="#">
                <Fab variant="extended" color="primary">
                  <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                  <big style={{ fontFamily: 'lionel' }}>{account.substring(0, 5) + '...' + account.substring(account.length - 4, account.length)} |  {balance.toString().substring(0,6)} Ether</big>
                </Fab>
              </Nav.Link>
            </Nb.Collapse>
          )
        }
        
        
       

      </Container>
    </Nb>
  )
}
