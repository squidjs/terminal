## Contributing
First, make sure you have Yarn installed on your system.
For information about the CLI, head over to [CLI.md](cli/CLI.md)

You will need `windows-build-tools` to compile the project. Install it globally (as an administrator) with:
- `yarn global add windows-build-tools`

Then:
1) Fork this repository, then clone it to your device
2) Install JS dependencies with:
- `yarn`
3) Launch the development server and the app:
- `yarn dev`

### Building
To make a executable file, run:
- `yarn dist`

Don't  forget to run **linting** after any code changes with the `lint` script:
- `yarn lint`

### Known errors
If you see an error in the devtools console about **missmatching nodejs versions**, run the `rebuild` script and restart the app:
- `yarn rebuild`

On Apple Silicon devices, you will need to rebuild with the arm64 architecture:
- `yarn rebuild:arm64`
