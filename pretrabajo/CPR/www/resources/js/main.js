(function(scriptCode) {
  scriptCode(window.jQuery, window, document);
}(function($, window, document) {
  // DOM is ready
  $(function() {
    /** **************************************************************************************************** */
    // Init
    var cpr = new CPR();
    cpr.initialize();

  });
  // End ready

  CPR = function() {

  }

  CPR.prototype = (function() {

    // Atributos privados
    var modulos = {
    
    }

    // / Metodos privados

    // Atributos publicos
    var conf = {
      
    };

    // Metodos publicos
    var initialize = function() {

      // Iniciamos los modulos comunes
      modulos.include = new IncludeModule();
      
      // Incluimos los HTML
      modulos.include.initialize();

    };


    return {

      // Atributos publicos
      conf : conf,

      // Metodos publicos
      constructor : CPR,
      initialize : initialize

    };
  })();

}));
