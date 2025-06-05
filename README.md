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

## Docker

