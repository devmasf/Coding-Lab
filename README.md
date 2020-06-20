## Coding Lab - Blog App

## Purpose

This is a RESTful API designed with Node.js, Express.js and MongoDB. The purpose of the app is to test other ways to set a secure authentication without using [express-sessions](https://github.com/expressjs/session) or [PassportJS](http://www.passportjs.org/). The UI can improve but is not the main objective that led me to build this application.

## Getting Started

### Installation

In order to run the app you need to have [Node.js](https://nodejs.org/en/) and [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) installed and working locally.

[Documentation for Linux users](https://docs.mongodb.com/manual/administration/install-on-linux/)

In order to install this project, you can run the following commands:

```console
# Clone the project
# HTTPS
$ git clone https://github.com/devmasf/Coding-Lab.git
# SSH
$ git@github.com:devmasf/Coding-Lab.git

# Navigate to the directory
$ cd Coding-Lab

# Install npm
$ npm install
```

Next, you need to set two environment variables:

- `SESSION_SECRET_KEY`
- `JWT_SIGNING_KEY`

The `SESSION_SECRET_KEY` value must be a long, randomly generated string. This
value should be unique on your production servers, and never checked into
version control.

The `JWT_SIGNING_KEY` must be a randomly generated, 256-byte, base64 encoded
string. You can generate this value using the [secure-random][] node library
like so:

```javascript
const secureRandom = require("secure-random");

console.log(secureRandom(256, { type: "Buffer" }).toString("base64"));
```

Like the `SESSION_SECRET_KEY`, `JWT_SIGNING_KEY` must also never be checked into
version control, and must be the same on all production servers.

**TIP**: Read through the settings specified in `settings.js`. There are
several options you will want to enable when running a production website.

Use [npm-ci](https://docs.npmjs.com/cli/ci)

## Tools used

### Security

- [JWT (JSON Web Tokens)](https://jwt.io/)
- [bcrypt](https://github.com/dcodeIO/bcrypt.js/)
- [Helmet](https://helmetjs.github.io/)
- [Cors](https://github.com/expressjs/cors)
- [Morgan](https://github.com/expressjs/morgan)
- [Client-sessions](https://github.com/mozilla/node-client-sessions)

### Validation

- [Express-sanitizer](https://github.com/markau/express-sanitizer)

### UI

- [Semantic UI](https://semantic-ui.com/) or [Fomantic UI](https://semantic-ui.com/) (new version)

#### Learn more about authentication:

- [Randall Degges - Everything you ever wanted to know about Web Authentication in Node](https://www.youtube.com/watch?v=i7of02icPyQ&feature=youtu.be&t=35)
