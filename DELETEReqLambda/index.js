const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1',
  apiVersion: '2012-08-10',
});

exports.handler = (event, context, callback) => {
  // TODO implement
  const params = {
    TableName: 'people-table',
    Key: {
      UserId: {
        S: event.userId,
      },
    },
  };
  dynamoDB.deleteItem(params, function (error, data) {
    if (error) {
      callback(error);
    } else {
      callback(null, data);
    }
  });
};
