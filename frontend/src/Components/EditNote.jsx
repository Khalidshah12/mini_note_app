import { Box, Button, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import styles from './AddNote.module.css'

export default function EditNote() {
    const location = useLocation();

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch()
    const { token } = useSelector((store) => {
        return {
            token: store.AuthReducer.token
        }
    })

    const HandleEditTodo = () => {
        if (title && desc) {
            const payload = {
                title,
                desc
            }
            axios.patch(`https://dead-jade-dalmatian-tie.cyclic.app/todos/update/${location.state[0]._id}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res);
                setTitle('')
                setDesc('')
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    return (
        <Box id={styles.addTodoMainDiv}>
            <Box id={styles.addTodoDiv}>
                <Heading id={styles.addTodoHead} fontSize='24px' fontWeight='500'>Edit Note Page</Heading>
                <Box display='flex' justifyContent='center' alignItems='center' h='85vh'>
                    <Box id={styles.addTodo}>
                        <Input className={styles.addTodoInput} w='90%' h='50px' type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter new Description" />
                        <Input className={styles.addTodoInput} w='90%' h='50px' type="text" onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Enter new Title" />
                        <Button id={styles.addTodoButton} display='block' onClick={() => HandleEditTodo()}>Update Note</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
