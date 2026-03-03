/**
 * Base62 encoding utility for MongoDB ObjectIds
 * Converts ObjectId to a short, URL-safe string
 */

const BASE62_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Convert a MongoDB ObjectId to Base62 string
 * @param {string|ObjectId} objectId - MongoDB ObjectId (hex string or ObjectId object)
 * @returns {string} Base62 encoded string
 */
export function encodeObjectId(objectId) {
    // Convert ObjectId to hex string if it's an ObjectId object
    const hexString = objectId.toString();

    // Convert hex string to BigInt
    let decimal = BigInt("0x" + hexString);

    // Convert decimal to Base62
    if (decimal === 0n) {
        return BASE62_CHARSET[0];
    }

    let base62 = "";
    const base = BigInt(62);

    while (decimal > 0n) {
        const remainder = Number(decimal % base);
        base62 = BASE62_CHARSET[remainder] + base62;
        decimal = decimal / base;
    }

    return base62;
}

/**
 * Example usage:
 * const linkCode = encodeObjectId("507f1f77bcf86cd799439011");
 * Returns something like: "4azFyDtLoM2"
 */
