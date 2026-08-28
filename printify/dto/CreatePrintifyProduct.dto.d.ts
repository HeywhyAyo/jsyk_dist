import { PrintifyVariantDto } from './PrintifyVariant.dto';
import { PrintifyPrintAreaDto } from './PrintifyPrintArea.dto';
export declare class CreatePrintifyProductDto {
    title: string;
    description: string;
    tags?: string[];
    blueprintId: number;
    printProviderId: number;
    variants: PrintifyVariantDto[];
    printAreas: PrintifyPrintAreaDto[];
}
export declare class PrintifyWebhookDto {
    topic: string;
    url: string;
}
