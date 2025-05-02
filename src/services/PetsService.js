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

  async getPetByQuery(petQuery) {
    console.log('pet query running', petQuery)
    const pageNumber = parseInt(petQuery.page) || 1
    const petLimit = 5
    const skipAmount = pageNumber * petLimit - petLimit
    delete petQuery.page

    const sortBy = petQuery.sortBy
    delete petQuery.sortBy

    const petsCount = await dbContext.Pet.countDocuments(petQuery)
    const totalPages = Math.ceil(petsCount / petLimit) || 1

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is greater than the total amount of pages (${totalPages})`)
    }

    const pets = await dbContext.Pet
      .find(petQuery)
      .limit(petLimit)
      .skip(skipAmount)
      .sort(sortBy)
      .populate('creator')

    const responseObj = {
      currentPage: pageNumber,
      pets: pets,
      totalPets: petsCount,
      totalPages: totalPages
    }

    return responseObj
  }

}

export const petsService = new PetsService()