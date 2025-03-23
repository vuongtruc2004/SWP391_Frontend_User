'use client'
import { Box, Dialog, Divider } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SingleCampaignRightSide from './single.campaign.rightside';
import ListEmpty from '@/components/empty/list.empty';
import { useCampaign } from '@/wrapper/course-campaign/course.campaign.wrapper';

const CamapignModal = ({ open, setOpen }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}) => {

    const { campaigns } = useCampaign()
    const [selectedCampaign, setSelectedCampaign] = useState<CampaignResponse>();


    return (
        <Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
                slotProps={{
                    paper: {
                        style: { borderRadius: "12px", overflow: "hidden" },
                    },
                }}
            >
                <div className="flex justify-between sticky top-0 bg-[#101010] p-5 z-10">
                    <h1 className='font-semibold text-lg'>Danh sách chiến dịch</h1>
                    <CloseIcon
                        onClick={() => setOpen(false)}
                        className='hover:text-gray-400 cursor-pointer transition-all duration-200'
                    />
                </div>
                <div className='bg-[#101010] p-5 w-full rounded-b-xl flex'>
                    <div className="w-1/4 max-w-[200px] flex flex-col">
                        <div className="overflow-y-auto max-h-[400px] pr-2">
                            {campaigns.map((item) => (
                                <div
                                    key={item.campaignId}
                                    className={`cursor-pointer mb-3 p-2 transition duration-300 border-b-2 ${selectedCampaign?.campaignId === item.campaignId
                                        ? 'text-blue-400 border-blue-400'
                                        : 'text-white border-transparent hover:border-gray-500'
                                        }`}
                                    onClick={() => setSelectedCampaign(item)}
                                >
                                    <p className="line-clamp-2 overflow-hidden text-ellipsis">
                                        {item.campaignName}
                                    </p>
                                </div>

                            ))}
                        </div>
                    </div>

                    <Divider className="text-white" orientation="vertical" variant="middle" flexItem />

                    <div className="w-3/4 overflow-y-auto max-h-[400px] pl-5">
                        {selectedCampaign ? (
                            <SingleCampaignRightSide campaign={selectedCampaign} setOpenModal={setOpen} />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-300 text-center text-sm italic">
                                    📌 Vui lòng chọn chiến dịch để xem chi tiết
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </Dialog>
        </Box>

    )
}

export default CamapignModal