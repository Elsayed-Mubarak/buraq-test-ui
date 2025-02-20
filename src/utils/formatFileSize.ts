export function formatFileSize(sizeInBytes: number): string {
    if (sizeInBytes < 1000) {
        return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1000 * 1000) {
        return `${(sizeInBytes / 1000).toFixed(1)} KB`;
    } else if (sizeInBytes < 1000 * 1000 * 1000) {
        return `${(sizeInBytes / (1000 * 1000)).toFixed(1)} MB`;
    } else {
        return `${(sizeInBytes / (1000 * 1000 * 1000)).toFixed(1)} GB`;
    }
}