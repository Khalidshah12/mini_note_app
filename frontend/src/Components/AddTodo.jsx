import { Box, Button, Heading, Input } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../Redux/AppReducer/action';
import styles from './AddTodo.module.css'

export default function AddTodo() {
    const [title, settitle] = useState('');
    const [desc, setDesc] = useState('');

    const dispatch = useDispatch()
    const { token } = useSelector((store) => {
        return {
            token: store.AuthReducer.token
        }
    })

    const addTodo = (payload) => {
        return axios.post('https://dead-jade-dalmatian-tie.cyclic.app/todos/create', payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            return res
        }).catch((e) => {
            console.log(e);
        })
    }

    const HandleAddTodo = () => {
        if (title && desc) {
            const payload = {
                title,
                desc
            }
            addTodo(payload).then((r) => {
                console.log(r)
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    useEffect(() => {
        dispatch(getTodos(token))
    }, [dispatch, token])

    return (
        <Box id={styles.addTodoMainDiv}>
            <Box id={styles.addTodoDiv}>
                <Heading id={styles.addTodoHead} fontSize='24px' fontWeight='500'>Add Note</Heading>
                <Box display='flex' justifyContent='center' alignItems='center' h='85vh' >
                    <Box id={styles.addTodo}>
                        <Input className={styles.addTodoInput} w='90%' h='50px' type="text" onChange={(e) => settitle(e.target.value)} value={title} placeholder="Enter your title" />
                        <Input className={styles.addTodoInput} w='90%' h='50px' type="text" onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Enter your description" />
                        <Button id={styles.addTodoButton} display='block' onClick={() => HandleAddTodo()}>Add Note</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
