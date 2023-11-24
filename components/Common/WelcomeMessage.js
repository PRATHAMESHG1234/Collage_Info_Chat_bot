import { Icon, Message, Divider } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === '/signup';

  return (
    <Message
      color='teal'
      attached
      header={signupRoute ? 'Ger Started' : 'Welcome Back'}
      icon={signupRoute ? 'setting' : 'privacy'}
      content={
        signupRoute ? 'Create New Account' : 'Login With EmailAnd Password'
      }
    />
  );
};
export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === '/signup';

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached='bottom' warning>
            <Icon name='help' />
            Existing User?{''}
            <Link href='/login'>Login Here Instead</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached='bottom' warning>
            <Icon name='lock' />
            Existing User?{''}
            <Link href='/reset'>Forgot Password</Link>
          </Message>

          <Message attached='bottom' warning>
            <Icon name='help' />
            New User?{''}
            <Link href='/signup'> Signup Here Instead</Link>
          </Message>
        </>
      )}
    </>
  );
};
