import { petsService } from "../services/PetsService.js";
import BaseController from "../utils/BaseController.js";

export class PetsController extends BaseController {
  constructor() {
    super('api/pets')
    this.router
      .get('', this.getPets)

  }

  /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
  async getPets(request, response, next) {
    try {
      const pets = await petsService.getPets()
      response.send(pets)
    } catch (error) {
      next(error)
    }
  }

}