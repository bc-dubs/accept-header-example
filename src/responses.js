const fs = require('fs');  // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCats = (request, response, acceptedTypes) => {
  const cat = {
    name: "JeffBob",
    age: 7
  };

  // Parse xml if we got it
  if(acceptedTypes[0] === "text/xml"){
    let xmlResponse = "<response>";
    xmlResponse += `<name>${cat.name}</name>`;
    xmlResponse += `<age>${cat.age}</age>`;
    xmlResponse += "</response>";

    return respond(request, response, xmlResponse, "text/xml");
  }

  // Convert to JSON otherwise
  const catString = JSON.stringify(cat);
  return respond(request, response, catString, 'application/json');
};

module.exports = {
  getCats,
  getIndex,
};
