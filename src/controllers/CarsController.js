import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAllCars)
      .get('/search', this.getCarsByQuery)
      .get('/:carId', this.getCarById)
  }
  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getAllCars(request, response, next) {
    try {
      const cars = await carsService
        .getAllCars()
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getCarById(request, response, next) {
    try {
      const carId = request.params.carId
      const car = await carsService.getCarById(carId)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getCarsByQuery(request, response, next) {
    try {
      const carQuery = request.query
      const cars = await carsService.getCarsByQuery(carQuery)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }
}