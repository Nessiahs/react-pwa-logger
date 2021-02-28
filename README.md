# react-pwa-logger

Is a React component that globally catches all errors and stores the error in an IndexedDB. If an error is caught, a global error page is delivered.
The default error page has a trigger to trigger a popover, which then allows the error dump to be sent as an email.

You can also redirect certain console methods to the db. In the productive app, the content is then written to the IndexedDB and made available with the dump.

## Who is this module for?

For people who create a PWA and also want to track errors that occur in offline mode. Or you have an app that is not connected to the internet. Under no circumstances should this component be used on a normal website.

## How to use

```typescript
import { Logger } from "Logger";
export default function App() {
  return (
    <Logger>
      <Router>
        <Main />
      </Router>
    </Logger>
  );
}
```

if you want to use the history module you must add the useReactRouter hook in your <Main/>

```typescript
import { useReactRouter } from "Logger/hooks";

export const Main = () => {
    useReactRouter()
    return ......
}
```

## Features

Either an individual error page can be transferred to the logger or the content of the default page can be changed via config.

### Changed by config

```typescript
import { Logger } from "Logger";
export default function App() {
  return (
    <Logger
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
    </Logger>
  );
}
```

### Own error component

```typescript
import { Logger } from "Logger";

const MyErrorPage = () => {
    return ...
}

export default function App() {
  return (
    <Logger errorPage={<MyErrorPage>}>
      <Router>
        <Main />
      </Router>
    </Logger>
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
