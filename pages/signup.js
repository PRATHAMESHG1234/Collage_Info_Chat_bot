import CommonInputs from '@/components/Common/CommonInputs';
import ImageDropDiv from '@/components/Common/ImageDropDiv';
import {
  FooterMessage,
  HeaderMessage,
} from '@/components/Common/WelcomeMessage';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Divider, Form, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { registerUser } from '../utils/authUser';
import uploadPic from '@/utils/uploadPicToCloudinary';
const regexusername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

let cancel;
const signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    facebook: '',
    youtube: '',
    twitter: '',
    instagram: '',
  });
  const { name, email, password, bio } = user;
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [username, setusername] = useState('');
  const [usernameLoading, setusernameLoading] = useState(false);
  const [formLoading, setformLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [usernameAvailable, setusernameAvailable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformLoading(true);
    let profilePicUrl;
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setformLoading(false);
      return setErrorMsg('Error Uploading Image');
    }
    await registerUser(user, profilePicUrl, setErrorMsg, setformLoading);
  };

  useEffect(() => {
    const isUser = Object.values({ name, email, password, bio }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);
  const checkusername = async () => {
    setusernameLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
        CancelToken: new CancelToken((canceler) => (cancel = canceler)),
      });

      if (errorMsg !== null) setErrorMsg(null);
      if (res.data === 'Available') {
        setusernameAvailable(true);
        setUser((prev) => ({
          ...prev,
          username,
        }));
      }
    } catch (error) {
      setErrorMsg('username not available');
      setusernameAvailable(false);
    }
    setusernameLoading(false);
  };
  useEffect(() => {
    username === '' ? setusernameAvailable(false) : checkusername();
  }, [username]);
  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg != null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header='Oops!'
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handlechange={handleChange}
          />
          <Form.Input
            label='Name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            fluid
            icon='user'
            required
          />
          <Form.Input
            label='Email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            fluid
            icon='envelope'
            iconPosition='left'
            type='email'
            required
          />
          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: 'eye',
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition='left'
            type={showPassword ? 'text' : 'password'}
            required
          />
          <Form.Input
            loading={usernameLoading}
            error={!usernameAvailable}
            label='username'
            placeholder='username'
            name='username'
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
              if (regexusername.test(e.target.value)) {
                setusernameAvailable(true);
              } else {
                setusernameAvailable(false);
              }
            }}
            fluid
            icon={usernameAvailable ? 'check' : 'close'}
            iconPosition='left'
            required
          />
          <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />
          <Divider hidden />
          <Button
            icon='signup'
            content='signup'
            type='submit'
            color='orange'
            disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default signup;
