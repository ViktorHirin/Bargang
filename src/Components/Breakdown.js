import React from 'react'
import { Container } from 'react-bootstrap'
import BreakdownItem from './BreakdownItem'

export default function Breakdown() {
  return (
    <Container>
      <div id="breakdown">
        <div className="breakdown-header">
          <div className="gradient-border">
            <h1 className="text-white font-xxxl" style={{textAlign:'center', fontWeight: 'bold'}}>THE BREAKDOWN</h1>
            <span className="circle-1"></span>
            <span className="circle-2"></span>
          </div>
        </div>
        <BreakdownItem 
          title="Innovation"
          detail="With the Bar Gang, digital art is essential. You will discover different way to use your collectible in the next phases."
          cls="font-lgr"
        />
        <BreakdownItem 
          title="Collection"
          detail="We encourage our community to share with ideas & be a integral part of the Bar Gang’s growth."
          cls="font-lgr"
        />
        <BreakdownItem 
          title="Unique"
          detail="Once you mint a NFT from the Bar Gang collection, you will be the only holder on this universe and beyond."
          cls="font-xl"
        />
        <BreakdownItem 
          title="Community"
          detail="Be part of a fun pioneering community. Effective communication & common goals will lead to community success."
          cls="font-lgr"
        />
        <BreakdownItem 
          title="Long Term"
          detail="Don't get involved with the hype, choose consistency. The Bar Gang project is designed to evolve and grow."
          cls="font-lgr"
        />
      </div>
    </Container>
  )
}
