import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="text-lg mb-4">
        This is a Next.js project with authentication functionality inspired by
        the MERN (MongoDB, Express, React, Node.js) stack.
      </p>
      <h3 className="text-xl font-bold mb-2">Features:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>User Authentication:</strong> Enable users to sign up, log in,
          and log out securely.
        </li>
        <li>
          <strong>Protected Routes:</strong> Access protected routes available
          only for authenticated users.
        </li>
        <li>
          <strong>Profile Management:</strong> Users can update their profile
          information.
        </li>
      </ul>
      <p className="text-lg">
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
    </div>
  );
};

export default About;
