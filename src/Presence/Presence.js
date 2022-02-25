import React, { useEffect, useState } from 'react'
import { useSnippyly } from '../context/SnippylyContext';

function Presence() {

    const [users, setUsers] = useState({});

    const { snippyly } = useSnippyly();

    useEffect(() => {
        console.log('snippyly in presence', snippyly);
        if (snippyly) {
            getOnlineUsers();
        }
    }, [snippyly]);

    const getOnlineUsers = () => {
        const presenceElement = snippyly.getPresenceElement();
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