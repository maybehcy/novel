module.exports = (req, res) => {
    const { message } = req.query;
    res.render('regsiter/user-regsiter', { message: message });
}