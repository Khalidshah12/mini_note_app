import { Box, Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './SingleTodo.module.css'

export default function SingleTodo() {
    const [todo, setTodo] = useState([])
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { token } = useSelector((store) => {
        return {
            token: store.AuthReducer.token
        }
    })

    const HandleDelete = () => {
        axios.delete(`https://dead-jade-dalmatian-tie.cyclic.app/todos/delete/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                navigate('/todos')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        axios.get(`https://dead-jade-dalmatian-tie.cyclic.app/todos/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setTodo(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [params.id, token])

    return (
        <Box id={styles.singleNoteDiv}>
            <Heading id={styles.head} fontSize='32px' fontWeight='500'>Note Details</Heading>
            <Box>
                {
                    todo && todo.length > 0 && todo.map((todo) => {
                        return <Box key={todo._id} className={styles.noteDetailsDiv} >
                            <Heading fontSize='22px' fontWeight='500' className={styles.noteTitle}><span>Title:</span> {todo.title}</Heading>
                            <Heading fontSize='22px' fontWeight='500' className={styles.noteDesc}><span>Description:</span> {todo.desc}</Heading>
                        </Box>
                    })
                }
            </Box>
            <Box id={styles.buttonsDiv}>
                <Link to='/edittodo' state={todo} replace>
                    <Button id={styles.editNote}>Edit Note</Button>
                </Link>
                <Button id={styles.deleteNote} onClick={HandleDelete} >Delete</Button>
            </Box>
        </Box>
    )
}
