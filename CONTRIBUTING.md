## Contributing
Yarn is highly recommended, but you can still use NPM.

First, make sure you have NPM or Yarn installed on your system.

You will need `windows-build-tools` to compile the project. Install it globally (as an administrator) with:
- YARN: `yarn global add windows-build-tools`
- NPM: `npm i -g windows-build-tools`

Then:
1) Fork this repository, then clone it to your device
2) Install JS dependencies with:
    - Yarn: `yarn`
    - NPM: `npm install`
3) Launch the development server and the app:
    - Yarn: `yarn dev`
    - NPM: `npm run dev`

### Building 
To make a executable file, run:
- Yarn: `yarn dist`
- NPM: `npm run dist`

Don't  forget to run **linting** after any code changes with the `lint` script:
- Yarn:  `yarn lint`
- NPM: `npm run lint`

### Known errors
If you see an error in the devtools console about **missmatching nodejs versions**, run the `rebuild` script and restart the app:
- Yarn: `yarn rebuild`
- NPM: `npm run rebuild`
