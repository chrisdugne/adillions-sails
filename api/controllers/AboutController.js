/**
 * AboutController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var terms = {
  'articles': [{
    'name': 'Conditions de participation',
    'sections': [{
      'name': 'Cadre général',
      'articles': [
        ' Linscription est strictement interdite à toute personne mineure',
        'Toute personne mineure qui tenterait par quelque moyen que ce soit de jouer à Adillions n'
      ]
    }, {
      'articles': [
        ' Linscription est strictement interdite à toute personne mineure',
        'Toute personne mineure qui tenterait par quelque moyen que ce soit de jouer à Adillions n'
      ]
    }]
  }, {
    'name': 'Conditions de participation',
    'sections': [{
      'name': 'Cadre général',
      'articles': [
        ' Linscription est strictement interdite à toute personne mineure',
        'Toute personne mineure qui tenterait par quelque moyen que ce soit de jouer à Adillions n'
      ]
    }, {
      'name': 'Cadre général',
      'articles': [
        ' Linscription est strictement interdite à toute personne mineure',
        'Toute personne mineure qui tenterait par quelque moyen que ce soit de jouer à Adillions n'
      ]
    }]
  }]
};
var path = require('path');

module.exports = {

  index: function (req, res) {
    res.view({
      usePopTitle: true
    });
  },

  reward: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  prizes: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  press: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  faq: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  rules: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  jobs: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  privacy: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  terms: function (req, res) {
    var articles = {},
      locale = res.getLocale(),
      translations = require(path.resolve('config', 'locales/'+ locale)),
      terms_regexx = /terms_([\d])-?([\d])?-?([\d])?/i;

    var terms = {};

    _.forEach(translations, function(value, key) {
      var term = key.match(terms_regexx);
      if(term) {
        terms[key]= value;
      }
    });

    console.log(terms);

    _.forEach(terms, function(value, key) {
      var article = {},
        term = key.match(terms_regexx),
        lvl_1 = term[1],
        lvl_2= term[2],
        lvl_3= term[3];
        console.log(lvl_1, lvl_2, lvl_3)

        if(lvl_1 && !lvl_2 && !lvl_3) {
          // level 1
          articles[lvl_1] = {
            name: value,
            articles: {}
          };
          console.log('level 1', articles)
        }

        if(lvl_1 && lvl_2 && !lvl_3) {
          // level 2
          articles[lvl_1].articles[lvl_2] = {
            name: value,
            articles: {}
          };
        }

        if(lvl_1 && lvl_2 && lvl_3) {
          // level 3
          articles[lvl_1].articles[lvl_2].articles[lvl_3] = {
            name: value
          };
        }

    });

      console.log(articles);

    return res.view({
      usePopTitle: true,
      articles: articles
    });
  },

  advertisers: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  }
};
