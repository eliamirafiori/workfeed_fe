# Anaconda envirovment

## Create a nodejs virtual environment

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

## Create an environment from YAML

```bash
conda env create -f environment.yml
```

## List all available environments

```bash
conda env list
# or
conda info --envs
```

## Export the environment to YAML

```bash
conda env export > environment.yml
```

## Remove environment and its dependencies

```bash
conda remove --name env_name --all
```

## Clone an existing environment

```bash
conda create --name clone_env_name --clone env_name
```
