function matchPath(configPath, reqPath) {
    const regex = new RegExp(
        '^' + configPath.replace(/:\w+/g, '[^/]+') + '$'
    );
    return regex.test(reqPath);
}

module.exports = matchPath;