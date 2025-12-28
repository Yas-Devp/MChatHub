const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//App setup && Middlewares
const app = express();
const port = 3000
app.use(express.static(path.join(__dirname, './')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);



const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);


app.get('/test', (req, res)=> {
    res.send('<h3>WebSite is Waked Up !!</h3>');
})

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, './', 'login.html'));
});

app.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, './', 'register.html'));
});

app.post("/register", async (req, res) => {
	
	// Data
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.pass;

	if (password.length < 8) {
        return res.send(`
            <script>
                alert('Password too short!');
                window.location.href = '/register'; 
            </script>
        `);
    }

    if (!email.includes('@')){
    	return res.send(`
            <script>
                alert('Email must contain @!');
                window.location.href = '/register'; 
            </script>
        `);
    }

	try {
        const newUser = new User({
            username: username,
            email: email,
            password: password  // Note: In production, hash passwords!
        });

        await newUser.save();  // Save to database
        
        // Success response
        res.send(`
            <script>
                alert('Registration successful!');
                window.location.href = '/login'; 
            </script>
        `);
        
    } catch (error) {
        console.error('Database error:', error);
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.send(`
                <script>
                    alert('Email already exists!');
                    window.location.href = '/register'; 
                </script>
            `);
        }
        
        // Generic error
        res.send(`
            <script>
                alert('Registration failed. Please try again.');
                window.location.href = '/register'; 
            </script>
        `);
    }
});


//initialize the server with specified PORT
app.listen(port, ()=>{
	console.log(`Server running on ${port}`)
	mongoose.connect('mongodb+srv://yasprodev_db_user:MBaRmYaGJZXinW4Y@cluster0.i6bbvbp.mongodb.net/?appName=Cluster0', {
    	useNewUrlParser: true,
    	useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log('MongoDB Connection Error:', err))
})