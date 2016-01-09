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

exports.sendJSON = sendJSON;