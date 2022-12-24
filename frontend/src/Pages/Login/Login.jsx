import { Box, Button, Heading, Input, useToast } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserLogin } from '../../Redux/AuthReducer/action';
import styles from './Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const HandleLogin = () => {
        if (email && password) {
            const payload = {
                email,
                password
            }
            dispatch(getUserLogin(payload)).then((r) => {
                if (r?.type === 'GET_USER_SUCCESS') {
                    toast({
                        title: "Congratulation",
                        description: "Login Successfull",
                        status: "success",
                        position: "top",
                        duration: 2500,
                        isClosable: true,
                    });

                    setTimeout(() => {
                        navigate('/')
                    }, 1500);
                } else {
                    toast({
                        title: "Error",
                        description: "Email or Password wrong",
                        status: "warning",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    });
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <Box id={styles.loginMainDiv}>
            <Box id={styles.loginDiv}>
                <Heading id={styles.loginHead} size='lg' fontWeight='500'>Login</Heading>
                <Box>
                    <Input className={styles.inputes} type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your Email" />
                    <Input className={styles.inputes} type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your Password" />
                    <Button id={styles.loginButton} onClick={() => HandleLogin()}>Login</Button>
                </Box>
            </Box>
        </Box>
    )
}
