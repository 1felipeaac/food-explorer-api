class UserRepositoryInMemory {
    users =[]

    async create({email, name, password}){
        const user = {
            id: Math.floor(Math.random() * 100) + 1,
            email, 
            name, 
            password
        }
        console.log("estou no create do repositoryMemory")

        this.users.push(user)

        return user
    }
    async findByEmail(email){
        return this.users.find(user => user.email === email)
    }

    async findByUser(id){
        return this.users.find(user => user.id === id)
    }
}

module.exports = UserRepositoryInMemory