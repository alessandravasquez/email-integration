const mondayService = require('../services/monday-service');

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { boardId, itemId, columnId } = inputFields;

    const userId = await mondayService.getUserId(shortLivedToken, itemId);
    if (!userId) {
      return res.status(200).send({});
    }
    const userEmail = await mondayService.getUserEmail(shortLivedToken, userId);
    if (!userEmail) {
      return res.status(200).send({});
    }

    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, columnId, userEmail);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  executeAction
};