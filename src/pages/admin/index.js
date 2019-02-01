import React, { Component } from 'react'

import PageTitle from '../../components/pageTitle'

import './admin.scss'

class AdminPage extends Component {

    render() {

        const { pageType, pageTitle, children, ...rest } = this.props

        return (
            <div className={`page page-${pageType}`} {...rest}>
				<div className="content-page">
                    <PageTitle title={pageTitle} />
                    <div className={`admin-page-wrap ${pageType}-page`}>
                        { children }
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage