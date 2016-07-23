var exports = module.exports = {},
    Keys    = require('../config/keys.js'),
    stripe  = require("stripe")(Keys.stripeSecretKey);

exports.chargeCard = function (req, res) {
  stripe.charges.create({
    amount: req.body.amount,
    currency: "usd",
    source: req.body.userToken,
    description: "McApple Watch"
  }, function(err, charge) {
    if (err) return res.status(err.statusCode || 400).json(err);
    res.json(charge);
  });
};
