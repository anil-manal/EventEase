import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedFile = ({ compo }) => {
    const { auth } = useSelector(state => state.auth)

    if (!auth) {
        return <Navigate to="/login" />
    }

    if (auth.type === "user") {
        return compo
    }
    if (auth.type === "organizer") {
        return compo
    }

    if (auth.type === "admin") {
        return compo
    }

    // If none of the above conditions match, navigate to login
    return <Navigate to="/login" />
}

export default ProtectedFile
