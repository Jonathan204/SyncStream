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
