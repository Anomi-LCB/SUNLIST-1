
// Hangul Chosung (Initial Consonant) list
const CHOSUNG = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

/**
 * Extract Chosung from a given Hangul string
 * @param {string} str 
 * @returns {string} The Chosung string (e.g., "홍길동" -> "ㅎㄱㄷ")
 */
const getChosung = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 0xAC00;
        if (code > -1 && code < 11172) {
            // It's a Hangul character
            const chosungIndex = Math.floor(code / 588);
            result += CHOSUNG[chosungIndex];
        } else {
            // Not Hangul, keep as is
            result += str[i];
        }
    }
    return result;
};

/**
 * Core search logic for Church Member Search
 * 
 * @param {string} query - The user input query
 * @param {Array} data - The dataset
 * @returns {Array} - Filtered results
 */
export const searchMembers = (query, data) => {
    if (!query || query.trim() === '') return [];

    const cleanQuery = query.replace(/\s+/g, '').replace(/-/g, '');

    if (cleanQuery.length === 0) return [];

    // Lowercase query for case-insensitive search
    const lowerQuery = cleanQuery.toLowerCase();

    return data.filter(person => {
        // 1. Numeric search (Birthdate)
        const isNumeric = /^\d+$/.test(cleanQuery);

        if (isNumeric) {
            // Birthdate Search (6 or 8 digits)
            if (cleanQuery.length === 6 || cleanQuery.length === 8) {
                if (person.birthdate.includes(cleanQuery)) return true;
                if (cleanQuery.length === 6 && person.birthdate.slice(2).includes(cleanQuery)) return true;
            }
        }

        // 2. Name search
        for (const sName of person.search_names) {
            // Exact/Partial string match (Case-Insensitive)
            if (sName.toLowerCase().includes(lowerQuery)) return true;

            // Chosung match
            // We calculate Chosung of the name on the fly. 
            const chosungName = getChosung(sName);
            // Check chosung against query (for Hangul) or lowercased query if needed, 
            // but usually chosung is for Hangul. For consistency, we can check original query vs chosung.
            // If the query was purely English/lower, it wouldn't match Hangul chosung anyway.
            if (chosungName.includes(cleanQuery)) return true;
        }

        return false;
    });
};
