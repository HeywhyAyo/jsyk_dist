import { CollectionStatus } from '../entities/collection.entity';
export declare class CreateCollectionDto {
    name: string;
    description?: string;
    coverImageUrl?: string;
}
export declare class UpdateCollectionDto {
    name?: string;
    description?: string;
    collectionId: string;
    coverImageUrl?: string;
    status?: CollectionStatus;
}
export declare class CollectionCreationDto {
    artistId: string;
    name?: string;
}
