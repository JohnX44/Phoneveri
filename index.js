import express from 'express';
import axios from 'axios';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000; // Use Vercel's port or default to 3000
const key = "314157947DB2407EAAA9F7BBC5DAD4EE";
const url = "https://api.veriphone.io/v2/verify";

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('front'); // Render the EJS template
});

app.post('/verify', async (req, res) => {
    const { phone } = req.body;

    try {
        const response = await axios.post(url, null, {
            params: {
                key: key,
                phone: phone
            }
        });
        res.render('front', { result: response.data });
    } catch (error) {
        console.error('Error verifying phone number:', error);
        res.render('front', { result: 'Error verifying phone number. Please try again.' });
    }
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
