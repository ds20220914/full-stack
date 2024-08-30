sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Write a new note and click "Save"
    browser->>browser: JavaScript captures the form data
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    
    server-->>browser: JSON response { "content": "New note", "date": "2024-08-28" }
    deactivate server
    
    browser->>browser: JavaScript updates the UI with the new note
    
