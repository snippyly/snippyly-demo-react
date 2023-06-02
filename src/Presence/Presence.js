import { useVeltClient } from '@veltdev/react';
import React, { useEffect, useState } from 'react'

function Presence() {

    const [users, setUsers] = useState({});

    const { client } = useVeltClient();

    useEffect(() => {
        console.log('velt in presence', client);
        if (client) {
            getOnlineUsers();
        }
    }, [client]);

    const getOnlineUsers = () => {
        const presenceElement = client.getPresenceElement();
        presenceElement.getOnlineUsersOnCurrentDocument().subscribe((users) => {
            console.log('users in react', users);
            setUsers(users);
        });
    }

    return (
        <>
            {
                Object.keys(users).map((key) => {
                    return (
                        <div key={key}>
                            {/* Add custom UI code here */}
                        </div>
                    )
                })
            }
        </>
    )
}

export default Presence;