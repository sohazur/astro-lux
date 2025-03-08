# Dubai to the Stars - Space Travel Booking Platform

A luxury space travel booking platform built with React and Firebase, allowing users to book journeys to space destinations like the International Space Station, the Moon, and beyond.

## Features

- **User Authentication**: Sign up, login, and logout functionality using Firebase Authentication
- **Trip Scheduling & Booking**: Book space flights to various destinations with different package classes
- **Pricing & Packages**: Choose from Economy, Luxury, and VIP Zero-Gravity packages
- **Accommodation Recommendations**: View and filter accommodations based on destinations
- **User Dashboard**: View bookings, countdown to launch, and personalized travel tips

## Tech Stack

- **Frontend**: React.js with React Router for navigation
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: Custom CSS with a space-themed design
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/dubai-to-the-stars.git
   cd dubai-to-the-stars
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a Firebase project and update the Firebase configuration in `src/firebase.js` with your own credentials.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment

This project is configured for easy deployment to Netlify:

1. Push your code to a GitHub repository

2. Connect your repository to Netlify

3. Configure the build settings:

   - Build command: `npm run build`
   - Publish directory: `dist`

4. Set up environment variables in Netlify for your Firebase configuration (if needed)

5. Deploy!

## Project Structure

```
dubai-to-the-stars/
├─ src/
│  ├─ components/       # Reusable components
│  ├─ contexts/         # Context providers (Auth)
│  ├─ pages/            # Page components
│  ├─ utils/            # Utility functions and mock data
│  ├─ firebase.js       # Firebase configuration
│  ├─ App.jsx           # Main App component with routing
│  └─ main.jsx          # Entry point
├─ public/              # Static assets
├─ index.html           # HTML template
├─ package.json         # Dependencies and scripts
└─ netlify.toml         # Netlify deployment configuration
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- Images and content are for demonstration purposes only
- Pricing is fictional and does not represent actual space travel costs
