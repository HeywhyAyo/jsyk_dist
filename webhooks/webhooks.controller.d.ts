import { Request } from 'express';
import { WebhooksService } from './webhooks.service';
export declare class WebhooksController {
    private readonly webhookService;
    private readonly logger;
    constructor(webhookService: WebhooksService);
    private readonly SecretKey;
    handle(req: Request, signature: string): Promise<{
        received: boolean;
    }>;
}
