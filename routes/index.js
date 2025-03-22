const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello, world!');
    });



router.use('/soccer', require('./soccer'));

module.exports = router;