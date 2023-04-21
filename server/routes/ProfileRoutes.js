const model = require('../model/model');

const getProfileByUsername = async (req, res) => {
  const { username } = req.query;
  const profile = await model.ProfilePage.getProfileByUsername(username);
  console.log(res);
  console.log(profile);
  if (!profile) {
    return res.status(401).send({ error: 'Profile not found' });
  }

  return res.status(201).send(profile);
};

const ProfileRoutes = {
  getProfileByUsername: getProfileByUsername
}

module.exports = ProfileRoutes;

