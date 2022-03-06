const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1',
  apiVersion: '2012-08-10',
});

exports.handler = (event, context, callback) => {
  // TODO implement
  const params = {
    Item: {
      UserId: {
        S: event.userId,
      },
      Age: {
        N: event.age,
      },
      Income: {
        N: event.income,
      },
      Name: {
        S: event.name,
      },
    },
    TableName: 'people-table',
  };

  dynamoDB.putItem(params, function (error, data) {
    if (error) {
      callback(null, error);
    } else {
      callback(null, {
        userId: params.Item.UserId.S,
      });
    }
  });
};
