module.exports = [
    { method: 'GET', path: '/health' },
    { method: 'GET', path: '/all' },
    { method: 'GET', path: '/one=:id' },
    { method: 'GET', path: '/check' },
    { method: 'POST', path: '/add' },
    { method: 'PUT', path: '/name=:name' },
    { method: 'DELETE', path: '/del=:name' },
];

