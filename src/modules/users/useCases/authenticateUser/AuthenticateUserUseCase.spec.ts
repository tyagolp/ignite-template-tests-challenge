import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError"

let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase
let userRepositoryInMemory: InMemoryUsersRepository


describe('Autheticate User', () => {

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
  })


  it('shold be able to authenticate', async () => {
    const { email } = await createUserUseCase.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste'
    })

    const user = await authenticateUserUseCase.execute({ email, password: 'teste' })

    expect(user).toHaveProperty("token")
  })

  it('shold be not able to authenticate with email or password incorrect', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'teste@teste.com',
        password: 'teste2'
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })
})
