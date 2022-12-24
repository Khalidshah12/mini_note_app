import { Box, Button, Heading, Input, useToast } from '@chakra-ui/react';
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const HandleSignup = () => {
        if (name && email && mobile && password) {
            const payload = {
                name,
                email,
                mobile,
                password
            }
            axios.post('https://dead-jade-dalmatian-tie.cyclic.app/users/signup', payload).then((res) => {
                console.log(res);
                toast({
                    title: "Congratulation",
                    description: "Sigunp Successfull, Please Login",
                    status: "success",
                    position: "top",
                    duration: 2500,
                    isClosable: true,
                });

                setTimeout(() => {
                    navigate('/login')
                }, 1500);

            }).catch((e) => {
                toast({
                    title: "Error",
                    description: "User is already exist or Something went wrong",
                    status: "warning",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            })
        } else {
            toast({
                title: "Error",
                description: "Something is missing",
                status: "warning",
                position: "top",
                duration: 2000,
                isClosable: true,
            });
        }
    }
    return (
        <Box id={styles.signupMainDiv}>
            <Box id={styles.signupDiv}>
                <Heading id={styles.signupHead} size='lg' fontWeight='500'>Signup</Heading>
                <Box>
                    <Input className={styles.inputes} type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your Name" />
                    <Input className={styles.inputes} type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your Email" />
                    <Input className={styles.inputes} type="text" onChange={(e) => setMobile(e.target.value)} value={mobile} placeholder="Enter your Mobile Number" />
                    <Input className={styles.inputes} type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your Password" />
                    <Button id={styles.signupButton} onClick={() => HandleSignup()}>Signup</Button>
                </Box>
            </Box>
        </Box>
    )
}
