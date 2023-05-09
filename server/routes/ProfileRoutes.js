const { get } = require('..');
const model = require('../model/model');

const getProfileByUsername = async (req, res) => {
  const { username } = req.query;
  const profile = await model.ProfilePage.getProfileByUsername(username);
  if (!profile) {
    return res.status(401).send({ error: 'Profile not found' });
  }

  return res.status(201).send(profile);
};

const getAllQuizzes = async (req, res) => {
  const quizzes = await model.ProfilePage.getAllQuizzes();
  if (!quizzes) {
    return res.status(401).send({ error: 'Error finding quizzes' });
  }

  return res.status(201).send(quizzes);
};

const getCreatedQuizzes = async (req, res) => {
  const { author_name } = req.query;
  const quizzes = await model.ProfilePage.getCreatedQuizzes(author_name);
  if (!quizzes) {
    return res.status(401).send({ error: 'Error finding quizzes' });
  }

  return res.status(201).send(quizzes);
};

const getFavoriteQuizzes = async (req, res) => {
  const { author_name } = req.query;
  const quizzes = await model.ProfilePage.getFavoriteQuizzes(author_name);
  if (!quizzes) {
    return res.status(401).send({ error: 'Error finding quizzes' });
  }

  return res.status(201).send(quizzes);
};


const ProfileRoutes = {
  getProfileByUsername: getProfileByUsername,
  getAllQuizzes: getAllQuizzes,
  getCreatedQuizzes: getCreatedQuizzes,
  getFavoriteQuizzes: getFavoriteQuizzes
}

module.exports = ProfileRoutes;

