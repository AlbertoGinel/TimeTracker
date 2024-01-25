# Time Tracker

This project is aimed at challenging and enhancing my Next.js skills, and it involves developing a personalized time tracker, akin to commercial tools like [Clockify](https://clockify.me/).

## Overview

The current state of the application serves as a debugger for the underlying structure. It primarily deals with times and dates, which can be error-prone.

![Time Tracker Debugger](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/3b185454-7db2-4408-ac61-f31e9846022e/Untitled.png)

## Core Model Prototyping

At this stage, the focus is on prototyping the core model for the timer. The approach is centered around the belief that the truth lies in the stamps, and the rest of the information generates accordingly. The database specifically stores activities, user profiles, and stamps.

![Database Schema](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/8236c96d-728a-4224-a5d3-4cfd8a7696a2/Untitled.png)

### Keywords

- **Activities:** Each activity has an associated icon and color, e.g., Sleep, etc.
- **Stamp:** Signifying the start and stop, each stamp has an associated activity and timestamp.
- **Interval:** Defined by a starting stamp and ending with a stop or a new start.

## Client-Side Processing

Given the diverse client-side processing requirements, a context-based approach is adopted, leveraging Zustand. However, there are challenges with dependencies between stores, currently hindering the app's functionality.

![Client Context](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/0b76ae92-e8e1-4dbf-8bff-a9497f945637/Untitled.png)

### Index Context

The `Index` context is introduced to bring order among the dedicated contexts.

- **Stamps and Activity Context:** Simple contexts that hold arrays.

  ![Stamps and Activity Context](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/122387bf-72be-4c2d-9b28-3b2653e1e83e/Untitled.png)

- **Intervals Context:** A more complex context that filters stamps, eliminates redundancy, removes quickly updated stamps, and crucially, creates the interval array based on the stamps.

  ![Intervals Context](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/e197f37f-b40e-452f-a2b0-dccc0a221487/Untitled.png)

## Backend

The backend, implemented using Next.js, follows a straightforward structure. The API routes are defined in `route.js`.

![Backend Structure](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/cd10ba9b-1643-40dd-bf6d-f57ddca52300/Untitled.png)

The API endpoint `fetch("/api/activities")` performs a GET request. Notably, Prisma is used to retrieve user activities.

![API Endpoint](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/7e83ffca-e1bf-48d3-8d8f-c8d78aa7e18a/Untitled.png)

## Frontend

The current frontend may lack visual appeal, but it successfully updates counters every second.

![Frontend](https://prod-files-secure.s3.us-west-2.amazonaws.com/47ed398c-279d-4699-9676-bb092ad8328b/c92a66a1-5c76-4b72-9043-608605708124/Untitled.png)

Regular components were initially responsible for data generation, but this responsibility has been shifted to the `Index` context.
