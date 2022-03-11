import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import eventBus from './EventBus';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white !important',
    height: 48,
    padding: '0 30px',
    fontFamily: 'john !important'
  },
});

export default function Clock() {
  const classes = useStyles();
  const [launchTime, setLanuchTime] = useState(new moment('2021-12-11'));
  const [today, setToday] = useState(new moment());
  const [days, setDays] = useState(launchTime.diff(today, 'd'));
  const [hours, setHours] = useState(launchTime.diff(today, 'h') % 24);
  const [minutes, setMinutes] = useState(launchTime.diff(today, 'm') % 60);
  const [seconds, setSeconds] = useState(launchTime.diff(today, 's') % 60);
  const [type, setType] = useState('random');
  const [isConnected, setIsConnected ] = useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
    eventBus.dispatch('chooseType', {mintType : event.target.value});
  };

  useEffect(() => {
    eventBus.on('isConnected', (_event) => {
      setIsConnected(true);
    });

  })
  useEffect(() => {
    setTimeout(() => {
      setToday(moment());
      setDays(launchTime.diff(today, 'd'));
      setHours(launchTime.diff(today, 'h') % 24);
      setMinutes(launchTime.diff(today, 'm') % 60);
      setSeconds(launchTime.diff(today, 's') % 60);
    }, 1000);
  }, [today])

  return (
    <div className="launch-board">
      <h3 className="mt-3">Lanching on December 11<span className="right-top">th</span></h3>
      <ListGroup className="clock-listgroup" horizontal>
        <ListGroup.Item className="clock-listgroupitem">
          <p className="number">{days}</p>
          <p className="unit">DAYS</p>
        </ListGroup.Item>
        <ListGroup.Item className="clock-listgroupitem">
          <p className="number">{hours}</p>
          <p className="unit">HOURS</p>
        </ListGroup.Item>
        <ListGroup.Item className="clock-listgroupitem">
          <p className="number">{minutes}</p>
          <p className="unit">MINUTES</p>
        </ListGroup.Item>
        <ListGroup.Item className="clock-listgroupitem">
          <p className="number">{seconds}</p>
          <p className="unit">SECOND</p>
        </ListGroup.Item>
      </ListGroup>
      <h4 className="mt-3" >Presale Period ( 5 days )</h4>
      
        {
          isConnected  ? (
            <h5>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={type}
                label="Mint Type"
                onChange={handleChange}
              >
                <MenuItem value={'custom'}>Custom Mint</MenuItem>
                <MenuItem value={'random'}>Random Mint</MenuItem>
              </Select>
            </FormControl>
            </h5>
          ) : (
            <h6>
            <Button className={classes.root} onClick = { () => {
              eventBus.dispatch('connect', {action : true});
              }}><AccountBalanceWalletIcon /> &nbsp; Connect Wallet</Button>
            </h6>
          )
        }
   
    </div>
  )
}
