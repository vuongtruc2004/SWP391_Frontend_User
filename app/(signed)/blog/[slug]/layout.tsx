import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const slug = (await params).slug
    const id = slug.split("-").pop() || "";
    const blogResponse = await sendRequest<ApiResponse<BlogResponse>>({
        url: `${apiUrl}/blogs/${id}`
    });

    return {
        title: blogResponse.data.title,
    }
}

const BlogDetailsLayout = ({ details, suggest }: { details: React.ReactNode, suggest: React.ReactNode }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '2.5fr 1fr',
            gap: '20px',
            width: '95%',
            maxWidth: '1200px',
            alignItems: 'flex-start',
            paddingTop: '90px',
            color: 'white',
            margin: '0 auto'
        }}>
            {details}
            {suggest}
        </div>
    )
}

export default BlogDetailsLayout