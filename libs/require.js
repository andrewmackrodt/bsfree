function require(module) {
    module = (function () {
        const paths = require.stack[require.stack.length - 1].split('/').filter(Boolean)
        switch (module) {
            case 'history':
                return 'libs/history/5.3.0/history.production.min.js'
            case 'preact':
                return 'libs/preact/10.13.0/preact.module.min.js'
            case 'preact/hooks':
                return 'libs/preact/10.13.0/hooks.module.min.js'
            case 'preact-router':
                return 'libs/preact-router/4.1.2/preact-router.module.min.js'
            case 'preact-router/match':
                return 'libs/preact-router/4.1.2/match.module.min.js'
        }
        for (const path of module.split('/').filter(Boolean)) {
            if (path === '.') {
                continue
            }
            if (path === '..') {
                if (paths.length === 0) {
                    throw new Error()
                }
                paths.pop()
                continue
            }
            paths.push(path)
        }

        return '/' + paths.join('/')
    })()

    if (module in require.cache) {
        return require.cache[module]
    }

    if (module.endsWith('.scss')) {
        (function () {
            const xmlHttpRequest = new XMLHttpRequest()
            xmlHttpRequest.open('GET', module, false)
            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState !== 4 || xmlHttpRequest.status !== 200) {
                    return
                }
                Sass.compile(xmlHttpRequest.responseText, function (compiled) {
                    const style = document.createElement('style')
                    style.innerHTML = compiled.text
                    document.head.appendChild(style)
                    require.cache[module] = compiled.text
                })
            }
            xmlHttpRequest.send()
        })()

        return;
    }

    const exports = {}
    require.stack.push(module.replace(/(.+\/).+/, '$1'))

    eval((function () {
        const xmlHttpRequest = new XMLHttpRequest()
        let code
        xmlHttpRequest.open('GET', module, false)
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState !== 4 || xmlHttpRequest.status !== 200) {
                return
            }
            code = Babel.transform(xmlHttpRequest.responseText, {
                filename: module.replace(/.+\//, ''),
                plugins: module.match(/\.tsx?$/)
                    ? ['transform-typescript', 'transform-modules-umd']
                    : ['transform-modules-umd'],
                presets: module.match(/\.tsx?$/)
                    ? ['typescript', 'react']
                    : ['react'],
            }).code
        }
        xmlHttpRequest.send()
        return code
    })());

    require.stack.pop()
    return require.cache[module] = exports
}

require.cache = {}
require.stack = [window.location.pathname.replace(/\/[^/]*\.[^/]*$/, '')]
