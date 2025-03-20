'use client'
import { Box, Dialog, Divider } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SingleCampaignRightSide from './single.campaign.rightside';
import ListEmpty from '@/components/empty/list.empty';

const CamapignModal = ({ open, setOpen, campaign }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    campaign: CampaignResponse[]
}) => {

    const [selectedCampaign, setSelectedCampaign] = useState<CampaignResponse>();

    return (
        <Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className='bg-[#101010] p-5 rounded-md w-[600px]'>
                    <div className='flex justify-between mb-5'>
                        <h1 className='font-semibold text-lg'>Danh sách chiến dịch</h1>
                        <CloseIcon onClick={() => setOpen(false)} className='hover:text-gray-400 cursor-pointer transition-all duration-200' />
                    </div>

                    {campaign.length > 0 ? (
                        <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                                {campaign &&
                                    campaign.map((item) => (
                                        <div
                                            key={item.campaignId}
                                            style={{ cursor: "pointer", padding: "5px", color: "white" }}
                                            onClick={() => setSelectedCampaign(item)}
                                        >
                                            {item.campaignName}
                                        </div>
                                    ))}
                            </div>

                            <Divider className="text-white" orientation="vertical" variant="middle" flexItem />

                            <div>
                                {selectedCampaign ? (
                                    <SingleCampaignRightSide campaign={selectedCampaign} />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-300 text-center text-sm italic">
                                            📌 Vui lòng chọn chiến dịch để xem chi tiết
                                        </p>
                                    </div>)}
                            </div>
                        </div>
                    ) : (
                        <ListEmpty text="Không có chến dịch nào để hiển thị" height={110} />
                    )}



                </div>
            </Dialog>
        </Box>
    )
}

export default CamapignModal