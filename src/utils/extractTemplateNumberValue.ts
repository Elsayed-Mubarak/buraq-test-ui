export function extractLargestTemplateNumber(data: any) {
    const regex = /\{\{(\d+)\}\}/g; // Matches numbers within double curly braces {{}}
    let largestNumber = 0;

    function search(value: any) {
        if (typeof value === 'string') {
            let match;
            while ((match = regex.exec(value)) !== null) {
                const number = parseInt(match[1], 10);
                if (number > largestNumber) {
                    largestNumber = number;
                }
            }
        } else if (Array.isArray(value)) {
            for (const item of value) {
                search(item);
            }
        } else if (value !== null && typeof value === 'object') {
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    search(value[key]);
                }
            }
        }
    }

    search(data);
    return largestNumber;
}