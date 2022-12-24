import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './TodoList.module.css'
import { getTodos } from '../Redux/AppReducer/action'

export default function TodoList() {
    const dispatch = useDispatch()

    const { todos, isLoading, isError, token, isAuth } = useSelector((store) => {
        return {
            todos: store.AppReducer.todos,
            isLoading: store.AppReducer.isLoading,
            isError: store.AppReducer.isError,
            token: store.AuthReducer.token,
            isAuth: store.AuthReducer.isAuth,
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
                    : todos.length === 0 ? <Heading id={styles.Error} fontSize={'24px'}>Nothing inside the todo, Please add something</Heading>
                        : todos && todos.length > 0 && todos.map((todo) => {
                            return <Box key={todo._id}>
                                <Link to={`/todos/${todo._id}`}>
                                    <Heading className={styles.notesHeading} fontSize='20px' fontWeight='500'>{todo.title}</Heading>
                                </Link>
                            </Box>
                        })
                }
            </Box>
        </Box>
    )
};
