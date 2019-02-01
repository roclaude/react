import React, { Component } from 'react'

import { SocialIcon } from 'react-social-icons'

import './footer.scss'

class Footer extends Component {

    render() {
        return(
            <footer className="page-footer">
                <div className="page-footer-inner">
                    <SocialIcon url="https://www.facebook.com/Qualitance"/>
                    <SocialIcon url="https://twitter.com/qualitance" />
                    <SocialIcon url="https://www.linkedin.com/company/qualitance" />
                    <SocialIcon url="https://plus.google.com/+qualitance" />
                </div>
            </footer>
        )
    }
}

export default Footer