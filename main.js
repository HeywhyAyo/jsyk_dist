"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const seedSuperAdmin_1 = require("./users/shared/utilities/seedSuperAdmin");
const users_service_1 = require("./users/users.service");
const basicAuth = require("express-basic-auth");
const express_rate_limit_1 = require("express-rate-limit");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const all_exceptions_filter_1 = require("./shared/utilities/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const userService = app.get(users_service_1.UsersService);
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:4200',
    ];
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many requests from this IP, please try again after 15 minutes',
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
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