import React from 'react'
import NotFoundImage from '../../assets/images/LogoRootRoom.png'
import styles from '../verifyEmail/style.module.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
  const adminData = JSON.parse(localStorage.getItem('admin_user'))
  const token = !!adminData?.token
  console.log(token);
  return (
    <div className={`bg-[#070029] ${styles.container}`}>
      <img src={NotFoundImage} alt="Not Found" className={styles.containerImage} />
      <div className={styles.containerHeading}>
        <h1>404 : Oops! Page Not Found</h1>
      </div>
      <Link to={token ? "/home" : "/login"}><p className={styles.containerPara}>{`Sorry! Go Back to ${token ? "Home" : "Login"} `}</p></Link>
    </div>
  )
}

export default NotFound;