const jwt = require('jsonwebtoken');

// Generate access token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

// Send token in response + cookie
const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  };

  return res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isVerified: admin.isVerified,
      },
    });
};

module.exports = { generateToken, sendTokenResponse };
