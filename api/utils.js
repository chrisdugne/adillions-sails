module.exports = {

  isEuroCountry: function (country) {
    var isEuro = country === 'AT' || country === 'BE' || country === 'CY' || country === 'EE' || country === 'FI' || country === 'FR' || country === 'DE' || country === 'GR' || country === 'IE' || country === 'IT' || country === 'LU' || country === 'MT' || country === 'NL' || country === 'PT' || country === 'SK' || country === 'SI' || country === 'ES' || country === 'BG' || country === 'HR' || country === 'CZ' || country === 'DK' || country === 'HU' || country === 'LV' || country === 'LT' || country === 'PL' || country === 'RO' || country === 'SE' || country === 'GB' || country === 'IS' || country === 'LI' || country === 'NO' || country === 'CH' || country === 'MC' || country === 'AL' || country === 'MK' || country === 'ME' || country === 'RS' || country === 'BA';

    return isEuro;
  },

  displayPrice: function (price, country) {
    if (!price) {
      price = 0;
    }

    if (this.isEuroCountry(country)) {
      return price + ' €';
    } else {
      return 'US$ ' + price;
    }
  },

  countryPrice: function (euros, country, rateUSDtoEUR) {
    if (!euros) {
      euros = 0;
    }

    if (this.isEuroCountry(country)) {
      return euros;
    } else {
      return Math.round(euros * rateUSDtoEUR);
    }
  },

  convertAndDisplayPrice: function (price, country, rateUSDtoEUR) {
    return this.displayPrice(this.countryPrice(price, country, rateUSDtoEUR), country);
  }

};
