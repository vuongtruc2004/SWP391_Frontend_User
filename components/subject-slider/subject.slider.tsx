'use client'
import { storageUrl } from "@/utils/url";
import { Box } from "@mui/material";
import { keyframes } from '@emotion/react';
import Image from "next/image";
import Link from "next/link";

interface IProps {
    subjectList: SubjectResponse[];
}
const SubjectSlider = (props: IProps) => {
    const { subjectList } = props;
    const itemWidth = 200;
    const itemHeight = 80;
    const animationTime = 65;
    const autoRun = keyframes`
                    to {
                        left: -${itemWidth}px;
                    }
                    `;

    return (
        <Box sx={{
            width: '100%',
            mask: 'linear-gradient(to right, transparent, #000 20% 80%, transparent)',
            overflow: 'hidden',
            marginTop: '6px',
            'div': {
                display: 'flex',
                alignItems: 'center',
                width: `${subjectList.length * itemWidth}px`,
                position: 'relative',
                columnGap: '6px',
                height: `${itemHeight}px`,
                'a': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: '15px',
                    textTransform: 'uppercase',
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`,
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    animation: `${autoRun} ${animationTime}s linear infinite`,
                }
            },
            '&:hover div a': {
                animationPlayState: 'paused !important'
            },
            position: 'absolute',
            left: 0,
            bottom: 0
        }}>
            <div>
                {subjectList?.map((item, index) => {
                    return (
                        <Link
                            href={"/course"}
                            key={index}
                            style={{
                                animationDelay: `${animationTime / subjectList.length * (subjectList.length - index - 1) * -1}s`
                            }}
                            className="text-gray-300 hover:text-blue-500"
                        >
                            <Image
                                src={`${storageUrl}/subject/${item.thumbnail}`}
                                alt={item.subjectName}
                                width={100}
                                height={50}
                                sizes="(max-width: 1000px) 100vw"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: 'auto',
                                    height: '28px',
                                }}
                            />
                            <p className={`transition-all duration-200 capitalize font-semibold`}>{item.subjectName}</p>
                        </Link>
                    )
                })}
            </div>
        </Box>
    )
}

export default SubjectSlider