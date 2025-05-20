/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Este archivo contiene ejemplos de vulnerabilidades para demostrar SonarQube
 * NO USAR EN PRODUCCIÓN - SOLO PARA FINES EDUCATIVOS
 */

// Ejemplo 1: SQL Injection
function vulnerableSQLQuery(userId: string): string {
  // VULNERABLE: No sanitiza el input
  return `SELECT * FROM users WHERE id = ${userId}`;
}

// Ejemplo 2: XSS (Cross-Site Scripting)
function vulnerableXSS(userInput: string): string {
  // VULNERABLE: Inserta HTML sin sanitizar
  return `<div>${userInput}</div>`;
}

// Ejemplo 3: Hardcoded Credentials
const DB_PASSWORD = 'superSecret123!'; // VULNERABLE: Credenciales hardcodeadas

// Ejemplo 4: Unsafe Deserialization
function vulnerableDeserialization(data: string): any {
  // VULNERABLE: Usa eval para deserializar
  return eval(data);
}

// Ejemplo 5: Insecure Direct Object Reference
function vulnerableIDOR(userId: string): string {
  // VULNERABLE: No verifica permisos
  return `/api/users/${userId}/data`;
}

// Ejemplo 6: Command Injection
function vulnerableCommandExec(command: string): void {
  // VULNERABLE: Ejecuta comandos sin sanitizar
  console.log(`Ejecutando: ${command}`);
}

// Ejemplo 7: Path Traversal
function vulnerableFileAccess(filename: string): string {
  // VULNERABLE: No valida el path
  return `/files/${filename}`;
}

// Ejemplo 8: Insecure Random
function vulnerableRandom(): number {
  // VULNERABLE: Usa Math.random() para valores criptográficos
  return Math.random();
}

// Ejemplo 9: Missing CSRF Protection
function vulnerableFormSubmit(data: any): void {
  // VULNERABLE: No incluye token CSRF
  console.log('Enviando datos:', data);
}

// Ejemplo 10: Insecure Cookie
const cookieOptions = {
  // VULNERABLE: Cookie sin flags de seguridad
  name: 'session',
  value: '123',
  httpOnly: false,
  secure: false,
};

// ===== EJEMPLOS DE RELIABILITY =====

// Ejemplo 1: Null Pointer Dereference
function vulnerableNullCheck(user: any): string {
  // RELIABILITY ISSUE: Posible NullPointerException
  return user.name.toUpperCase();
}

// Ejemplo 2: Infinite Loop
function vulnerableInfiniteLoop(): void {
  // RELIABILITY ISSUE: Bucle infinito
  while (true) {
    console.log('Esto nunca termina');
  }
}

// Ejemplo 3: Unreachable Code
function vulnerableUnreachableCode(): string {
  // RELIABILITY ISSUE: Código inalcanzable
  return 'Hola';
  console.log('Esto nunca se ejecuta');
}

// Ejemplo 4: Array Index Out of Bounds
function vulnerableArrayAccess(arr: number[]): number {
  // RELIABILITY ISSUE: Acceso fuera de límites
  return arr[arr.length];
}

// Ejemplo 5: Resource Leak
function vulnerableResourceLeak(): void {
  // RELIABILITY ISSUE: Fuga de recursos
  const timer = setInterval(() => {
    console.log('Timer activo');
  }, 1000);
  // Falta clearInterval(timer)
}

// Ejemplo 6: Division by Zero
function vulnerableDivision(a: number, b: number): number {
  // RELIABILITY ISSUE: Posible división por cero
  return a / b;
}

// Ejemplo 7: Unhandled Promise Rejection
function vulnerablePromise(): Promise<void> {
  // RELIABILITY ISSUE: Promesa sin manejo de errores
  return new Promise((resolve, reject) => {
    throw new Error('Error no manejado');
  });
}

// Ejemplo 8: Type Coercion
function vulnerableTypeCoercion(value: any): boolean {
  // RELIABILITY ISSUE: Coerción de tipos insegura
  return value == true;
}

// Ejemplo 9: Dead Code
function vulnerableDeadCode(): void {
  // RELIABILITY ISSUE: Código muerto
  if (false) {
    console.log('Esto nunca se ejecuta');
  }
}

// Ejemplo 10: Unsafe Type Assertion
function vulnerableTypeAssertion(value: any): string {
  // RELIABILITY ISSUE: Aserción de tipo insegura
  return (value as string).toLowerCase();
}
// Ejemplo de código duplicado
function duplicatedBlock1(): void {
  const user: any = {};
  user.nombre = 'Gonzalo';
  user.apellido = 'Carmenado';
  user.edad = 30;
  user.pais = 'España';
  user.activo = true;
  console.log(user);
}

function duplicatedBlock2(): void {
  const user: any = {};
  user.nombre = 'Gonzalo';
  user.apellido = 'Carmenado';
  user.edad = 30;
  user.pais = 'España';
  user.activo = true;
  console.log(user);
}
