import { responseError, responseOk } from "../../utils/responseUtils.js"
import MarketPlaceModule from "./marketPlaceModule.js"
import MarketPlaceService from "./marketPlaceService.js"

export default class MarketPlaceController {
    /** 
     * @param {MarketPlaceModule} marketPlaceModule 
    */
    constructor(marketPlaceModule) {
        this.detail(marketPlaceModule.app, marketPlaceModule.marketPlaceService)
        this.list(marketPlaceModule.app, marketPlaceModule.marketPlaceService)
    }

    /** 
     * @param {Express} app 
     * @param {MarketPlaceService} marketPlaceService 
    */
    detail(app, marketPlaceService) {

        app.get('/marketplace/:productId', 
        /** 
         * @param {import("express").Request} req 
         * @param {import("express").Response} res 
        */
        async (req, res) => {
            const detail = await marketPlaceService.detail(req.params.productId)

            if (detail[0] == 404) {
                return responseError(res, detail[1], null)
            }

            return responseOk(res, 'Success get data', detail[1])
        })
    }

    /**
     * 
     * @param {Express} app 
     * @param {MarketPlaceService} marketPlaceService 
     */
    list(app, marketPlaceService) {
        app.get('/marketplace',
        /** 
         * @param {import("express").Request} req 
         * @param {import("express").Response} res 
        */
        async (req, res, next) => {
            try {
                const list = await marketPlaceService.list(req.query.pageSize, req.query.page, req.query.name)

                if (list[0] == 404) {
                    return responseError(res, list[1], null)
                }
    
                return responseOk(res, 'Success get data', list[1])
            } catch(error) {
                next(error)
            }
        })
    }
}