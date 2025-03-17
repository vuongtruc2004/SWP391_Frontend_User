'use client'
import SingleExpertList from "@/components/expert/single.expert";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const ExpertList = ({ expertList }: {
    expertList: PageDetailsResponse<ExpertDetailsResponse[]>
}) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.replace(`${pathname}?${params}`);
    }


    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
            }}>
                {expertList.content?.map(expert => {
                    return (
                        <SingleExpertList expert={expert} key={expert.expertId} />
                    )
                })}
            </Box>
            <Pagination
                count={expertList.totalPages}
                page={expertList?.currentPage || 1}
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                }}
                onChange={handleChangePage}
            />
        </div>)
}

export default ExpertList