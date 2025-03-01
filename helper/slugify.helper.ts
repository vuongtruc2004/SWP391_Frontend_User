import slugify from 'slugify';

export const slugifyText = (text: string) => {
    return slugify(text, {
        lower: true,
        strict: true
    });
}

export const convertSubjectToString = (subjects: SubjectResponse[]) => {
    return subjects.map(subject => subject.subjectName).join("-");
}