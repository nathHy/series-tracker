var _ = require('lodash')

function sendJSON (error,data) {
	if (data ===undefined) data={}
	json={error:error,data:data}

	// if (message) {
	// 	json.data={message:message}
	// }
	// if (data) {
	// 	_.merge(json.data,data)
	// }
	return json
}

function isInt (input) {
	// console.log(typeof(input),input);
	return Number(input) === input && input % 1 === 0;
}

exports.sendJSON = sendJSON;
exports.isInt = isInt;
