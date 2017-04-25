module.exports = (function() {
	var contact = {
		save : function(request, response) {
			var firstname = lastname = nickname = address = company = phonenumber = email = null;
			firstname = request.body.firstName;
			lastname = request.body.lastName;
			nickname = request.body.nickName;
			address = request.body.address;
			company = request.body.company;
			phonenumber = request.body.phoneNumber;
			email = request.body.email;

			var query = "insert into contacts values('" + firstname + "','"
					+ lastname + "','" + nickname + "','" + address + "','"
					+ company + "','" + phonenumber + "','" + email + "')";
			this.connect(query, function(error, results, fields) {
				if (error)
					response.send({
						"status" : "error",
						"message" : error
					});
				else
					response.send({
						"status" : "success",
						"message" : "Successfully added "
								+ request.body.firstName
								+ " into your contacts"
					});
			});
		},
		getAll : function(response) {
			var query = "select * from contacts";
			this.connect(query, function(error, results, fields) {
				if (error)
					response.send({
						"status" : "error",
						"message" : error
					});
				else
					response.send({
						"status" : "success",
						"data" : results
					});
			});
		},

		connect : function(query, callback) {
			var mysql = require('mysql');
			var connection = mysql.createConnection({
				host : 'localhost',
				user : 'root',
				password : 'admin',
				database : 'my_db'
			});

			connection.connect();
			connection.query(query, function(error, results, fields) {
				callback(error, results, fields);
			});

			connection.end();
		}
	}

	return contact;

})();