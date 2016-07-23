angular.module('stripe')

.factory('API', function ($http, $q) {
  var service = {};

  Stripe.setPublishableKey('pk_test_bSyAaHTXEvDqZAUlB1ePHkAW');

  service.createCard = function (card) {
    var deferred = $q.defer();

    Stripe.card.createToken(card, function (status, response) {
      if (response.error) return deferred.reject(response.error);
      if (!response.id) return deferred.reject({message: 'Stripe API changed. Please adjust code.'});
      deferred.resolve(response);
    });

    return deferred.promise;
  };

  service.chargeCard = function (userToken, amount) {
    return $http.post('/api/charge-card', {
      userToken: userToken,
      amount: amount
    });
  };

  return service;
});
