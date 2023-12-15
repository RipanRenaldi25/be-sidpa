interface IUser {
    nik: string
    username: string
    password: string
    name: string
    roleId: string
    
    setUsername(username: string): this
    getUsername(): string
    setName(name: string): this
    getName(): string
    setPassword(password: string): this
    getPassword(): string
    setRoleId(roleId: string): this
    getRoleId(): string
    getNik(): string
    setNik(nik: string): this
};

export default IUser;