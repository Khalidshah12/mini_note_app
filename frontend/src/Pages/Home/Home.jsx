import { Box } from '@chakra-ui/react'
import React from 'react'
import NoteList from '../../Components/NoteList'

export default function Home() {
    return (
        <div>
            <Box>
                <NoteList />
            </Box>
        </div>
    )
}
