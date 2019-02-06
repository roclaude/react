import React, { Component } from 'react'

import './about.scss'

import Button from '../../components/elements/Button'
import AboutBox from './AboutBox'

import icon1 from './about_1.png'
import icon2 from './about_2.png'

class About extends Component {

    render() {
        return(
            <div className="page page-about">
				<div className="content-page">
                    <div className="banner-wrapper">
                        <h2>Team Delight</h2>
                        <AboutBox title="Our Goal" className="about-box-left" icon={icon1}>
                            Our goal is to take advantage of modern technology and create a web-based talent management platform designed to support the entire people management spectrum. This is the place where you can evaluate the annual performance of your consultants and set up individual development plans for the year ahead. TEAM DELIGHT will make the entire process faster, more flexible, transparent and it will definitely help you grow your business.
                        </AboutBox>
                        <AboutBox title="Who's it for?" className="about-box-right" icon={icon2}>
                            TEAM DELIGHT is suitable for all small to large companies that want to automate their performance evaluation process, individual development plans, cascading objectives and for those who want to make information more transparent and accessible. Basically, if you are looking to improve the way you are currently handling people management in your company.
                        </AboutBox>
                        <p>
                            <Button text="Go back" className="button-go-back" href="/" />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About