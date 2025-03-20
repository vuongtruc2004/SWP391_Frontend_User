import { formatDateTime } from '@/helper/blog.helper'
import { storageUrl } from '@/utils/url'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleCampaignRightSide = ({ campaign }: { campaign: CampaignResponse }) => {

    const now = new Date();
    const campaignStartTime = new Date(campaign.startTime);

    return (
        <Box className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-white space-y-4">
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
                <Image
                    src={`${storageUrl}/campaign/${campaign.thumbnail}`}
                    alt="Campaign Thumbnail"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Chi tiết chiến dịch</h2>
                <p className="text-gray-300 pl-4">{campaign.campaignDescription}</p>

                <p className="text-sm text-gray-400">
                    <span className="font-medium text-white">Thời gian diễn ra sự kiện:</span>
                    <span className="ml-2">
                        {formatDateTime(campaign.startTime)} - {formatDateTime(campaign.endTime)}
                    </span>
                </p>

                {now >= campaignStartTime ? (
                    <Link
                        href="http://localhost:3000/course?page=1&event=sale"
                        className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                        Khám phá ngay!
                    </Link>
                ) : (
                    <p className="mt-4 text-yellow-400 font-medium">Chưa đến hạn</p>
                )}
            </div>
        </Box>
    )
}

export default SingleCampaignRightSide