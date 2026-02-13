const client = require('prom-client');

const register = new client.Registry();
//client.collectDefaultMetrics({ register });

const httpRequestTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'path', 'status'],
    registers: [register],
});

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request latency',
    labelNames: ['method', 'path'],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5],
    registers: [register],
});

module.exports = {
    register,
    httpRequestTotal,
    httpRequestDuration,
};