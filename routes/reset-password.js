const express = require('express');
const router = express.Router();
const path = require('path');
const Password = require('../models/user');

const checkForgotPasswordCompletion = function (req, res, next) {
    if (req.session.forgotPasswordCompleted) {
      next();
    } else {
      res.status(403).send("Forgot password process not completed.");
    }
  };
  
router.use(checkForgotPasswordCompletion);

// GET request to display Change Password page
router.get("/", function (req, res) {
    res.sendFile(path.resolve('./views/reset-password.html'));
});

// POST request for password change
router.post('/', async (req, res) => {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New passwords do not match' });
    }

    try {
        const passwordDoc = await Password.findOne();
        
        if (!passwordDoc) {
            return res.status(404).json({ message: 'Password not found' });
        }

        passwordDoc.password = newPassword;
        await passwordDoc.save();

        const updatedDoc = await Password.findOne();
        console.log('Updated Password');

        res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
