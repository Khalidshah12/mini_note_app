import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTodos } from '../../Redux/AppReducer/action'
import styles from './Notes.module.css'

export default function Notes() {
    const dispatch = useDispatch()

    const { todos, isLoading, isError, token } = useSelector((store) => {
        return {
            todos: store.AppReducer.todos,
            isLoading: store.AppReducer.isLoading,
            isError: store.AppReducer.isError,
            token: store.AuthReducer.token
        }
    })

    useEffect(() => {
        dispatch(getTodos(token))
    }, [dispatch, token])

    return (
        <div>
            <div>
                {isLoading ? "Loading..." : isError ? <Box id={styles.Error}><Heading>Please login to view your Notes</Heading></Box> : todos.length === 0 ? "Nothing inside the todo, Please add something"
                    : todos && todos.length > 0 && todos.map((todo) => {
                        return <Link key={todo._id} to={`/todos/${todo._id}`}>
                            <h3>{todo.title}</h3>
                        </Link>
                    })
                }
            </div>
        </div>
    )
};
