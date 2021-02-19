import bcrypt from "bcrypt";
const saltRounds = 13;
export const encrypt = async (secret) => {
  return await bcrypt
    .hash(secret, saltRounds)
    .then((hash) => {
      return hash;
    })
    .catch((err) => {
      throw err;
    });
};

export const comparePassword = async (provided, hash) => {
  return await bcrypt
    .compare(provided, hash)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
