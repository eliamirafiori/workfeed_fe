# README

## Git + GitHub [GUIDE](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

### Initialize the local directory as a Git repository

By default, the initial branch is called main.

```bash
git init -b main
```

### Add the files in your new local repository

his stages them for the first commit.

```bash
git add .
```

### Commit the files that you've staged in your local repository

```bash
git commit -m "First commit"
```

### Authenticate on GitHub

```bash
git config --global user.email "your_email@domain.com"
```

```bash
git config --global user.name "Your Name"
```

When asked to login on GitHub, instead of inserting your GitHub credentials, paste yout GitHub token.

### Adding a local repository to GitHub using Git

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files.

```bash
git remote add origin REMOTE-URL
```

### To push the changes in your local repository to GitHub

```bash
git push origin main
```

## Anaconda environment

### Create a nodejs virtual environment

```bash
conda create -y -n env_name nodejs
```

To specify a nodejs version, you can run:

```bash
conda create -y -n env_name nodejs=version
```

Then, check the following installations:

```bash
node --version && npm --version
```

```bash
which node && which npm
```

### Create a Python virtual environment

```bash
conda create -y -n env_name python
```

To specify a python version, you can run:

```bash
conda create -y -n env_name python=version
```

Then, check the following installations:

```bash
python --version && pip --version
```

```bash
which python && which pip
```

### Create an environment from YAML

```bash
conda env create -f environment.yml
```

### List all available environments

```bash
conda env list
## or
conda info --envs
```

### Export the environment to YAML

```bash
conda env export > environment.yml
```

### Remove environment and its dependencies

```bash
conda remove --name env_name --all
```

### Clone an existing environment

```bash
conda create --name clone_env_name --clone env_name
```

## Docker

```bash
sudo docker build -t workfeed .
```

```bash
sudo docker run -p 3000:3000 workfeed
```

## NextJS

### Install the required packages

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Start the production server

```bash
npm run tart
```

### .env\* files

NextJS recognizes the environment automatically, based on the command given.

1. `.env`: This is the default file that Next.js will use in all environments unless explicitly overridden. It can contain general environment variables that will be available in both development and production.

2. `.env.local`: This file is used for environment-specific variables that should not be committed to version control. It's typically used to store sensitive data, like API keys or database URLs, that should not be pushed to the repository. The variables in .env.local will take precedence over those in `.env`.

3. `.env.development`: This file is used specifically in development mode. If you run next dev, Next.js will automatically load the variables from .env.development, if they are present.

4. `.env.production`: This file is used for production-specific environment variables, and Next.js will load it when running the production build (next start).

5. `.env.test`: This file is used for environment variables specific to running tests (with Jest, for example).

### Authentication [GUIDE](https://nextjs.org/docs/app/guides/authentication#session-management)

### React Context Providers

#### ContextAPI

Video Name: Full Stack Spotify Clone： Next 13.4, React, Stripe, Supabase, PostgreSQL, Tailwind (2023)

1:34:45 - useUser hook with ContextAPI
1:45:00 - useContext

#### React State Management - [Redux](https://redux.js.org/usage/nextjs)

[Redux Fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)

#### React State Management - [Zustand](https://zustand.docs.pmnd.rs/guides/nextjs)

2:02:00 - Using Zustand
4:03:00 - Music Player
