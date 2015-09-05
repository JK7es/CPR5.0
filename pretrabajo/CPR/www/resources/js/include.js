(function(scriptCode) {
  scriptCode(window.jQuery, window, document);
}(function($, window, document) {

  IncludeModule = function() {

  }

  IncludeModule.prototype = (function() {

    // Atributos privados

    // / Metodos privados
    var includeHTML = function(){
      var container = $(this);
      container.load( container.data("include") );
    };
    
    // Atributos publicos
    var conf = {
      
    };

    // Metodos publicos
    var initialize = function() {

      // Incluimos los html de la pagina
      $("[data-include]").each(includeHTML);
      
    };

    return {

      // Atributos publicos
      conf : conf,

      // Metodos publicos
      constructor : IncludeModule,
      initialize : initialize

    };
  })();

}));
