## Coding Lab - Blog App

## Purpose

Coding Lab is a RESTful API designed with Node.js, Express.js and MongoDB.
The purpose of the app is to test different ways of setting a secure web
application, using bcrypt for hashing, JWT for authentication and authorization,
helmet for HTTP headers and other security packages.

## Getting Started

### Installation

In order to run the app you need to have [Node.js](https://nodejs.org/en/) and
[MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
installed and working locally.

To start, let's install the project running the following commands:

```console
# Clone the project via HTTPS
$ git clone https://github.com/devmasf/coding-lab.git

# Clone the project via SSH
$ git@github.com:devmasf/coding-lab.git

# Navigate to the directory
$ cd coding-lab

# Install npm
$ npm install

# Run the app in PORT 3000
$ npm run dev
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

## Tools

### Security & Authentication

- [JWT (JSON Web Tokens)](https://jwt.io/)
- [bcrypt](https://github.com/dcodeIO/bcrypt.js/)
- [Helmet](https://helmetjs.github.io/)
- [Cors](https://github.com/expressjs/cors)
- [Morgan](https://github.com/expressjs/morgan)
- [Client-sessions](https://github.com/mozilla/node-client-sessions)

### Validation

- [Mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator)
- [Express-sanitizer](https://github.com/markau/express-sanitizer)

### UI

- [Semantic UI](https://semantic-ui.com/) or
  [Fomantic UI](https://semantic-ui.com/) (new version)

## Learn more

**Error Handling:**
[Express Documentation Guide](https://expressjs.com/en/guide/error-handling.html)

**Authentication:**
[Randall Degges - Everything you ever wanted to know about Web Authentication in Node](https://www.youtube.com/watch?v=i7of02icPyQ&feature=youtu.be&t=35)
