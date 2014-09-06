'use strict'

express = require 'express'

router = express.Router();

router.get '/', (req, res) ->
	res.json 'This is index file'
	return

module.exports = router
