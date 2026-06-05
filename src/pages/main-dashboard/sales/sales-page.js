import React from 'react'
import { Helmet } from 'react-helmet-async'
import SalesListView from 'src/sections/main-sections/sales/view/sales-list-view'

const SalesPage = () => {
    return (
        <>
            <Helmet>
                <title> Dashboard : Sales</title>
            </Helmet>
            <SalesListView/>
        </>
    )
}

export default SalesPage