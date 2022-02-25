const users = [
    {
        userId: '1',
        name: 'User First',
        photoUrl: '',
        email: 'first.user@gmail.com',
        plan: 'free',
        groupId: ''
    },
    {
        userId: '2',
        name: 'User Second',
        photoUrl: '',
        email: 'second.user@gmail.com',
        plan: 'paid',
        groupId: ''
    },
    {
        userId: '3',
        name: 'User Third',
        photoUrl: '',
        email: 'third.user@gmail.com',
        plan: 'trial',
        groupId: ''
    }
];

export const getUser = () => {
    let user;
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
    } else {
        user = users[Math.floor(Math.random() * users.length)];
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
}