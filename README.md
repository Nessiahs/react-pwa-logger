# react-pwa-logger

Ist eine React-Komponente, die Global alle Fehler catched und den Fehler in einer IndexedDB hinterlegt. Falls ein Fehler abgefangen wird, wird eine Globale Error-Page ausgeliefert.
Die Default Error-Page hat einen Trigger um ein Popover zu triggern, welches es dann erlaubt den Error-Dump als Email zu versenden.

Weiterhin kannst Du auch gewisse console Methoden in die Db umleiten. In der Produktiv App wird dann der Inhalt in die IndexedDB geschrieben und mit dem Dump verfügbar gemacht.

## Für wen ist dieses Modul gedacht:

Für Leute die eine PWA erstellen und auch Fehler, die im Offline-Mode auftreten tracken wollen. Oder Ihr habt eine App, die keine Verbindung zum Internet hat. Auf keinen Fall sollte
diese Komponente auf einer normalen Webseite eingesetzt werden.

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

Dem Logger kann entweder eine Individuelle Error-Page mit übergeben werden oder der Inhalt der Default-Page per config geändert werden. l

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
