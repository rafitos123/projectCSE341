const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello, world!');
    });



router.use('/soccer', require('./soccer'));
router.use('/club', require('./club'));

module.exports = router;