angular.module('stripe')

.controller('MainController', function ($scope, API) {
  $scope.payment = {
    name: 'Daniel Falabella',
    number: 4242424242424242,
    exp_month: 12,
    exp_year: 2017,
    cvc: 123
  };

  $scope.createCard = function (payment) {
    API.createCard(payment)
    .then(function (response) {
      $scope.activeToken = response.id;
      $scope.activeCard = response.card;
    })
    .catch(function (e) {
      console.error(e);
    })
  };

  $scope.chargeCard = function () {
    API.chargeCard($scope.activeToken, 2500000)
    .then(function (response) {
      console.info('STRIPE RESPONSE: ', response);
      $scope.orderSuccess = true;
      alertify.success('Order successfully placed!');
    })
    .catch(function (e) {
      alertify.error(e.data.message);
    })
  };
});
