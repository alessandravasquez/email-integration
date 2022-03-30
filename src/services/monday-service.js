const initMondayClient = require('monday-sdk-js');

const getUserId = async (token, itemId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [Int]) {
        items (ids: $itemId) {
          subscribers{
            id
          }
        }
      }`;
    const variables = { itemId };

    const response = await mondayClient.api(query, { variables });
    return response.data.items[0].subscribers[0].id;
  } catch (err) {
    console.error(err);
  }
};

const getUserEmail = async (token, userId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($userId: [Int]) {
        users (ids: $userId) {
          email
        }
      }`;
    const variables = { userId };

    const response = await mondayClient.api(query, { variables });
    return JSON.stringify(response.data.users[0].email).replace(/["]+/g, '');
  } catch (err) {
    console.error(err);
  }
};

const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_simple_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: String!) {
        change_simple_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, itemId, columnId, value };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getUserId,
  getUserEmail,
  changeColumnValue,
};
