const AWS = require('aws-sdk');

const getUser = async (event) => {
    try {
        
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { email } = JSON.parse(event.body);

        const result = await dynamodb.get({
            TableName: 'EstudiaTable',
            Key: {
                id: email
            }
        }).promise();

        const user = result.Item;

        return {
            status: 200,
            body: user
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getUser,
}