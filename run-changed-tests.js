const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Cargamos nuestro diccionario de datos, siendo una dupla de componente -> prueba afectada
const map = require("./cypress/component-relation-map.json");

//Obtiene los archivos modificados en los commits pendientes
const changedFiles = [
  ...new Set(
    spawnSync("git", ["diff", "--name-only", "HEAD", "HEAD~1"]) // Obtiene los archivos modificados entre el último commit (HEAD) y el commit anterior (HEAD~1)
      .stdout.toString()
      .trim()
      .split("\n")
      .map(f => f.trim())
      .filter(f => !!f)
  ),
];


//console.log("Archivos modificados (raw):", rawChangedFiles);

// Convertimos todos los archivos que no son .ts en su equivalente .ts (si aplicable)
// const changedFiles =  [
//   ...new Set(
//     spawnSync("git", ["status", "--porcelain"])
//       .stdout.toString()
//       .trim()
//       .split("\n")
//       .map(line => line.trim())
//       .filter(line => line && /^[AMR]/.test(line))
//       .map(line => line.replace(/^. /, "").trim()) 
//       .filter(f => !!f)
//   )
// ];
console.log(changedFiles)
console.log("Archivos relevantes .ts (directos o inferidos):", changedFiles);

// Añadimos los .html como si fueran sus correspondientes .ts para buscar en el diccionario
const normalizedChangedFiles = changedFiles.flatMap(file => {
  if (file.endsWith(".html")) {
    const tsEquivalent = file.replace(/\.html$/, ".ts");
    return [file, tsEquivalent];
  }
  return [file];
});

const affectedTests = new Set();

// Se buscan las pruebas que se ven afectadas tras la ejecución del script
for (const file of normalizedChangedFiles) {
  const matched = map[file];
  if (matched) {
    matched.forEach(test => affectedTests.add(test));
  }
}

// Si no hay pruebas afectadas, salimos del script
if (affectedTests.size === 0) {
  console.log("No hay tests afectados que ejecutar.");
  process.exit(0);
}

// Convertimos el conjunto en una lista de pruebas y las unimos en una cadena separada por comas
const testList = Array.from(affectedTests).join(",");
console.log(`Ejecutando tests afectados:\n${testList}\n`);

// Variables para hacer el seguimiento de si alguna prueba falló
let allTestsPassed = true;

// Ejecutamos los comandos necesarios para hacer las pruebas con salida detallada en la terminal (modo headed)
affectedTests.forEach(test => {
  const result = spawnSync("npx", [
    "cypress",
    "run",
    "--spec", test], {
    stdio: "inherit",
    shell: true,
  });
  //Revisamos como ha terminado la prueba, mostrando si la prueba es existosa o no
  if (result.status !== 0) {
    console.error(`Test fallado: ${test}`);
    allTestsPassed = false;
  } else {
    console.log(`Test correcto: ${test}`);
  }
});

// Verificación final de si todos los tests pasaron
if (!allTestsPassed) {
  console.error("Algunas pruebas fallaron.");
  process.exit(1);
}

console.log("Pruebas completadas correctamente.");