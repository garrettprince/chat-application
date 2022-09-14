import Head from "next/head";
import { useState } from "react";
import Feed from "../lib/components/Feed/Feed";
import Menu from "../lib/components/Menu/Menu";
import { supabase } from "../lib/utils/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAddUser from "../lib/hooks/useAddUser";
import useThreads from "../lib/hooks/useThreads";
import useUser from "../lib/hooks/useUser";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [addUser, isAddingUser] = useAddUser();
  const [
    threads,
    isFetchingThreads,
    currentThread,
    setCurrentThread,
    fetchThreads,
  ] = useThreads("");

  const [users, isFetchingUsers, currentUser, setCurrentUser, fetchUsers] =
    useUser();

  const handleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loggedIn && (
        <div className="absolute w-full h-full bg-white flex flex-col justify-center items-center">
          <div className="text-4xl font-bold mb-5">
            Welcome to{" "}
            <span className="bg-green-500 text-white py-2 px-3 rounded-xl">
              Chat App!
            </span>
          </div>
          <p className="text-xl mb-8">Please create an account below</p>
          <Formik
            initialValues={{ username: "", password: "", profilePhotoUrl: "" }}
            onSubmit={async (values) => {
              addUser(values);
              handleLoggedIn();
            }}
          >
            {({ values, dirty, setFieldValue }) => (
              <Form className="flex flex-col">
                <p className="text-gray-500 ml-2 text-sm mb-1">Username</p>
                <Field
                  type="text"
                  name="username"
                  className="border border-gray-500 w-80 rounded-xl p-2 mb-4"
                />
                <p className="text-gray-500 ml-2 text-sm mb-1">Password</p>
                <Field
                  type="password"
                  name="password"
                  className="border border-gray-500 w-80 rounded-xl p-2 mb-4"
                />
                <p className="text-gray-500 ml-2 text-sm mb-1">
                  Profile Photo URL (optional)
                </p>
                <Field
                  type="text"
                  name="profilePhotoUrl"
                  className="border border-gray-500 w-80 rounded-xl p-2 mb-8"
                />
                <div className="flex justify-around">
                  <button
                    type="submit"
                    className="text-white font-bold bg-black px-4 py-2 rounded-lg"
                  >
                    Create
                  </button>
                  <button type="submit" className="">
                    Log In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <main className="flex justify-center h-screen py-12">
        <Menu
          handleLoggedIn={handleLoggedIn}
          threads={threads}
          isFetchingThreads={isFetchingThreads}
          currentThread={currentThread}
          setCurrentThread={setCurrentThread}
          fetchThreads={fetchThreads}
        />

        <Feed
          handleLoggedIn={handleLoggedIn}
          threads={threads}
          isFetchingThreads={isFetchingThreads}
          currentThread={currentThread}
          setCurrentThread={setCurrentThread}
          fetchThreads={fetchThreads}
          loggedIn={loggedIn}
          currentUser={currentUser}
        />
      </main>
    </div>
  );
}
