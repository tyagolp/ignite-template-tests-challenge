import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError"
import { CreateUserUseCase } from "./CreateUserUseCase"


let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: InMemoryUsersRepository


describe('Create User', () => {

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })


  it('shold be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste'
    })

    expect(user).toHaveProperty("id")
  })

  it('shold not be able to create a user with a email equal', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: 'teste@teste.com',
        name: 'teste',
        password: 'teste'
      })
      await createUserUseCase.execute({
        email: 'teste@teste.com',
        name: 'teste2',
        password: 'teste2'
      })
    }).rejects.toBeInstanceOf(CreateUserError)
  })
})
