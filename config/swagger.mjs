import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load auto-generated swagger spec
const swaggerFile = readFileSync(join(__dirname, 'swagger-output.json'), 'utf8');
const swaggerSpec = JSON.parse(swaggerFile);

console.log('📚 Swagger spec loaded (auto-generated)');
console.log('📚 Total APIs found:', Object.keys(swaggerSpec.paths || {}).length);

export default swaggerSpec;
