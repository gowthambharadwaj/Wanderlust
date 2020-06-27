class UserClass {
	constructor(userId, firstName, lastName, email, address1, address2, city, state, zip, country) {
		this.userId = userId,
		this.firstName = firstName,
		this.lastName = lastName,
		this.emailAddress = email,
		this.addressField1 = address1,
		this.addressField2 = address2,
		this.city = city,
		this.stateOrRegion = state,
		this.postalCode = zip,
		this.country = country
	}
	getUsers(){
		//return all users
	}
}


const UserClass1 = new UserClass('1', 'Gowtham', 'Bharadwaj', 'gbharadw@uncc.edu', '9543 University Terrace Drive', 'Apartment C', 'Charlotte', 'NC', '28262', 'USA');

module.exports = UserClass1;
