import React from 'react'
import { Helmet } from 'react-helmet-async'
import HistoryListView from 'src/sections/main-sections/history/view/history-list-view'

const HistoryPage = () => {
    return (
        <>
            <Helmet>
                <title> Dashboard : History</title>
            </Helmet>
            <HistoryListView />
        </>
    )
}

export default HistoryPage