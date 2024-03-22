const User = require("../Models/user.model");

module.exports = {

  updateUser: async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        }, { new: true });
        const { password, __v, createdAt, ...others } = updatedUser._doc;

        res.status(200).json({ ...others });
    } catch (err) {
        res.status(500).json(err)
    }
},

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if(!user)
       return res.status(401).json("User doesn't exist");

      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json( userData);

    } catch (error) {
      res.status(500).json(error);
    }
  },
};
