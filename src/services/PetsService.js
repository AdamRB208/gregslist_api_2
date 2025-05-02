import { dbContext } from "../db/DbContext.js"

class PetsService {
  async getPets() {
    const pets = await dbContext.Pet.find().populate('creator')
    return pets
  }


}

export const petsService = new PetsService()