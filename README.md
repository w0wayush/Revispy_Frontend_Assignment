# Categorization Website

A simple website that allows users to sign up, log in, and select categories they're interested in.

## Technologies Used

- **Framework:** Next.js 14
- **Language:** TypeScript
- **UI Library and Services:** ShadCN UI, React Icons, Nodemailer, Tailwind CSS
- **Backend:** tRPC
- **Database:** MongoDB

## Reference Video

https://github.com/user-attachments/assets/a79f9b12-e207-46e5-8709-2f043d9b18cc


## Features

### Sign-up and Login Flows:

- **Two screens** for new user registration.
- **One screen** for existing user login.
- Secure authentication and authorization using tRPC.

### Protected Page:

- Accessible only to logged-in users.
- Displays a **list of categories** fetched from the MongoDB database.
- Allows users to **mark categories** they're interested in.
- Implements **pagination** (6 categories per page).
- **Stores user selections** in the MongoDB database.

### Database:

- Uses the **faker.js** library to generate user's interests.

### User Experience:

- **Selected categories** persist across user sessions.
- **Static header** common for all pages.

## Getting Started

### Install Dependencies:

```bash
npm install
```

### Set up the Database:

1. Install and run **MongoDB** on your local machine.
2. Seed the MongoDB database with **100 category entries** using the **faker.js** library.

### Start the Development Server:

```bash
npm run dev
```

### Access the Application:

Open your web browser and navigate to [Live Link](revispy-ayushw0w.vercel.app).

## Future Improvements

- **Enhance the UI** design and make it more responsive.
- Implement **user profile management**.
- Add **sorting and filtering options** for categories.
- Improve the overall **user experience and accessibility**.

## Contributing

If you'd like to contribute to this project, please feel free to submit a pull request or open an issue. We welcome any feedback or suggestions to help improve the application.
