sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Write a new note and click "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: Server processes the incoming data and saves the note
    server-->>browser: HTTP 302 redirect to /notes
    deactivate server
    
    Note right of browser: The browser follows the redirect
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "New note content", "date": "2024-08-28" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the updated list of notes
