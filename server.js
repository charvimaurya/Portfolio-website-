import express from 'express';
//import bodyParser from 'body-parser'
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.use(express.json());
// Serve the contact form
app.get('/', (req, res) => {
    res.render('index', {errors: ''}); // Ensure your index.ejs file exists
});

// Handle the form submission
app.post('/send', (req, res) => {
    const { fullname, email, message } = req.body;

    // Create the transporter object with email service details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'charvimaurya0110@gmail.com',  // Your Gmail address
            pass: 'htsp bwxr trid vfjm'  // Your Gmail app-specific password
        }
    });

    // Mail options (the email that will be sent)
    const mailOptions = {
        from: email,  // Sender's email (user's email)
        to: 'charvimaurya0110@gmail.com',  // Your email where the message will be sent
        subject: 'New Contact Form Message',
        text: `You have a new message from ${fullname} (${email}):\n\n${message}`
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Message sent successfully');
        }
    });
    
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
