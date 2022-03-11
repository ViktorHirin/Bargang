import React from 'react'
import {
  Container,
  Image
} from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"

export default function Viproom() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const vips = [
    {
      image: 'image/vip_1.png'
    },
    {
      image: 'image/vip_2.png'
    },
    {
      image: 'image/vip_3.png'
    },
    {
      image: 'image/vip_4.png'
    },
    {
      image: 'image/vip_5.png'
    },
    {
      image: 'image/vip_6.png'
    },
    {
      image: 'image/vip_7.png'
    }
  ]

  return (
    <div className="vip-room pt-5 pb-5">
      <Container>
        <div className="text-center mt-0 mb-4">
          <span className="text-orange font-xxxl" style={{fontWeight: 'bold'}}>THE VIP ROOM</span>
        </div>
        <div className="mb-4">
          <p className="text-center mb-0 font-xl" style={{color: "white"}}>The VIP Room by the Bar Gang are the rarest NFTs.</p>
          <p className="text-center mb-0 font-xl" style={{color: "white"}}>They are all hand drawn and have no element in common with the regular collection.</p>
          <p className="text-center mb-0 font-xl" style={{color: "white"}}>The luckly holders will get incentives and perks to be named at a later date.</p>
        </div>
        <div className="text-center pt-4 pb-4">
          <span className="vip-room-register-btn cursor-pointer" style={{backgroundImage: "url(image/vip-register-btn.png)", fontWeight: 'bold'}}>REGISTER FOR OUR PRESALE</span>
        </div>
      </Container>
      <div className="text-white mt-4 mb-4">
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite
          autoPlay={true}
          autoPlaySpeed={5000}
          transitionDuration={1000}
        >
          {vips.map((vip, index) => (
            <div key={'vip' + index} className="p-2 pt-0 pb-0">
              <Image key={'vip' + index} src={vip.image} draggable="false" className="w-100 cursor-pointer" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
