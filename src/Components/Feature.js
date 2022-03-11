import React from 'react'
import {Row, Col,Container,Image} from 'react-bootstrap';
import {
  FaArrowRight
} from 'react-icons/fa'


export default function Feature() {

  const responsive = {
    desktop: {
      breakpoint: { max: 3500, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div id="feature" className="feature-class mb-5">
      <Container>
        <Row>
          <Col md={12} lg={6} className="mb-5 mt-5 p-4">
           <p className="font-lgr mb-0 white-color"> FEATURES___________________ </p>
           <p className="font-xxl mb-0 white-color"><b>AN EXCLUSIVE</b></p>
           <p className="font-xxl mb-1 default-color">BAR GANG</p>
           <p className="font-lgr mb-0 white-color">Each <b> BAR GANG </b> collectible is unique and programmatically generated from over 100 handcrafted traits, including skin tone, head style, facial features, clothing, and more hand-drawn by The Artist.</p>
           <div className="font-lg white-color">
              <p className="mb-0"><span className="dot"></span>10,000 rare male Bar Gang NFTs</p> 
              <p className="mb-0"><span className="dot"></span>10,000 rare female Bar Gang NFTs</p> 
              <p className="mb-0"><span className="dot"></span>Fair Distribution: all collectibles cost .08 ETH</p> 
              <p className="mb-0"><span className="dot"></span>Control and own a unique avatar NFT (ERC-721)</p> 
              <p className="mb-0"><span className="dot"></span>Gain additional benefits through roadmap activations</p> 
            </div>
            <p className="font-lgr white-color">
              With more than 100+ hand-drawn traits, each NFT is
              unique and comes with a membership to an exclusive
              group of successful investors and bar enthusiasts.
              Join an ambitious ever-growing community with
              multiple benefits and utilities. Remember,
              here we’re all in the same gang.
            </p>
           <span className="font-xl white-color cursor-pointer pb-2" style={{borderBottom: '1px solid white'}}><span className="pr-4">Join Us</span><span style={{width: 20, display: 'inline-block'}} /><FaArrowRight className="text-orange"></FaArrowRight></span>
          </Col>
          <Col md ={12} lg={6} className="mb-5 mt-5 p-4 align-items-center">
            <img src = "image/changer.gif"
            width = "100%" />
          </Col>        
        </Row>
      </Container>
    </div>
  )
}
