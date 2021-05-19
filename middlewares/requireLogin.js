module.exports = (req, res, next) =>
{
    req.user ? next(): res.status(401).send({ error: 'You must log in!' })
}