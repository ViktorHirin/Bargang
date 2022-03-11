import React from 'react';
import {Row, Col,Container,Image} from 'react-bootstrap';

export default function About() {
  return (
    <div id="about" className="about-container mb-5">
      <Container>
        <div className="about-left">
          <Row>
            <Col lg={6} md={12}>
              <Row >
                <Col lg={6} md={6} sm={6} xs={6} className="mb-4">
                  <Image src="image/abou1.jfif" className="w-100" rounded />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="mb-4">
                  <Image src="image/abou2.jfif" className="w-100" rounded />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="mb-4">
                  <Image src="image/abou3.jfif" className="w-100" rounded />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="mb-4">
                  <Image src="image/abou4.png" className="w-100" rounded />
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="p-4">
              <div className="text-white">
                <p className="mb-0 font-lgr">ABOUT____________________</p>
                <p className="mb-0 font-xxl" style = {{ fontWeight : 'bold'}}>Welcome to the</p>
                <p className="mb-0 text-orange font-xxl" style={{fontWeight: 'bold'}}>BAR GANG</p>    
                <p className="mt-5 mb-0 font-lgr"><b className="text-orange">The BAR GANG</b> is a private collection
                of 20,000 men and women <b>NFTs</b>—unique digital
                collectibles living on the Ethereum blockchain.</p> 
                <p className="mb-0 font-lgr">Then men (10k) are dropping in <b>December 2021.</b></p>             
              </div>
            </Col>
          </Row>
        </div>
        <div className="text-white text-center mt-4 font-lgr">
          <p>The <b className="text-orange">BAR GANG</b> is a community of humans who believe in the future of <b>CRYPTO,</b> enjoy hanging out, and realize at the bar we're all in the same gang.</p>
          <p className="text-center">
            <span style={{width: 200, height: 2, background: 'white', display: 'block', margin: '0 auto'}}></span>
          </p>
          <p className="">The <b>BAR GANG</b> is starting with a collection of 10,000 men
          NFTs and then 10,000 women NFTs</p>
        </div>
      </Container>
    </div>
  )
}
