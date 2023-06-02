import { VeltPresence, useVeltClient } from '@veltdev/react';
import React, { useEffect, useState } from 'react';
import Menus from '../Menus/Menus';
import { Users } from '../users';

function Toolbar({ onMenuSelect }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const users = Users;

    const { client } = useVeltClient();

    useEffect(() => {
        // If user is logged in then set it to selected user state
        if (localStorage.getItem('user')) {
            setSelectedUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [])

    useEffect(() => {
        if (selectedUser && client) {
            identifyVelt();
        }
    }, [selectedUser && client])

    const identifyVelt = async () => {
        if (client) {
            client.identify(selectedUser).then((res) => {
                // User login successful
            }).catch((err) => {
                // User login failure
            });
        }
    }

    const signOut = async () => {
        if (client) {
            await client.signOutUser();
        }
        localStorage.removeItem('user');
        window.location.reload();
    }

    const signIn = (user) => {
        // Add custom logic here to login user
        // Once user is available call identifyVelt
        localStorage.setItem('user', JSON.stringify(user));
        setSelectedUser(user);
    }

    return (
        <div className='header'>
            <VeltPresence />
            <Menus onMenuSelect={onMenuSelect} />
            <div>
                {
                    selectedUser ?
                        <div>
                            <span>Hi, {selectedUser?.name}</span>
                            <button className='custom-btn' onClick={() => signOut()}>Sign Out</button>
                        </div>
                        :
                        <div>
                            <span>Sign In with:</span>
                            {
                                users.map((user) => {
                                    return (
                                        <button key={user.userId} className='custom-btn' onClick={() => signIn(user)}>{user?.name}</button>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Toolbar;