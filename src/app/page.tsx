export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="sm:text-xl lg:text-4xl font-bold mb-4 text-center">
        Welcome to my Next-Auth App!
      </h1>
      <div className="text-base lg:text-lg mb-8">
        <p className="mb-4">
          This is a full-stack web application built with the MENN (MongoDB,
          Express, Next.js, Node.js) stack. It features authentication
          capabilities that allow users to sign up with email verification, log
          in, and log out. It also restricts access to protected routes
          exclusively for authenticated users.
        </p>
        <p className="mb-4">
          The front-end of the application is developed with Next.js, leveraging
          its built-in server-side rendering and routing capabilities. The
          back-end is powered by Node.js and Express, with MongoDB serving as
          the database. Authentication is facilitated through JSON Web Tokens
          (JWT), and a secure email verification process ensures that only
          verified users can access certain functionalities.
        </p>
        <p className="mb-4">
          This application is intended as a starting point for building
          full-stack web applications with authentication using the MERN stack.
          Feel free to use it as a template for your own projects!
        </p>
      </div>
    </div>
  );
}
