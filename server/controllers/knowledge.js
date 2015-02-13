'use strict';

var server = {},
    getData = require('request');

var url;

function produceTaxonomy( cmsData, newObject ){
  if( typeof newObject === "undefined" ){
    newObject = { name: "", children: [] };
  }
  for( var x= 0, length = cmsData.length; x < length; x++ ){
    if( cmsData[x].node['parent'] == newObject.name ){
      newObject.children.push( {name: cmsData[x].node['name'], id: cmsData[x].node['id'], total: cmsData[x].node['total'], weight: Number(cmsData[x].node['weight']), children: [] } );
    }
  }
  for( var y= 0, length2 = newObject.children.length; y < length2; y++ ){
    produceTaxonomy( cmsData, newObject.children[y] )
  }
  newObject.children.sort( function(a,b) {
    return a.weight - b.weight;
  })
  return newObject;
}

function getArticles( request, reply, nav ){

    getData({
        url: url + '/taxonomy/' + request.params.domain,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            if( request.params.domain && request.params.subDomain ) {
              var taxonomy = produceTaxonomy( body.nodes );
              getData({
                url: url + '/taxonomy/term/' + request.params.subDomain,
                json: true
              }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                  reply.view('knowledge/_domain', {
                    taxonomy: taxonomy,
                    content: body.nodes,
                    navigation: nav,
                    lang: server.lang
                  });
                }
              })
            }else{
              reply.view('knowledge/_domain', {
                taxonomy: produceTaxonomy( body.nodes ),
                content: [],
                navigation: nav,
                lang: server.lang
              });
            }
        }
    })
}
module.exports = function (config, _server) {
    server = _server;
    url = config.cmsURL;
    [
        {
            method: 'GET',
            path: '/knowledge/{domain}/{subDomain?}',
            config: {
                handler: function( request, reply){
                  server.utils.getNav()
                    .then( function(nav){
                      return getArticles( request, reply, nav);
                    });
                }
            }
        }
    ]
        .forEach(function (route) { server.route(route); });
};
