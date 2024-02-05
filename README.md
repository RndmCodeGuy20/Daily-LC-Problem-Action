# Get Daily LeetCode Problem 

Get Daily LeetCode Problem is a node.js script that will get the daily problem from LeetCode and create a markdown file with the problem description and the link to the problem.

Also, it will create a folder with the name of the problem and a file with the solution template.

## Installation

1. Create a `.github\workflows` folder in your repository.

```txt
./project root
└── .github
    └── workflows
```

2. Create a `daily-leetcode-problem.yml` file in the `.github\workflows` folder.

```txt
./project root  
└── .github
    └── workflows
        └── daily-leetcode-problem.yml
```

3. Copy the following code into the `daily-leetcode-problem.yml` file.

```yml
name: Get Daily LeetCode Problem

on:
  schedule:
    - cron: '0 1 * * *'
  workflow_dispatch: # Manually trigger the workflow - 🔮 you can remove this line

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        token: ${{ secrets.GITHUB_TOKEN }} # If you are using a private repository

    - name: Get Daily LeetCode Problem
      uses: RndmCodeGuy20/Daily-LC-Problem-Action@v1.4.0 # Use the latest version - ✨ - if you are reading this care to checkout the marketplace for the latest version
      with: 
        lang_choice: 'Python3'
        # Strictly use one of these options : ["C++", "C", "Python3", "JavaScript", "Java"] - 🚀 names are case sensitive
            
    - name: Commit and push changes
      run: |
        git config --global user.name 'author name' # Replace with your name
        git config --global user.email 'author email' # Replace with your email
        git status
        git add .
        git commit -m "chore(action) 🦈: today's daily leetcode question added"
        git push

```

4. Run the workflow manually or wait for the scheduled time.

5. The workflow will create a folder with the name of the problem and a file with the solution template.