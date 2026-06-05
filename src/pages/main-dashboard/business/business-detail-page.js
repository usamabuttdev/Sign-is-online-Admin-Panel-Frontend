import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'src/routes/hooks'
import BusinessDetailViewPage from 'src/sections/main-sections/business/view/business-detail-view-page'

const BusinessDetailPage = () => {
    const { id } = useParams()
    return (
        <>
            <Helmet>
                <title>Dashboard: Business Detail Page</title>
            </Helmet>
            <BusinessDetailViewPage id={id} />
        </>
    )
}

export default BusinessDetailPage