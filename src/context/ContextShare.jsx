import React, { createContext, useState } from 'react'

export const userProfileUpdateContext = createContext()
export const adminProfileUpdateContext = createContext()


function ContextShare({ children }) {
    const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState({})
    const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({})
    return (
        <userProfileUpdateContext.Provider value={{ userProfileUpdateStatus, setUserProfileUpdateStatus }}>
            <adminProfileUpdateContext.Provider value={{adminProfileUpdateStatus, setAdminProfileUpdateStatus}}>
                {children}
            </adminProfileUpdateContext.Provider>
        </userProfileUpdateContext.Provider>
    )
}

export default ContextShare