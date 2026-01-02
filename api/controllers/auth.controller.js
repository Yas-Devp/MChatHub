const User = require('../models/User');

exports.login = (req, res) => {
  const { email, pass } = req.body;

  if (pass.length < 8) {
    return res.send(`
      <script>
        alert('Password too short!');
        window.location.href = '/login';
      </script>
    `);
  }

  if (!email.includes('@')) {
    return res.send(`
      <script>
        alert('Email must contain @!');
        window.location.href = '/login';
      </script>
    `);
  }

  res.send(req.body);
};

exports.register = async (req, res) => {
  const { username, email, pass } = req.body;

  if (pass.length < 8) {
    return res.send(`
      <script>
        alert('Password too short!');
        window.location.href = '/register';
      </script>
    `);
  }

  if (!email.includes('@')) {
    return res.send(`
      <script>
        alert('Email must contain @!');
        window.location.href = '/register';
      </script>
    `);
  }

  try {
    await User.create({
      username,
      email,
      password: pass
    });

    res.send(`
      <script>
        alert('Registration successful!');
        window.location.href = '/login';
      </script>
    `);
  } catch (error) {
    if (error.code === 11000) {
      return res.send(`
        <script>
          alert('Email already exists!');
          window.location.href = '/register';
        </script>
      `);
    }

    res.send(`
      <script>
        alert('Registration failed!');
        window.location.href = '/register';
      </script>
    `);
  }
};
