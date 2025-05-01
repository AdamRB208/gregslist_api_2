import { dbContext } from "../db/DbContext.js"


class HousesService {
  async getHouses() {
    // NOTE second quote in method argument(selector) allows for selecting data from an object.
    // const houses = await dbContext.House.find().populate('creator', 'name picture')
    const houses = await dbContext.House.find().populate('creator')
    return houses
  }

}

export const housesService = new HousesService()