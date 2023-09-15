# Product Tracking Supply Chain Management Using Blockchain

1. Basic Setup :

- to create the React + vite Project
```
npm create vite@latest
```

```
cd Project_name
npm install
npm run dev
```

- To install the TailwindCSS in Project

```
cd Project_name
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Configure your template paths
Add the paths to all of your template files in your ``tailwind.config.js`` file.

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add the Tailwind directives to your CSS <br>
Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Start your build process <br>
Run your build process with `npm run dev`.
```
npm run dev
```

- Install Hardhat in Project
```
npm install --save-dev hardhat
```

- Do this Steps
1. Initilize the Hardhat
```
npx hardhat
```

- Install ether.js in Project (it use for the Integration purpose) 
- smart contract + front-end
```
npm install ethers@5.7.2
```

- Install the Web3 Model
```
npm install web3modal@1.9.12
```

- Initialize the Local Blockchain using Hardhat
```
npx hardhat node
```

- If Some of the dependency are not installed then it throw the error
```
npm install --save-dev "hardhat@^2.17.2" "@nomicfoundation/hardhat-toolbox@^3.0.0"
```

- To run the Hardhat
```
npx hardhat run --network localhost scripts/deploy.js
```











