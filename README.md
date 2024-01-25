# Time Tracker

This project is aimed at challenging and enhancing my Next.js skills, and it involves developing a personalized time tracker, akin to commercial tools like [Clockify](https://clockify.me/).

## Overview

The current state of the application serves as a debugger for the underlying structure. It primarily deals with times and dates, which can be error-prone.

![Time Tracker Debugger](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image1.png)

## Core Model Prototyping

At this stage, the focus is on prototyping the core model for the timer. The approach is centered around the truth lies in the stamps, and the rest of the information generates accordingly. The database specifically stores activities, user profiles, and stamps.

![Database Schema](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image2.png)

### Keywords

- **Activities:** Each activity has an associated icon and color, e.g., Sleep, etc.
- **Stamp:** Signifying the start and stop, each stamp has an associated activity and timestamp.
- **Interval:** Defined by a starting stamp and ending with a stop or a new start.

## Client-Side Processing

Given the diverse client-side processing requirements, a context-based approach is adopted, usinc Zustand as a context. However, there are challenges with dependencies between stores, currently hindering the app's functionality.

![Client Context](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image3.png)

### Index Context

The index.js context is introduced to bring order among the dedicated contexts.

- **Stamps and Activity Context:** Simple contexts that hold arrays.

  ![Stamps and Activity Context](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image4.png)

- **Intervals Context:** Where intervals is more complicated, it does filter the Stamps, sameActivityIn a Row eliminates redundancy, shortStamps deletes the stamps that are quickly updated, and the most important, makeIntervals create the interval arrayout of the stamps.

  ![Intervals Context](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image5.png)

## Backend

The backend, implemented using Next.js, follows a straightforward structure. The API routes are defined in route.js.

![Backend Structure](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image6.png)

so far fetch("/api/activities"); just does a GET, mind that Im using Prisma just to get the users activities:

![API Endpoint](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image7.png)

## Frontend

The frontend at this stage doesnt look any good, but I managed to make the counters tick every second.

![Frontend](https://github.com/AlbertoGinel/TimeTracker/raw/readmeForAIVHY/public/ReadmeImages/image8.png)

Regular components were initially responsible for data generation, but this responsibility has been shifted to the Index.js context.
