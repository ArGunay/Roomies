function doAJAXRequest(method, url, headers, data, callback) {

    if (!(arguments.length == 5)) {
        throw new Error()
    }
    //TODO: not sure that this ajax function is able to handle put requests
    if (!["GET", "POST", "DELETE"].includes(method)) throw new Error('Not valid method')

    if (method == "POST" || method == "PUT") {
        if (data) {
            if (!(typeof data === "string")) throw new Error
        }
    }
    httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url, true);

    for (var key in headers) {
        var attrName = key;
        var attrValue = headers[attrName];
        httpRequest.setRequestHeader(attrName, attrValue);
    }

    // if (method == "POST" || method == "DELETE") {
    if (data) {
        console.log(data)
        httpRequest.send(data);
    } else {
        httpRequest.send();
    }
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200 || httpRequest.status == 204) {
                if (httpRequest.responseText) {
                    callback(httpRequest.responseText)
                } else {
                    callback()
                }
            }

        }
    }

}

function doJSONRequest(method, url, headers, data, callback) {
    console.log(data)

    if (typeof data !== 'object') {
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
                throw new Error('not valid json string');
            } catch (e) {
                console.log(e)
            }
        } else {
            throw new Error('Not JSON')
        }
    }

    if (method == "POST" || method == "DELETE" ) { 
        headers["Content-Type"] = "application/json"
        data = JSON.stringify(data)
    }

    doAJAXRequest(method, url, headers, data, (data) => {
        callback(JSON.parse(data))
    })

}
