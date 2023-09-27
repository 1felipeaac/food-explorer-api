const UserService = require("../UsersService")
const UserRepositoryInMemory = require("./UserRepositoryInMemory")
const AppError = require("../../utils/AppError");


describe("Create", () =>{

    let userRepositoryInMemory = null
    let userService = null

    beforeEach(() =>{
         userRepositoryInMemory = new UserRepositoryInMemory()
         userService = new UserService(userRepositoryInMemory)
    })
    
    it("user should be create", async () =>{
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123"
        }
    
        const userCreated = await userService.insert(user)
    
        expect(userCreated).toHaveProperty("id");
    })

    it("user not should be create with exists email", async () =>{
        const user1 = {
            name: "User test 1",
            email: "user@test.com",
            password: "123"
        }
        const user2 = {
            name: "User test 2",
            email: "user@test.com",
            password: "321"
        }

        await userService.insert(user1)
        await expect(userService.insert(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso"))

    })
})