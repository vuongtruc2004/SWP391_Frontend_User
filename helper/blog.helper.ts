import slugify from "slugify";

export const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

export const slugifyText = (text: string) => {
    return slugify(text, {
        lower: true
    })
}