# Calculator app
A simple calculator app bootstrapped with [Next.js](https://nextjs.org/) and using [TypeScript](https://www.typescriptlang.org/). The app uses [pnpm](https://pnpm.io/) as a package manager.

Unlike most calculator app examples on the internet, this one is being designed with new feature scalability in mind. Thanks to 'evaluate' function from Math.js library, adding new operators to this calculator can be done easily by just declaring it as a button in the layout, as long as they are compatible with Math.js. Any special function buttons (AC, Del, etc.) will require an extra declaration of their function.

## Build
The code can be built either directly or in docker.

### Direct
To build the code directly, in the project directory execute:
```
pnpm run build
```
And then you can run the server by using:
```
pnpm run start
```

### Docker
Docker image can be built by running:
```
sudo docker build -t calculator .
```
And then run it with command:
```
sudo docker run --rm --name calculator-app -itd -p 3000:3000 calculator
```

There is a shell script in the project's directory at `/scripts/testInDocker.sh` that already contains those commands, and can be used to quickly test the build.

## To-Do
- Allow text input on expression display
- Add more operators
- Add tests:
    - CheckButtonType()
    - KeyPad container
    - Calc container
    - PerformButtonFunction()
    - dataStreamReducer()
