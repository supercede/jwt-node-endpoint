// const users = [
//     { name: 'admin', password: 'admin', admin: true },
//     { name: 'user1', password: 'user1', admin: false },
//     { name: 'user2', password: 'user2', admin: false },
//     { name: 'user3', password: 'user3', admin: false }
// ]

const users = [
    {
        "id": 1,
        "email" : 'admin@mail.com',
        "role" : 'admin',
        "name" : 'admin',
        "mobile_number" : '0912839',
        "image_url" : "mailbox.com",
        "sales" : "",
        "password": "admin"
    },
    {
        "id": 2,
        "email" : 'user@mail.com',
        "role" : 'attendant',
        "name" : 'user1',
        "mobile_number" : '0912839',
        "image_url" : "mailbox.com",
        "sales" : "",
        "password": "user1"
    },
    {
        "id": 3,
        "email" : 'user@mail.com',
        "role" : 'attendant',
        "name" : 'user2',
        "mobile_number" : '0912839',
        "image_url" : "mailbox.com",
        "sales" : "",
        "password": "user1"
    },
]

module.exports = users
