import React, { useState } from 'react'

const UsersContext = React.createContext()

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])

    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider } 