import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

// Secure the password with the berypt
userSchema.pre("save", async function (next) {
  console.log("Pre Method", this);
  const user = this
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }

})

// compare the pasword
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

// Json Web Token
userSchema.methods.generateToken = function () {
  try {
    return jsonwebtoken.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: "30d",
      }
    )
  } catch (error) {
    console.log(error);
  }
};


const User = mongoose.model('User', userSchema);
export default User;