import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CarsService {

  async getAllCars() {
    const cars = await dbContext.Cars.find().populate('creator')
    return cars
  }
  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId).populate('creator')
    if (car == null) {
      throw new BadRequest(`${carId} is not a valid car id!`)
    }
    return car
  }
  async getCarsByQuery(carQuery) {
    const pageNumber = parseInt(carQuery.page) || 1
    const carLimit = 5
    const skipAmount = pageNumber * carLimit - carLimit
    delete carQuery.page

    const sortBy = carQuery.sortBy
    delete carQuery.sortBy

    const carsCount = await dbContext.Cars.countDocuments(carQuery)
    const totalPages = Math.ceil(carsCount / carLimit) || 1

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is greater than the total amount of pages (${totalPages})`)
    }

    // const cars = await dbContext.Cars.find({ make: ['Mazda', 'Subaru'] }).populate('creator')
    const cars = await dbContext.Cars
      .find(carQuery)
      .limit(carLimit)
      .skip(skipAmount)
      .sort(sortBy)
      .populate('creator')


    const responseObj = {
      currentPage: pageNumber,
      cars: cars,
      totalCars: carsCount,
      totalPages: totalPages
    }

    return responseObj
  }
}

export const carsService = new CarsService()