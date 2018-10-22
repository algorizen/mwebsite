import Router from "./utils/router"
import home from "./controllers/home"
import homeController from "./controllers/home-main"
import filmController from "./controllers/film"
import cinemaController from "./controllers/cinema"
import loginController from "./controllers/login"
import cityController from "./controllers/city"
import detailController from "./controllers/detail"
import cinemadetailController from "./controllers/cinemadetail"
import meController from "./controllers/me"
import scheduleController from "./controllers/schedule"
import cardController from './controllers/card'
import mallController from './controllers/mall'

home.render();

const router = new Router()
router.init()
router.route('#home', homeController.render)
router.route('#film', filmController.render)
router.route('#cinema', cinemaController.render)
router.route('#login', loginController.render)
router.route('#city', cityController.render)
router.route('#detail', detailController.render)
router.route('#cinemadetail', cinemadetailController.render)
router.route('#me', meController.render)
router.route('#schedule', scheduleController.render)
router.route('#card', cardController.render)
router.route('#mall', mallController.render)