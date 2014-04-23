# Git

## Commit hooks

Commits hooks are in the repository for easier sharing and updating, inside `./tasks/hooks/`.

Please take the time before creating commits, to set up the git hooks.

On Linux/Mac, when you are at the root of the project:
- Erase the current git hook directory:  `rm -rf .git/hooks`
- Create an alias to the shared hooks: `cd .git && ln -s ../tasks/hooks hooks`

## Pulling commits from origin

When pulling changes from origin to your local repository, try to avoid [unnecessary merge commits](http://gitready.com/advanced/2009/02/11/pull-with-rebase.html).

Instead of using `git pull`, use `git pull --rebase`.

Follow these simple rules:
- You don't have commits waiting to be pushed, and you want to pull: `git pull` *(git will fast-forward)*
- You have few commits waiting to be pushed you need to pull before pushing: `git pull --rebase` *(git will rebase your commits on top of the commits pulled from origin)*
- You have many olds commits that need to be pushed. They change many things and you fear it might break things. You want to clearly show that you have merge changes: `git pull` *(git will merge your code and create a merge commit)*

Your working copy needs to be clean for a `git pull --rebase`. If you are not ready to commit these changes, [stash](http://git-scm.com/book/en/git-tools-stashing) them.

## TODO

- commit messages conventions
- master/develop branches role
- responsibility involved when pushing
