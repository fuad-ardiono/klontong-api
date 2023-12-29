export default function corsHeaderFilter(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next()
}