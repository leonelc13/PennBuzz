const model = require('../model/model');

const addQuiz = async (req, res) => {
  const response = await model.CreateQuiz.addQuiz(req.body);
  if (!response) {
    return res.status(401).send({ error: 'Quiz submission failed' });
  }

  return res.status(201).send(response);
}

const CreateQuizRoutes = {
  addQuiz: addQuiz
}

module.exports = CreateQuizRoutes;

