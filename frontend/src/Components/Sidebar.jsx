import { Box, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../Redux/AuthReducer/action'
import styles from './Sidebar.module.css'

export default function Sidebar() {

    const dispatch = useDispatch();
    const { isAuth, username } = useSelector((store) => {
        return {
            isAuth: store.AuthReducer.isAuth,
            username: store.AuthReducer.username
        }
    })

    const HandleLogout = () => {
        localStorage.setItem('todouser', JSON.stringify({}))
        dispatch(logoutUser)
    }

    return (
        <Box id={styles.sidebar}>
            <Image id={styles.appLogo} src='https://images.ctfassets.net/lzny33ho1g45/best-note-app-for-android-p-img/a9e2e3c211d95917ed9e109d81b58da3/file.png?w=1520&fm=jpg&q=30&fit=thumb&h=760' alt='app logo' />
            <Box id={styles.sidebarNamesDiv}>
                {isAuth ? <Heading fontSize='16px' fontWeight='500' className={styles.sidebarUserName}>{username}</Heading> : ""}
                <Link to='/'><Heading fontSize='16px' fontWeight='500' className={styles.sidebarNames}>All Notes</Heading></Link>
                {isAuth ? <Link to='/createtodo'><Heading fontSize='16px' fontWeight='500' className={styles.sidebarNames}>Create Note</Heading></Link> : ""}
                {!isAuth
                    ? <Box><Link to='/login'><Heading fontSize='16px' fontWeight='500' className={styles.sidebarNames}>Login</Heading></Link>
                        <Link to='/signup'><Heading fontSize='16px' fontWeight='500' className={styles.sidebarNames}>Signup</Heading></Link></Box>
                    : <Heading fontSize='16px' fontWeight='500' className={styles.sidebarNames} onClick={HandleLogout}>Logout</Heading>
                }
            </Box>
        </Box>
    )
}
