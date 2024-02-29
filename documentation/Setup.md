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

- If you already have a clerk application, create a `.env` file in the root folder of the project.

- Go to the API Keys tab in the clerk dashboard to find your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and the CLERK_SECRET_KEY.

- Paste the API Keys and following clerk code in the `.env` file and make sure the file looks like this.

![Image of environment file](environment-file.png)

### Creating a new clerk application

- Go to the [clerk website]("https://clerk.com/") and create an account and a clerk application if you do not already have one.

- When creating a clerk application you will need to enable the social connections you wish to use. This project uses google, linkedin and email. Other connections won't be tested and aren't guaranteed to work. This option can be changed later in the User & Authentication tab in the clerk dashboard.

![Image of social connections in clerk](clerk-social-connections.png)

- Go to the API Keys tab in the clerk dashboard to find your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and the CLERK_SECRET_KEY.

- You will then need to create a `.env` file in the root folder of your project. Paste the API Keys in there and following clerk code. Make sure your `.env` file looks like this.

![Image of environment file](environment-file.png)

### How to create an admin account

On the website there exists a admin dashboard that is only accessible to certain users with the admin role. The admin can in the admin dashboard give other users moderator access and delete specific users. Moderator users can also delete specific users.

- Go to the users tab in the clerk dashboard and click on the user you would like to set as admin.

- Scroll down to the metadata settings and edit the public metadata of the user you want to set as admin.

![Metadata settings](metadata-settings.png)

- Give the user the role admin as seen in the image below and click on save. That user should now be able to access the admin dashboard on the website.

![Public metadata](public-metadata.png)
