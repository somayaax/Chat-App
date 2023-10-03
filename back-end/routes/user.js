const express = require('express');
const { userController } = require('../controller');
const { asycnWrapper } = require('../libs');
const router = express.Router();

router.post(
    '/signup',
    async (req, res, next) => {
        const { body: { userName, password } } = req;
        const user = userController.signUp({ userName, password });
        const [err, data] = await asycnWrapper(user);
        if (err) return next(err);
        res.status(201).json({ success: true });
    }
)
router.post(
    '/login',
    async (req, res, next) => {
        const { body: { userName, password } } = req;
        const user = userController.login(userName, password);
        const [err, data] = await asycnWrapper(user);
        if (err) return next(err);
        res.status(201).json({ success: true, token: data });
    }
)

module.exports = router