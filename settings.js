module.exports = {
  // The 'strength' of our bcrypt hashing algorithm.
  // 14 is a good strength at the present time based on the strength
  // of commodity computers
  BCRYPT_WORK_FACTOR: 14,

  // The mongodb error code, which means that you are attempting to create
  // a duplicated object
  DUPLICATE_KEY_ERROR: 11000,

  // Sessions will last for 1 full day
  SESSION_DURATION: 1000 * 60 * 60 * 24,

  // Sessions will be extended by 10 minutes if the user is active
  SESSION_EXTENSION_DURATION: 1000 * 60 * 10,

  // Our unique secret key -- this keeps sessions secure -- it should
  // never be checked into version control, but it should be the same
  // among all servers
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,

  // Only set cookies over https. Set this to true if you are running in
  // production, false otherwise
  SESSION_SECURE_COOKIES: true,

  // Destroy sessions when the browser is closed. set this if you are building a
  // website where security is paramount (aka: banking, healthcare)
  SESSION_EPHEMERAL_COOKIES: true,

  // Use stronger-than-normal security for signing our JWTs
  JWT_SIGNING_ALGORITHM: "HS512",

  // The 256-byte JWT signing key that we'll use to sign all user tokens. This
  // should never be checked into version control, but should be the same among
  // all servers. You can generate the string using "secure-random"
  JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY,
};
