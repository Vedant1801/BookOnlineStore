


import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    // ✅ Accept both 'Authorization: Bearer token' or legacy 'atoken'
    const token =
      req.headers.authorization?.split(' ')[1] || req.headers.atoken;
      // console.log('Received token in middleware:', token);
      

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not Authorized. Login again.' });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (typeof decoded === 'string') {
      if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res
          .status(401)
          .json({ success: false, message: 'Not Authorized. Login again.' });
      }
    } else if (!decoded.isAdmin) {
      // ✅ If you are using admin role JWT payload
      return res
        .status(403)
        .json({ success: false, message: 'Access denied. Admin only.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Admin Auth Error:', error);
    res
      .status(401)
      .json({ success: false, message: 'Not Authorized. Login again.' });
  }
};

export default authAdmin;

