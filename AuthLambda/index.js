function generatePolicy(effect, resource) {
  const policy = {
    Version: '2012-10-17',
    Statement: [{ Action: 'execute-api:Invoke', Effect: effect, Resource: resource }],
  };

  return policy;
}
function getResponse(policy) {
  const principalId = 'afrqwuerpoiqwu';
  return {
    principalId: principalId,
    policyDocument: policy,
    context: {
      simpleAuth: true,
    },
  };
}
exports.handler = (event, context, callback) => {
  // TODO implement
  const token = event.authorizationToken;
  let effect;
  if (token === 'allow') {
    effect = 'allow';
  } else if (token === 'deny') {
    effect = 'deny';
  } else {
    effect = null;
  }

  if (effect) {
    const policy = generatePolicy(effect, event.methodArn);
    const response = getResponse(policy);
    callback(null, response);
  } else {
    callback('Unauthorized');
  }
};
