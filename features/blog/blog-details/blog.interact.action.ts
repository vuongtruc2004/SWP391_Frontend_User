'use server'

export interface CommentFieldResponse {
    comment: {
        error: boolean;
        message?: string | React.ReactNode;
        value: string | undefined;
    }
}
export const comment = async (prevState: any, formData: FormData): Promise<CommentFieldResponse> => {
    const comment = formData.get('comment')?.toString();
    if (!comment || comment.trim() === '') {
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
            value: ''
        }
    }
}