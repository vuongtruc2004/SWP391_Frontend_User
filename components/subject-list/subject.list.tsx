import Box from "@mui/material/Box";
import SingleSubjectList from './single.subject.list';

const SubjectList = ({ subjectList }: { subjectList: SubjectResponse[] }) => {
    return (
        <>
            <h1 className='text-center font-bold uppercase text-2xl text-white mt-10'>Danh mục phổ biến</h1>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                maxWidth: '1200px',
                margin: '40px auto 0',
                position: 'relative',
                zIndex: 1
            }}>
                {subjectList?.map((subject) => {
                    return (
                        <SingleSubjectList subject={subject} key={subject.subjectId} />
                    )
                })}
            </Box>
        </>
    )
}

export default SubjectList