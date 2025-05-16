// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
        // Obliga a las directivas a tener el formato camelCase, de esta manera. el nombre de las mismas esta estandarizadi
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
      ],
      // Obliga a que el nombre de los componentes lleve el prefijo "app". Además el formato de escritura es kebab-case
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],

      // Indica al codigo que todos los componentes deben ser standAlone. En nuestro caso está esactivada, ya que nuestra arquitectura indica
      // que componentes deben ser standAlone y cuales depender de un módulo.
        "@angular-eslint/prefer-standalone": "off",

      // Permite usar variables any, sin embargo estas están completamente desaconsejadas. no se marca como error para habilitar en casos muy especificos
      // su uso sin necesidad de hacer excepciones.
      "@typescript-eslint/no-explicit-any": "warn", 
        
      // Habilita la posibilidad de tipar variables explicitas, es decir let numero:number = 6;
        "@typescript-eslint/no-inferrable-types": "off", 

      // Obliga a nuestro código a poner en todas las funciones un tipo de retorno. En caso de no tener un retorno, sera void
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            "allowExpressions": true
          }
        ],

        // Establece el orden de declaración de las partes principales del código. Primero variables, luego contructor, y finalmente metodos.
        "@typescript-eslint/member-ordering": [
          "error",
          {
            "default": ["field", "constructor", "method", "signature"]
          }
        ],

        // Obliga a poner siempre de manera explicita el ámbito de variables y métodos
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          {
            "accessibility": "explicit",
            "overrides": {
              "accessors": "explicit",
              "constructors": "no-public",
              "methods": "explicit",
              "properties": "explicit",
              "parameterProperties": "explicit"
            }
          }
        ],

        // Evita comparar null usando ==
        "no-eq-null": 2,
        // Prohibe tener variables declaradas pero sin ningun uso ni implementación
        "no-unused-vars": "off",

        // Limita el número de lineas por fichero a 600. Para este conteo ignora los comentarios y las lineas vacias
        "max-lines": [
          "error",
          {
            "max": 600,
            "skipComments": true,
            "skipBlankLines": true
          }
        ],

        // Limita el número de lineas por funcion a 75. Para este conteo ignora los comentarios y las lineas vacias
        "max-lines-per-function": [
          "error",
          {
            "max": 75,
            "skipBlankLines": true,
            "skipComments": true
          }
        ],
      }
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);