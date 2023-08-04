import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
// import { gettUser } from 'store/user/selectorsAuth';
import { updateUser } from '../../store/user/operationAuth';
import photo from '../../assets/images/defaultuserimg/user.jpg';
import css from './EditProfileForm.module.css';

export const EditProfileForm = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [userPhoto, setUserPhoto] = useState(photo);
  // const user = useSelector(gettUser);

  const initialValues = {
    name: user.name || '',
    photo: user.photo || '',
    email: user.email || '',
    password: user.password || '',
  };
  // const EMAIL_REGX = `^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/`;
  const PASSWORD_REGEX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(32, 'Too Long!')
      .required('Name is required'),
    email: Yup.string()
      // .matches(EMAIL_REGX, 'Invalid email address')
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .matches(PASSWORD_REGEX, 'Please enter a strong password')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const updatedUser = {
      ...values,
      photo: userPhoto,
    };
    setUserPhoto(userPhoto);
    dispatch(updateUser(updatedUser));
    resetForm();
    onClose();
  };
  const openModal = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', event => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    });
    input.click();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <img
          className={css.userPhoto}
          src={userPhoto}
          alt="Profile Photo"
          onClick={openModal}
        />
        <div>
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <button type="submit">Send</button>
      </Form>
    </Formik>
  );
};
