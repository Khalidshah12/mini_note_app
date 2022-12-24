import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import TodoList from '../../Components/TodoList'

export default function Home() {
    return (
        <div>
            {/* <h1>Todo App</h1>
             <Link to='/todos'>
                <h3>My Todos</h3>
             </Link> */}
            <Box>
                <TodoList />
            </Box>
        </div>
    )
}
