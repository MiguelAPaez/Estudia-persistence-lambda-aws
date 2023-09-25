const AWS = require('aws-sdk');

const updateUser = async (event) => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { email, personality_1, personality_2, personality_3, done } = JSON.parse(event.body);
        const id = email;

        await dynamodb.update({
            TableName: 'EstudiaTable',
            Key: {id},
            UpdateExpression: 'set done = :done, personality_1 = :personality_1, personality_2 = :personality_2, personality_3 = :personality_3',
            ExpressionAttributeValues: {
                ':done': done,
                ':personality_1': personality_1,
                ':personality_2': personality_2,
                ':personality_3': personality_3,
            },
            ReturnValues: 'ALL_NEW'
        }).promise();

        return {
            status: 200,
            body: JSON.stringify({
                message: "User updated successfully",
            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    updateUser,
}