const config = require('../config/metrics.config');
const matchPath = require('../pathMatcher');
const {
    httpRequestTotal,
    httpRequestDuration,
} = require('../metrics');

function metricsMiddleware(req, res, next) {
    const start  = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;

        httpRequestTotal.inc({
            method: req.method,
            path: req.route?.path || req.path,
            status: res.statusCode,
        });

        httpRequestDuration.observe(
            {
                method: req.method,
                path: req.route?.path || req.path,
            },
            duration
        );
    });

    next();
};

module.exports = metricsMiddleware;