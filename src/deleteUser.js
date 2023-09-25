const AWS = require('aws-sdk');

const deleteUser = async event => {
    try {

        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { email } = JSON.parse(event.body);
        const id = email;

        await dynamodb.delete({
            TableName: 'EstudiaTable',
            Key: {
                id,
            }
        }).promise();

        return {
            status: 200,
            body: {
                message: 'User deleted successfully',
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deleteUser,
}