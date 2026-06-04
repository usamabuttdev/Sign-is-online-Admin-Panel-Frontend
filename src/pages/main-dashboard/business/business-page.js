import React from 'react'
import { Helmet } from 'react-helmet-async'
import BusinessViewPage from 'src/sections/main-sections/business/view/business-list-page'

const BusinessPage = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard: Business Page</title>
            </Helmet>
            <BusinessViewPage />
        </div>
    )
}

export default BusinessPage