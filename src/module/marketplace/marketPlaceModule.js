import MarketPlaceController from "./marketPlaceController.js"
import MarketPlaceService from "./marketPlaceService.js"

export default class MarketPlaceModule {
    constructor(app) {
        this.app = app
        this.marketPlaceService = new MarketPlaceService()
    }

    initModule() {
        new MarketPlaceController(this)
    }
}