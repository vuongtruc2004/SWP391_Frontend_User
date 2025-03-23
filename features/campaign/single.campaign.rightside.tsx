import { storageUrl } from '@/utils/url'
import { Box, Dialog } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { formatDateTime } from '@/utils/format';

const SingleCampaignRightSide = ({ campaign, setOpenModal }: { campaign: CampaignResponse, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const now = new Date();
    const campaignStartTime = new Date(campaign.startTime);
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const router = useRouter()

    const handleOpenPreview = () => {
        setOpen(true);
    };

    const handleClosePreview = () => {
        setOpen(false);
    };

    const handleRedirectPageAndCloseModal = () => {
        router.push('http://localhost:3000/course?page=1&event=sale')
        setOpenModal(false)
    }
    return (
        <Box className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-white space-y-4">
            <div
                className="relative w-full h-56 overflow-hidden rounded-lg cursor-pointer"
                onClick={handleOpenPreview}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Image
                    src={`${storageUrl}/campaign/${campaign.thumbnail}`}
                    alt="Campaign Thumbnail"
                    fill
                    className="object-cover"
                />

                {hover && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white transition-opacity duration-300">
                        <VisibilityIcon />
                        <p className="text-sm font-medium">Xem</p>
                    </div>
                )}
            </div>

            <div className="space-y-2 flex flex-col gap-y-3">
                <div className='flex justify-between'>
                    <div className='w-3/6'>
                        <h2 className="text-xl font-semibold">Tên chiến dịch</h2>
                        <p className="text-gray-300 pl-4 text-justify">{campaign.campaignName}</p>
                    </div>
                    <div className='w-2/5'>
                        <h2 className="text-xl font-semibold">Ưu đãi</h2>
                        <p className="text-gray-300 pl-4"><span>Giảm </span>
                            {campaign.discountPercentage}
                            {campaign.discountRange === 'ALL' ? ' tất cả giá trị đơn hàng' : ' một số giá trị đơn hàng'}
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold">Chi tiết chiến dịch</h2>
                <p className="text-gray-300 pl-4 text-justify">{campaign.campaignDescription}</p>

                <p className="text-sm text-gray-400">
                    <span className="font-medium text-white">Thời gian diễn ra sự kiện:</span>
                    <span className="ml-2">
                        {formatDateTime(campaign.startTime)} - {formatDateTime(campaign.endTime)}
                    </span>
                </p>



                {now >= campaignStartTime ? (
                    <div
                        className="see-detail flex items-center font-semibold text-lg leading-[20px] tracking-[0.05em] uppercase bg-gradient-to-r from-blue-900 to-blue-500 text-transparent bg-clip-text transition-opacity duration-1000 ease-in-out aos-init aos-animate group mt-5 cursor-pointer"
                        data-aos="fade-up"
                        onClick={handleRedirectPageAndCloseModal}
                    >
                        <p className="block w-[23px] h-[1px] bg-gradient-to-r from-blue-950 to-blue-300 mr-[6px] transition-all duration-500 ease-in-out group-hover:w-[60px]"></p>
                        Khám phá ngay!
                    </div>
                ) : (
                    <p className="mt-4 text-yellow-400 font-medium">Chưa đến hạn</p>
                )}
            </div>

            <Dialog open={open} onClose={handleClosePreview} maxWidth="md" fullWidth PaperProps={{ style: { borderRadius: '12px' } }}>
                <div className="p-4 bg-black">
                    <Image
                        src={`${storageUrl}/campaign/${campaign.thumbnail}`}
                        alt="Preview Image"
                        width={800}
                        height={500}
                        className="rounded-lg mx-auto"
                    />
                </div>
            </Dialog>
        </Box>
    )
}

export default SingleCampaignRightSide