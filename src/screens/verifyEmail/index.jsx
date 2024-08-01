import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


// import Success from "../assets/images/success.png";
import styles from './style.module.css';
import NotFound from '../notFound';

const VerifyEmail = () => {
    const [validUrl, setValidUrl] = useState(true);
    const [res, setRes] = useState();
    const [error, setError] = useState();
    const params = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://rootroom.testdevlink.net/api/auth/${params.id}/verify/${params.token}`;
                const { data } = await axios.get(url);
                setRes(data);
                setValidUrl(true);

            } catch (error) {
                setError(error);
                setValidUrl(false);
            }
        }

        //Call Function
        verifyEmailUrl();
    }, [params.id, params.token]);
    document.title = "Lug Traveler | Verify Email";


    const handleCloseWindow = () => {
        window.open('', '_self', 'popup').close();
    };
    return (
        <Fragment>
            {
                validUrl ? (
                    <div className={`${styles.container} bg-[#070029]`}>
                        {/* <img src={Success} alt="Success" className={styles.containerImage} /> */}
                        <h1 className={styles.containerHeading}>{res?.message}</h1>
                        <p className={styles.containerPara} onClick={handleCloseWindow}>You Can Close this Window</p>
                    </div>
                ) : (
                    <NotFound error={error?.response.data.message} />
                )
            }
        </Fragment>
    )
}

export default VerifyEmail;