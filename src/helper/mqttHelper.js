const { client } = require("../utils/mqtt");

//TEAM LEVEL
// let TOPIC1 = `IPL/NS/to/${userId}/from/team/${teamId}`;
//FIELD LEVEL - PLAYER
// let TOPIC2 = `IPL/NS/to/${userId}/from/player/${playerId}`;

const publishChange = (userIds, team_id, player_id, title, message, type) => {
  //loop through all the user ids and publish the message
  console.log(userIds);
  userIds.forEach((userId) => {
    let topic;

    if (player_id) {
      topic = `IPL/NS/to/${userId}/from/player/${player_id}`;
    } else {
      topic = `IPL/NS/to/${userId}/from/team/${team_id}`;
    }

    console.log("TOPIC", topic);
    client.publish(
      topic,
      JSON.stringify({ type, title, message, timestamp: Date.now() })
    );
  });
};

module.exports = {
  publishChange,
};
