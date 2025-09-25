# template

This is a template repository that contains basic folder structure and basic packages like eslint, prettier, and webpack.

## Installation

After cloning the repository, you should install all the necessary dependencies with:

`npm install`

## To Deploy an Application:

**For the first deployment:**

`git branch gh-pages`

`git status` (to check there are no remaining files to be committed in the current branch)

**For any deplyment after:**

`npm run pre-build`

`npm run build`

`npm run add-dist`

`npm run deploy`

Then checkout to main after to ensure no further changes to the gh-pages branch.
