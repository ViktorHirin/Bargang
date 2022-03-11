import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import eventBus from './EventBus';
import Web3 from 'web3';
import ABI from '../contract/abi.json';
import { contractAddress } from '../contract/address.js';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';

var web3, accounts, contract;


export default function Mint() {

  const [peguinDNA, setPenguinDNA] = useState('');
  const [mintType, setMintType] = useState('random');
  const [isConnected, setIsConnected] = useState(false);
  const [nftType, setNftType] = useState('hats');
  const [account, setAccount] = useState('');
  const [amountofNFT, setAmountofNFT] = useState(1);
  const [fee, setFee] = useState(0.005);
  const [totalId, setTotalId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function connectWallet(action) {
    if (window.ethereum) {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' });
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }]
      });
      accounts = await web3.eth.getAccounts();
      let balanceOfNative = await web3.eth.getBalance(accounts[0]);
      setAccount(accounts[0]);
      eventBus.dispatch('isConnected', { data: { 'account': accounts[0], 'balance': balanceOfNative } });
      setIsConnected(action);
    } else {
      alert('Install Metamask please.');
    }
  }

  async function mintRandomNFT() {
    setIsLoading(true);
    contract.methods.mintToken(amountofNFT).send({
      from: account,
      gas: 2000000,
      value: web3.utils.toWei((fee * amountofNFT).toString(), 'ether')
    })
      .then((res) => {
        console.log(res);
        toast.success(`${amountofNFT} NFTs are minted successfully!`);
        toast.info('Please check NFTs on https://testnets.opensea.io/ ');
        let tokenMinted = Number(totalId) + Number(amountofNFT);
        setTotalId(tokenMinted);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        toast.error("Network Error!");
        setIsLoading(false);
      });

  }

  useEffect(() => {
    if (window.ethereum) {
      (async () => {
        web3 = await new Web3(window.ethereum);
        contract = await new web3.eth.Contract(ABI, contractAddress);
        let feeTemp = await contract.methods.getMintFee().call();
        let totalId = await contract.methods.getTotalTokenId().call();
        setFee(feeTemp / (10 ** 18));
        setTotalId(totalId);
        console.log('========FEE=======', feeTemp);
        console.log('========TotalTokenIDS=======', totalId);
      })();
    } else {
      alert('Install Metamask please');
    }

    eventBus.on('chooseType', (_event) => {
      setMintType(_event.mintType);

    });
    eventBus.on('connect', (_event) => {
      connectWallet(_event.action);
    });


  }, []);
  return (
    <>


      {
        (isConnected && mintType === 'custom') && (
          <div id="custommint" className="about-container mb-5">
            <Container>
              <div className="about-left">
                <Row>
                  <Col lg={4} md={12}>
                    <Row >
                      <Col lg={12} md={12} sm={12} xs={12} className="mb-4">
                        <Card sx={{ maxWidth: '100%' }} variant="outlined" p={3}>
                          <CardMedia
                            component={'video'}
                            controls
                            src={"video/advertisement.mp4"}
                            alt={"video/advertisement.mp4"}
                          />
                          <CardContent>
                            <TextField
                              id="outlined-required"
                              label=""
                              type="text"
                              name="penguin_dna"
                              value={peguinDNA}
                              InputProps={{
                                readOnly: true,
                                startAdornment: <InputAdornment position="start">Penguin's DNA</InputAdornment>,
                              }}
                            />

                          </CardContent>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={8} md={12} >
                    <div className="text-white">

                      <p className="mb-0 font-xxl text-center" style={{ fontWeight: 'bold' }}>
                        Create your custom <span className="text-orange font-xxl" style={{ fontWeight: 'bold' }}>Penguin</span><br />

                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={nftType} onChange={(e) => {
                            console.log(e.target.value);
                            setNftType(e.target.value);
                          }}>
                            <FormControlLabel value="hairs" control={<Radio color="success" />} label="Hairs" />
                            <FormControlLabel value="hats" control={<Radio color="success" />} label="Hats" />
                          </RadioGroup>
                        </FormControl>
                      </p>

                      <div className="p-4">
                        <Row>
                          <Col lg={6} md={6} >
                            <Box width={'100%'}>
                              <h6>Backgrounds</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary"
                                step={1}
                                marks
                                min={0}
                                max={7} />
                            </Box>

                            <Box width={'100%'}>
                              <h6>Hairs</h6>
                              <Slider disabled={nftType === 'hats' ? true : false} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="success" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Mouth</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Neck Decorations</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Clothes</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary" marks step={1} />
                            </Box>
                            <Button color="success">Random Penguin</Button>

                          </Col>

                          <Col lg={6} md={6} >
                            <Box width={'100%'}>
                              <h6>Skins</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Hats</h6>
                              <Slider disabled={nftType === 'hairs' ? true : false} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="success" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Eyes</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Glasses</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="primary" marks step={1} />
                            </Box>
                            <Box width={'100%'}>
                              <h6>Rarity Objects</h6>
                              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color="error" marks step={1} />
                            </Box>
                            <Button color="primary">Default Penguin</Button>
                          </Col>
                          <Button variant="contained" color="warning">Create Custom Penguin</Button>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="text-white text-center mt-4 font-lgr">
                <p>The <b className="text-orange">BAR GANG</b> is a community of humans who believe in the future of <b>CRYPTO,</b> enjoy hanging out, and realize at the bar we're all in the same gang.</p>
                <p className="text-center">
                  <span style={{ width: 200, height: 2, background: 'white', display: 'block', margin: '0 auto' }}></span>
                </p>
                <p className="">The <b>BAR GANG</b> is starting with a collection of 10,000 men
                  NFTs and then 10,000 women NFTs</p>
              </div>
            </Container>
          </div>
        )
      }
      {
        (isConnected && mintType === 'random') && (

          <div id="randommint" className="about-container mb-5">

            <Container>

              <div className="about-left">

                <Row>

                  <Col lg={4} md={12}>
                    <Row >
                      <Col lg={12} md={12} sm={12} xs={12} className="mb-4">
                        <Card sx={{ maxWidth: '100%' }} variant="outlined" p={3}>
                          <CardMedia
                          component={'video'}
                            controls
                            src={"video/advertisement.mp4"}
                            alt={"video/advertisement.mp4"}
                          />
                          <CardContent>
                            <TextField
                              id="outlined-required"
                              label=""
                              type="number"
                              name="penguin_amount"
                              value={amountofNFT}
                              disabled = {isLoading}
                              onChange={(e) => setAmountofNFT(e.target.value)}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">The amount of Penguin NFTs</InputAdornment>,
                                inputProps: { min: 1, max: 10 }
                              }}
                            />

                          </CardContent>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={8} md={12} >
                    <div className="text-white">

                      <p className="mb-0 font-xxl text-center" style={{ fontWeight: 'bold' }}>Create your random <span className="text-orange font-xxl" style={{ fontWeight: 'bold' }}>Penguins</span></p>
                      <h3 className = "text-center text-orange">{totalId} NFTs are sold out.</h3> 
                      <div className="p-4">
                        <Row>
                          <Col lg={6} md={6} >
                            <Box width={'100%'}>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="Background" />
                              </FormGroup>
                            </Box>
                            <FormControl component="fieldset">

                              <RadioGroup row aria-label="element" name="row-radio-buttons-group" value={nftType} onChange={
                                (e) => {
                                  setNftType(e.target.value);

                                }}>

                                <FormControlLabel value="hats" control={<Radio color="success" disabled />} label="Hats ( 0 ~ 500) " />
                                <FormControlLabel value="hairs" control={<Radio color="success" disabled />} label="Hairs (501 ~ 1000)" />
                              </RadioGroup>
                            </FormControl>
                            <Box width={'100%'}>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="Mouth" />
                              </FormGroup>
                            </Box> <Box width={'100%'}>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="Neck Decorations" />
                              </FormGroup>
                            </Box>


                          </Col>
                          <Col lg={6} md={6} >
                            <Box width={'100%'}>
                              <FormGroup >
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="Skins" />
                              </FormGroup>
                            </Box>
                            <Box width={'100%'}>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="Eyes" />
                              </FormGroup>
                            </Box>
                            <Box width={'100%'}>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="Glasses" />
                              </FormGroup>
                            </Box>
                            <Box width={'100%'}>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked style={{ color: 'grey' }} disabled />} label="clothes" />
                              </FormGroup>
                            </Box>
                          </Col>
                          {
                            isLoading === true && (
                              <LinearProgress color="success" />
                            )
                          }
                          <Button variant="contained" color="warning" onClick={mintRandomNFT} disabled={isLoading}>Create Random Penguins</Button>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="text-white text-center mt-4 font-lgr">
                <p>The <b className="text-orange">BAR GANG</b> is a community of humans who believe in the future of <b>CRYPTO,</b> enjoy hanging out, and realize at the bar we're all in the same gang.</p>
                <p className="text-center">
                  <span style={{ width: 200, height: 2, background: 'white', display: 'block', margin: '0 auto' }}></span>
                </p>
                <p className="">The <b>BAR GANG</b> is starting with a collection of 10,000 men
                  NFTs and then 10,000 women NFTs</p>
              </div>
            </Container>
          </div>
        )
      }
    </>
  )
}
