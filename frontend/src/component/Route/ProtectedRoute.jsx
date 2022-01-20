import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

//For Logged in user only
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user)
    return (
        <>
            {!loading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false) {
                            return <Redirect to="/login" />
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}

export default ProtectedRoute
