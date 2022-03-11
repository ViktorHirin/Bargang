import React, {useState, useEffect} from 'react'
import {
  Container
} from 'react-bootstrap'
import {
  FaPlus,
  FaMinus
} from 'react-icons/fa'
import Constants from '../Constants/Constants'

export default function Faq() {
  const [faqs, setFaqs] = useState([])
  useEffect(() => {
    const initialFaqs = Constants.FAQ;
    setFaqs(initialFaqs)
  }, [])
  return (
    <div id="faq" className="text-white pt-5 pb-5">
      <Container>
        <div className="text-center mb-5 font-xxl" style={{fontWeight: 'bold'}}>
          FREQUENTLY ASKED QUESTIONS
        </div>
        <div className="faq-group" style={{borderTop: '1px solid #bbb'}}>        
          {
            faqs.map((item, index) => (
              <div className="faq-item" key={index} style={{borderBottom: '1px solid #bbb'}}>
                <div className="faq-item-q d-flex align-items-center justify-content-between mt-2 mb-2 font-xl" style={{fontWeight: 'bold'}}>
                  <div>
                    {item.question}
                  </div>
                  <div className='cursor-pointer' onClick={() => {
                    const collapse = []
                    faqs.forEach((f, fIndex) => {
                      if (index == fIndex) {
                        f.collapse = !f.collapse
                      }
                      collapse.push(f)
                    })
                    setFaqs(collapse)
                  }}>
                    {
                      item.collapse ? <FaPlus /> : <FaMinus />
                    }
                  </div>
                </div>
                {!item.collapse && (<div dangerouslySetInnerHTML={{__html: item.answer}} className="mb-2 font-lgr" />)}
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  )
}
