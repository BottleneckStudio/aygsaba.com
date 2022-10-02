import Layout from '../../../components/Layout';
import Button from '../../../components/Button';

import { Container } from './components';

const SigninPage = () => (
  <Layout>
    <Container>
      <h2>Sign in with</h2>
      <Button
        className="facebook"
        data-testid="button-facebook"
      >
        Facebook
      </Button>
      <Button
        className="twitter"
        data-testid="button-twitter"
      >
        Twitter
      </Button>
      <Button
        data-testid="button-tiktok"
      >
        Tiktok
      </Button>
    </Container>
  </Layout>
);

export default SigninPage;
