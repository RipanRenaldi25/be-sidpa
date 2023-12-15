import IUser from './IUser';

class User {
    private _nik: string;
    private _username: string;
    private _password: string;
    private _roleId: string;
    private _name: string;

    constructor(builder: UserBuilder) {
        this._nik = builder.getNik();
        this._username = builder.getUsername();
        this._password = builder.getPassword();
        this._name = builder.getName();
        this._roleId = builder.getRoleId();
    }

    get nik() {
        return this._nik;
    }
    get username() {
        return this._username
    }
    get password () {
        return this._password
    }
    get roleId() {
        return this._roleId;
    }
    get name() {
        return this._name;
    }

    set nik(nik: string) {
        this._nik = nik;
    }
    set username(username: string) {
        this._username = username;
    }
    set password(password: string) {
        this._password = password;
    }
    set name(name: string) {
        this._name = name;
    }
    set roleId(roleId: string) {
        this._roleId = roleId;
    }
}


class UserBuilder implements IUser {
    name: string = '';
    password: string = '';
    roleId: string = '';
    username: string = '';
    constructor(public nik: string) {}

    getUsername(): string {
        return this.username;
    }
    getNik(): string {
        return this.nik;
    }
    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    getRoleId(): string {
        return this.roleId
    }

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setPassword(password: string): this {
        this.password = password;
        return this;
    }

    setRoleId(roleId: string): this {
        this.roleId = roleId;
        return this;
    }

    setUsername(username: string): this {
        this.username = username;
        return this;
    }
    setNik(nik: string): this {
        this.nik = nik;
        return this;
    }

    build() {
        return new User(this);
    }
}

export default UserBuilder;