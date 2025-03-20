import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import Image from 'next/image';
import { storageUrl } from '@/utils/url';
import { Divider } from '@mui/material';

const SingleCampaignSlider = ({ campaign }: { campaign: CampaignResponse; }) => {
    return (
        <Box sx={{
            // 
            width: '700px',
            borderRadius: '6px',
        }}>
            <Box sx={{
                display: 'block',
                width: '100%',
                height: `280px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/campaign/${campaign.thumbnail}`} alt={campaign.campaignName} fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                }} />
            </Box>
        </Box>
    )
}

export default SingleCampaignSlider