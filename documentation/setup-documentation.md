# Setup

## Clone Github Repository

Run the following command in the CLI to clone down the repository

```bash
git clone https://github.com/NTIG-Uppsala/Stuns-Aterbrukslabbet.git
```

## Download Node.js and necessary packages

Download Node.js at this [link](https://nodejs.org/en/download)

For this project we use Node.js version 20.11.0

Run the following command in the CLI to get the necessary packages from the node package manager.

```bash
npm install
```

## Set up Clerk authentication

### Creating a clerk application

- Go to the [clerk website]("https://clerk.com/") and create an account and a clerk application if you do not already have one you wish to use.

- When creating a clerk application you will need to choose which sign in options that can be used to access your application. This project uses Google, Linkedin and email. Other connections won't be tested and aren't guaranteed to work. This option can be changed later in the User & Authentication tab in the clerk dashboard.

![Image of social connections in clerk](clerk-social-connections.png)

### Setting up the .env file

- First, go to the API Keys tab in the clerk dashboard to find your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY and copy them.

- Then, create a `.env` file in the root folder of your project and paste the copied keys followed by the code below into your newly created `.env` file.

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Your `.env` file should now look like this.

![Image of environment file](environment-file.png)

### How to create an admin account

On the website there exists an admin dashboard that is only accessible to users with the admin or moderator role. Admins can, through the admin dashboard, delete and change the roles of non admin users. Moderators do not have the ability to effect the roles of other users but are able to delete accounts belonging to users who don't have the admin or the moderator role.

- Go to the users tab in the clerk dashboard and click on the user you would like to set as admin.

- Scroll down to the metadata settings and edit the public metadata of the user you want to set as admin.

![Metadata settings](metadata-settings.png)

- Give the user the role admin as seen in the image below and click on save. That user should now be able to access the admin dashboard on the website.

![Public metadata](public-metadata.png)
