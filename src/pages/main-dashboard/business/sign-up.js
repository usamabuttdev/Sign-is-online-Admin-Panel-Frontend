import React from 'react'
import { Helmet } from 'react-helmet-async'
import SignViewPage from 'src/sections/main-sections/business/view/sign-view-page'

const SignPage = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard: Sign Page</title>
            </Helmet>
            <SignViewPage/>
        </div>
    )
}

export default SignPage