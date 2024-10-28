import { useState } from 'react';
import { Container, Nav, Tab, Button, Form } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';

function Authentication() {
  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Nav variant="pills" className='mb-3 d-flex justify-content-between'>
        <Nav.Item>
          <Nav.Link onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaFacebookF />
              </Button>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaTwitter />
              </Button>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaGoogle />
              </Button>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaGithub />
              </Button>
            </div>
      <Tab.Content>
        {/* Login Tab Pane */}
        <Tab.Pane eventKey="tab1" className={justifyActive === 'tab1' ? 'show' : ''}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>
            
            <p className="text-center mt-3">or:</p>
          </div>

          <Form className="mb-4">
            <Form.Group controlId='formEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <Form.Check type='checkbox' label='Remember me' />
            <a href="#!">Forgot password?</a>
          </div>

          <Button className="mb-4 w-100">Sign in</Button>
          <p className="text-center">Not a member? <a href="#!" onClick={() => handleJustifyClick('tab2')}>Register</a></p>
        </Tab.Pane>

        {/* Register Tab Pane */}
        <Tab.Pane eventKey="tab2" className={justifyActive === 'tab2' ? 'show' : ''}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>
            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaFacebookF />
              </Button>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaTwitter />
              </Button>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaGoogle />
              </Button>
              <Button variant='link' className='m-1' style={{ color: '#1266f1' }}>
                <FaGithub />
              </Button>
            </div>
            <p className="text-center mt-3">or:</p>
          </div>

          <Form className="mb-4">
            <Form.Group controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter your name' />
            </Form.Group>

            <Form.Group controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter your username' />
            </Form.Group>

            <Form.Group controlId='formEmailRegister'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group controlId='formPasswordRegister'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
          </Form>

          <div className='d-flex justify-content-center mb-4'>
            <Form.Check type='checkbox' label='I have read and agree to the terms' />
          </div>

          <Button className="mb-4 w-100">Sign up</Button>
        </Tab.Pane>
      </Tab.Content>
    </Container>
  );
}

export default Authentication;
