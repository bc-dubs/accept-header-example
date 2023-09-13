const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/cats' : responseHandler.getCats,
    '/': responseHandler.getIndex,
    index: responseHandler.getIndex
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept; // .headers will give a comma separated string list in order of preference

    // if/elses and switches are inefficient, so use a dictionary!

    const handlerFunction = urlStruct[parsedUrl.pathname];

    (handlerFunction || responseHandler.getIndex)(request, response, acceptedTypes); // If the url doesn't exist, handlerFunction is undefined (a falsy value)

    //console.log(`URL: ${request.url}`);
    //console.dir(parsedUrl);
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});
