import { Box } from '@mui/material'
import React from 'react'

const SingleCamapignSideBar = ({ campaign }: { campaign: CampaignResponse }) => {
    return (
        <Box>
            <p>{campaign?.campaignName}</p>
        </Box>
    )
}

export default SingleCamapignSideBar