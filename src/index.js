import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

Save the file.

---

**STEP 5: Test it locally**

In Command Prompt (make sure you are still inside the siddhesh-portfolio folder) run:
```
npm start
```

Your browser will open automatically at localhost:3000 and you will see the portfolio. If something looks broken tell me before moving on.

---

**STEP 6: Create a GitHub account and repo**

1. Go to https://github.com and create an account if you do not have one
2. Once logged in, click the + icon top right → New repository
3. Name it `siddhesh-portfolio`
4. Set it to Public
5. Do NOT check any of the initialize options (no README, no gitignore)
6. Click Create repository
7. Leave that page open, you will need the URL

---

**STEP 7: Install Git**

1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Click Next through everything, all defaults are fine
4. After install, close and reopen Command Prompt

Verify it worked:
```
git -v
```
Should show a version number.

---

**STEP 8: Push your code to GitHub**

In Command Prompt, make sure you are inside the siddhesh-portfolio folder. Then run these commands one at a time:
```
git init
```
```
git add .
```
```
git commit -m "initial portfolio"
```
```
git branch -M main
```
```
git remote add origin https://github.com/siddhesh1008/siddhesh-portfolio.git
```
```
git push -u origin main