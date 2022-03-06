const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1',
  apiVersion: '2012-08-10',
});

exports.handler = (event, context, callback) => {
  // TODO implement
  const type = event.type;

  const params = {
    TableName: 'people-table',
  };
  if (type === 'single') {
    dynamoDB.getItem(
      {
        ...params,
        Key: {
          UserId: {
            S: 'user_0.9553733464564136',
          },
        },
      },
      function (error, data) {
        if (error) {
          callback(error);
        } else {
          const item = {
            userId: data.Item.UserId.S,
            name: data.Item.Name.S,
            age: +data.Item.Age.N,
            income: +data.Item.Income.N,
          };

          callback(null, item);
        }
      }
    );
  } else if (type === 'all') {
    dynamoDB.scan(params, function (error, data) {
      if (error) {
        callback(error);
      } else {
        const items = data.Items.map((item) => ({
          userId: item.UserId.S,
          name: item.Name.S,
          age: +item.Age.N,
          income: +item.Income.N,
        }));
        callback(null, items);
      }
    });
  } else {
    callback(null, 'nothing');
  }
};
