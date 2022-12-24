import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './NoteList.module.css'
import { getTodos } from '../Redux/AppReducer/action'

export default function NoteList() {
    const dispatch = useDispatch()

    const { notes, isLoading, isError, token } = useSelector((store) => {
        return {
            notes: store.AppReducer.notes,
            isLoading: store.AppReducer.isLoading,
            isError: store.AppReducer.isError,
            token: store.AuthReducer.token
        }
    })

    useEffect(() => {
        dispatch(getTodos(token))
    }, [dispatch, token])

    return (
        <Box>
            <Box>
                <Link to='/' ><Heading id={styles.notesHead} fontSize='32px' fontWeight='500'>Notes</Heading></Link>
                {isLoading ? <Heading id={styles.Error}>Loading...</Heading> : isError ? <Box id={styles.Error}><Heading>Please login to view your Notes</Heading></Box>
                    : notes.length === 0 ? <Heading id={styles.Error} fontSize={'24px'}>Nothing inside the Notes, Please add something</Heading>
                        : notes && notes.length > 0 && notes.map((note) => {
                            return <Box key={note._id}>
                                <Link to={`/todos/${note._id}`}>
                                    <Heading className={styles.notesHeading} fontSize='20px' fontWeight='500'>{note.title}</Heading>
                                </Link>
                            </Box>
                        })
                }
            </Box>
        </Box>
    )
};
