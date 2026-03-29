"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const seedSuperAdmin_1 = require("./users/shared/utilities/seedSuperAdmin");
const users_service_1 = require("./users/users.service");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const userService = app.get(users_service_1.UsersService);
    app.use(cors());
    if (process.env.SEED_SUPER_ADMIN === "true") {
        await (0, seedSuperAdmin_1.seedSuperAdmin)(userService);
    }
    if (!process.env.SWAGGER_PASSWORD) {
        console.error("SWAGGER_PASSWORD env var is required! Exiting...");
        process.exit(1);
    }
    app.use(["/api"], basicAuth({
        users: { admin: process.env.SWAGGER_PASSWORD },
        challenge: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("JSYK BACKEND API")
        .setDescription("API documentation for JSYK")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
    }, "bearerAuth")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const express = app.getHttpAdapter().getInstance();
    express.get('/swagger.json', (_req, res) => res.json(document));
    express.get('/swagger-extra.js', (_req, res) => {
        res
            .type('application/javascript')
            .send(`
        (function () {
          // wait for UI to mount
          const onReady = () => {
            const topbar = document.querySelector('.swagger-ui .topbar');
            if (!topbar) return;
            const link = document.createElement('a');
            link.href = '/docs-json';
            link.textContent = 'OpenAPI JSON';
            link.target = '_blank';
            link.style.marginLeft = '12px';
            link.style.fontWeight = '600';
            link.style.textDecoration = 'none';
            topbar.appendChild(link);
          };
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onReady);
          } else {
            onReady();
          }
        })();
      `);
    });
    swagger_1.SwaggerModule.setup('/swagger', app, document, {
        customSiteTitle: 'JSYK Swagger',
        customJs: '/swagger-extra.js',
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map