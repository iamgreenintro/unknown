import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run app-administrator:serve',
        production: 'npx nx run app-administrator:serve-static',
      },
      ciWebServerCommand: 'npx nx run app-administrator:serve-static',
      ciBaseUrl: 'http://localhost:4200',
      webServerConfig: {
        timeout: 30000, // 30s, increase when needed as test scenarios grow.
      },
    }),
    baseUrl: 'http://localhost:4200',
  },
});
