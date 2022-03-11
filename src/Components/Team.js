import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Image,
  Modal
} from 'react-bootstrap'
import { SiSkype, SiGmail } from "react-icons/si";

const colorSkype = { color : '#0094E0'};
const colorGmail = { color : '#C5221F'}
const person = { border : '1px solid white', padding : '5px', borderRadius : '10px'};
export default function Team() { 

  const [teamMembers, setTeamMembers] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [showImageUrl, setShowImageUrl] = useState('')

  useEffect(() => {
    const teamMembers = [
      {
        image: 'image/team_1.png',
        name: 'Lionel',
        info: 'The CEO',
      },
      {
        image: 'image/team_2.png',
        name: 'Yekaterina',
        info: 'The CMO',
      },
      {
        image: 'image/team_3.png',
        name: 'Arsenii',
        info: 'The CTO',
      },
      {
        image: 'image/team_5.jpg',
        name: 'Ayesha',
        info: 'The 3D Artist',
      },
      {
        image: 'image/team_4.jfif',
        name: 'Usman',
        info: 'The 2D Designer',
      },
      
    ]
    setTeamMembers(teamMembers)
  }, [])
  
  return (
    <div id="team" className="our-team pt-3 pb-5">
      <Container className="mt-5">
        <div className="text-center" style={{marginBottom: -5}}>
          <span className="our-team-title font-xxxl">OUR TEAM</span>
        </div>
        <div className="text-center mb-4">
          <span className="our-team-title-divider" />
        </div>
        <div className="mb-5">
          <p className="text-center text-white mb-0 font-xl">The Bar Gang was created by a team of dremaners;</p>
          <p className="text-center text-white mb-0 font-xl">Enterpreneurs, Blockchain experts, Marketing gurus, and Artists. We are committed to delivering a cutting-edge experience and making this project a success.</p>
        </div>
        <Row className="our-team-members">
          {teamMembers.map((member, index) => {
            return (
              <Col xl={3} lg={3} md={4} sm={6} xs={6} xxs={12} key={'teamMember' + index} className="text-white pt-4 pb-4 cursor-pointer member-item" onClick={() => {
                          setShowImageUrl(member.image)
                          setModalShow(true)
                        }}>
                <div>
                  <Image src={member.image} className="w-100" />
                  <div className="d-flex align-items-end justify-content-between mt-2">
                    <div>
                      <div style={{fontSize: 'smaller', fontWeight: 'bold'}}>{member.name}</div>
                      <div style={{fontSize: 'smaller'}}>{member.info}</div>
                    </div>
                    <div className="mb-1">
                      <span className="team-member-nav-icon cursor-pointer" style={{ marginRight: 8 }}>
                        <SiSkype style = {colorSkype}/>
                      </span>
                      <span className="team-member-nav-icon">
                        <SiGmail style = {colorGmail}/>
                      </span>
                    </div>
                  </div>
                </div>
              </Col> 
            )
          })}
        </Row>
      </Container>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Image src={showImageUrl} className="w-100" style = {person}></Image>
      </Modal>
    </div>
  )
}
