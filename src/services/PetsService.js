import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js"

class PetsService {
  async getPets() {
    const pets = await dbContext.Pet.find().populate('creator')
    return pets
  }

  async getPetById(petId) {
    const pet = await dbContext.Pet.findById(petId).populate('creator')
    if (pet == null) {
      throw new BadRequest(`${petId} is not a valid pet!`)
    }
    return pet
  }

}

export const petsService = new PetsService()