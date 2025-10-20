export interface FlowerDTO {
    flowerNumber: number;
    lastWateredAt: Date;
    diedAt: Date | undefined;
    createdAt: Date;
    healthState: number;
}