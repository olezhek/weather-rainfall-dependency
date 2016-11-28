
export function getData(url) {
    return promisedXhr('GET', url);
}

function promisedXhr(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(this.responseText);
        };
        xhr.onerror = reject;
        xhr.open(method, url, true);
        xhr.send();
    });
}