const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })

        const createdUser = await user.save();
        res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '2h' })
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' })
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.google = async (req, res, next) => {
    try {
      const { name, email, googlePhotoUrl } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: 'Invalid user data' });
      }
  
      let existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        existingUser = new User({
          username: name,
          email: email,
          password: 'defaultPw',
          profileImage: googlePhotoUrl,
          isAdmin: false,
        });
        await existingUser.save();
      }
  
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
  
      res.cookie('access_token', token, { httpOnly: true })
    res.status(200).json({ token, user: existingUser });
  
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

exports.getUserProfile = async (req, res) => {
const { id } = req.params

    try {
        const user = await User.findById(id)

        if (user) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found'});
        } 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(id);
        const saltRounds = 10;

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            if (password) {
                user.password = bcrypt.hashSync(password, saltRounds)
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: '2h' })
            })
        } else {
            res.status(404).json({ message: 'User not found '});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};