import { dbContext } from "../db/DbContext.js"


class HousesService {
  async getHouses(query) {
    // NOTE second quote in populate methods argument(selector) allows for selecting data from a virtual object to be displayed.
    // NOTE select function allows for similar argument to be made for standard objects.
    // const houses = await dbContext.House.find().select('bedrooms').populate('creator', 'name', 'picture')
    const sortBy = query.order
    delete query.order

    const page = query.page || 1
    delete query.page
    const skipAmount = (page - 1) * 5

    const search = query.search
    delete query.search
    if (search) query.description = { $regex: new RegExp(search) }

    console.log('finding by', query);
    console.log('sorting by', sortBy);
    console.log('on page', page, skipAmount);
    console.log('searching descriptions for', search)

    const houses = await dbContext.House.find(query).sort(sortBy).skip(skipAmount).limit(5).populate('creator')
    const resultCount = await dbContext.House.countDocuments(query)
    return {
      query,
      sortBy,
      page: parseInt(page),
      totalPages: Math.ceil(resultCount / 5),
      // count: houses.length,
      count: resultCount,
      results: houses
    }
  }

}

export const housesService = new HousesService()