export class User {
    constructor(fullName, email, password, role = 'student') {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
