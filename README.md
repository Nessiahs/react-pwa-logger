# react-pwa-PwaLogger

Is a React component that globally catches all errors and stores the error in an IndexedDB. If an error is caught, a global error page is delivered.
The default error page has a trigger to trigger a popover, which then allows the error dump to be sent as an email.

You can also redirect certain console methods to the db. In the productive app, the content is then written to the IndexedDB and made available with the dump.

## Who is this module for?

For people who create a PWA and also want to track errors that occur in offline mode. Or you have an app that is not connected to the internet. Under no circumstances should this component be used on a normal website.

## How to use

```typescript
import { PwaLogger } from "pwa-logger";
export default function App() {
  return (
    <PwaLogger>
      <Router>
        <Main />
      </Router>
    </PwaLogger>
  );
}
```

if you want to use the history module you must add the useReactRouter hook in your <Main/>
At this moment i provide only a hook for React-Router

```typescript
import { useReactRouter } from "pwa-logger/hooks";

export const Main = () => {
    useReactRouter()
    return ......
}
```

This hook creates on every location change a entry in the history table with the current time and location.href.
This feature is helpful to detect locations manupulation.

## Features

Either an individual error page can be transferred to the PwaLogger or the content of the default page can be changed via config.

### Changed by config

```typescript
import { PwaLogger } from "pwa-logger";
export default function App() {
  return (
    <PwaLogger
      config={{
        projectName: "My fancy project",
        mailTo: "devs@example.com",
        emailSubject: `Error report for js-logger!!`,
        consoleText:
          "An error was detected at the page. To help your developer, download the file and send it to:",
      }}>
      <Router>
        <Main />
      </Router>
    </PwaLogger>
  );
}
```

### Own error component

```typescript
import { PwaLogger } from "pwa-logger";

const MyErrorPage = () => {
    return ...
}

export default function App() {
  return (
    <PwaLogger errorPage={<MyErrorPage>}>
      <Router>
        <Main />
      </Router>
    </PwaLogger>
  );
}
```

### Context options

In order to enable its own error pages, the component has a context that has the following content:

```typescript
{
  triggerOpen: () => void;
  closeConsole: () => void;
  projectName: string;
  mailTo: string;
  emailSubject: string;
  consoleText: string | React.ReactNode;
}
```

### Available console redirects

If a console command is routed to the DB, output in productive use is also prevented at the same time. However, what is saved in the IndexedDB is decided by the set log level. Default log level of the component is **warn**

## The following console methods can be used:

```typescript
console.info();
console.log();
console.warn();
console.error();
```

## Stored information by log level:

| log level | console.log | console.info | console.warn | console.error | catched scriptError |
| --------- | ----------- | ------------ | ------------ | ------------- | ------------------- |
| all       | x           | x            | x            | x             | x                   |
| info      |             | x            | x            | x             | x                   |
| warn      |             |              | x            | x             | x                   |
| error     |             |              |              | x             | x                   |

## To disable console output use the console property

Disable all posible console output

```typescript
import { PwaLogger } from "pwa-logger";

const MyErrorPage = () => {
    return ...
}

export default function App() {
  return (
    <PwaLogger console={['log', 'info', 'warn', 'error']}>
      <Router>
        <Main />
      </Router>
    </PwaLogger>
  );
}
```

## Change log level

```typescript
import { PwaLogger } from "pwa-logger";

const MyErrorPage = () => {
    return ...
}

export default function App() {
  return (
    <PwaLogger logLevel='error'>
      <Router>
        <Main />
      </Router>
    </PwaLogger>
  );
}
```

## How to use in your modules

if you don't want to throw an error in your module, use the console redirects.

```typescript
const param = {
  user: 1,
  role: "admin",
};
const result = await axios.get("/users");

if (response.data === []) {
  console.info("Server response was empty", param);
}
```

If you now use the log level info a entry in the info db will created with:

```
message: "Server response was empty",
extras: {
  user: 1,
  role: "admin",
}

```
