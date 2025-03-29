import Box from "@mui/material/Box";
import Image from 'next/image';
import { storageUrl } from '@/utils/url';

const SingleCampaignSlider = ({ campaign }: { campaign: CampaignResponse; }) => {
    return (

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '500px',
            position: 'relative',
        }}>
            <Image
                src={`${storageUrl}/campaign/${campaign.thumbnail}`}
                alt={campaign.campaignName}
                fill
                sizes="(max-width: 1000px) 100vw"
                priority={true}
                style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                }}
            />
        </Box>

    )
}

export default SingleCampaignSlider