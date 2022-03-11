import React from 'react'
import {
  Container,
  Image
} from 'react-bootstrap'

export default function FuturePlan() {
  return (
    <div id="futureplan">
      <Container>
        <h4 className="text-white" style={{textAlign: "center"}}>Once 100% sold,
          <span className="underline"></span>
        </h4>
        <p className="text-white mb-5 pb-3 font-xl" style={{textAlign: "center"}}>
          our first companion collection is announced. This will be free (+gas) for the BAR GANG holders.
        </p>
        <div className="future-plan-info mb-5 text-white">
          <Image 
            src="image/future-plan-bg.png"
            className="w-100"
          />
          <span className="plan1 font-xl">
            Mobile Application Game.
          </span>
          <span className="plan2 font-xl">
            Metaverse Development and Integrations.
          </span>
          <span className="plan3 font-xl">
            Collabs With Other Projects & Brands.
          </span>
          <span className="plan4 font-xl">
            More to come later.
          </span>
          <span className="plan-title text-orange font-xxxl">
            Future Plans
          </span>
          <span className="plan-desc font-lgr">
            Future plans after all roadmap activations happen will be split into mutiple phases and will include:
          </span>
        </div>
      </Container>
    </div>
  )
}
