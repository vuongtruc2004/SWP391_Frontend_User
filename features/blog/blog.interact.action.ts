'use server'
export const comment = async (prevState: any, formData: FormData): Promise<{ comment: ErrorResponse }> => {
    const comment = formData.get('comment')?.toString() || "";
    if (comment.trim() === '') {
        return {
            comment: {
                error: true,
                message: 'Vui lòng không để trống bình luận!',
                value: comment
            }
        }
    }
    return {
        comment: {
            error: false,
            value: comment
        }
    }
}