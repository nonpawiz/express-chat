const bcrypt = require("bcrypt");

const comparePassword = async (password, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

module.exports = comparePassword;
