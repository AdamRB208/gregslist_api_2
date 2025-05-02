import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";


export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router.get('', this.getHouses)
  }

  async getHouses(request, response, next) {
    try {
      const query = request.query
      console.log('query', query)
      const houses = await housesService.getHouses(query)
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }
}
