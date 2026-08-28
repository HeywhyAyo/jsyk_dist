import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { WebhooksService } from './webhooks.service';
import { PrintifyWebhookDto } from 'src/printify/dto/printify-webhook.dto';
export declare class WebhooksController {
    private readonly webhookService;
    private readonly logger;
    constructor(webhookService: WebhooksService);
    private readonly SecretKey;
    private STRIPE_WEBHOOK_SECRET;
    private STRIPE_API_KEY;
    handle(req: Request): Promise<{
        received: boolean;
    }>;
    handleWebhook(req: RawBodyRequest<Request>, signature: string, payload: PrintifyWebhookDto): Promise<{
        received: boolean;
    }>;
}
