const isDev = window.location.href.includes('localhost');

const assetsPath = isDev ? 'http://localhost:8080/src/assets' : window.location.href.replace('index.html', 'assets');

export { assetsPath };
