import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'ShopEase API Server',
    endpoints: {
      users: '/api/users',
      register: '/api/auth/register',
      forgotPassword: '/api/auth/forgot-password',
      resetPassword: '/api/auth/reset-password'
    }
  });
});

// In-memory storage for reset tokens (in production, use a database)
const resetTokens = new Map();

// Simulate a user database
const users = new Map();
users.set('baotran05042005@gmail.com', {
  name: 'Bao Tran',
  email: 'baotran05042005@gmail.com',
  password: 'hashedpassword123'
});

app.post('/api/auth/register', (req, res) => {
  console.log('Register request received:', req.body);
  const { name, email, password } = req.body;

  // Check if user already exists
  if (users.has(email)) {
    console.log('User already exists:', email);
    return res.status(400).json({ message: 'Email already registered' });
  }

  // In production, hash the password before storing
  const newUser = {
    name,
    email,
    password // In production: hashedPassword
  };

  // Store the user
  users.set(email, newUser);
  console.log('New user registered:', { name, email });

  // Return user data (exclude password)
  res.status(201).json({
    message: 'Registration successful',
    user: {
      name: newUser.name,
      email: newUser.email
    }
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  
  // Generate a reset token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Store the token with the email (expires in 1 hour)
  resetTokens.set(token, {
    email,
    expires: Date.now() + 3600000 // 1 hour
  });
  
  // In production, you would send an email here
  console.log(`Reset link: http://localhost:5173/reset-password/${token}`);
  
  // Always return success to prevent email enumeration
  res.json({ message: 'If the email exists, a reset link will be sent.' });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  
  const resetData = resetTokens.get(token);
  
  if (!resetData || resetData.expires < Date.now()) {
    resetTokens.delete(token);
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }
  
  const user = users.get(resetData.email);
  if (user) {
    // In production, hash the password before storing
    user.password = newPassword;
    users.set(resetData.email, user);
  }
  
  // Clean up the used token
  resetTokens.delete(token);
  
  res.json({ message: 'Password reset successful' });
});

// Debug endpoint to view registered users (remove in production)
app.get('/api/users', (req, res) => {
  const userList = Array.from(users.values()).map(({ password, ...user }) => user);
  res.json(userList);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});