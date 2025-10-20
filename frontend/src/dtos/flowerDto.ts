export interface FlowerDTO {
    flowerNumber: number;
    lastWateredAt: Date;
    diedAt: Date | null;
    createdAt: Date;
    healthState: number;
}