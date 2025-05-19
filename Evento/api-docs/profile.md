## Documentation for the Evento API

## Introduction:

For the purpose of managing events, user profiles, feedback, role requests, and user interests,and tickets, The Evento API provides a web-based interface for the Evento platform. The Laravel-built API allows users to create, view, update, and delete resources while producing dynamic web pages (Blade templates) for an interactive user experience. It is integrated with a Supabase database. This documentation offers thorough instructions on how to use the API, including information on endpoints, authentication requirements, and developer setup guidelines.


## API Overview:

Utilizing the normal HTTP methods (GET, POST, PUT, DELETE) to communicate with resources including events, user profiles, feedback, role requests, and user interests,and tickets, The Evento API is resource-based. With the exception of authentication endpoints, which produce JSON responses, all endpoints are prefixed with / and the majority of replies are returned as rendered Blade template views (HTML). JWT-based authentication for safe access, error handling with common HTTP status codes, and pagination for specific resources are all supported by the API.


## Linking up with Supabase:

Supabase is the database backend used by the Evento platform to manage data in real time. Although the Laravel API handles the majority of interactions, developers might need to set up Supabase for special integrations or direct database access.


How to Connect
Acquire credentials for Supabase:
To get the public anon key and API URL, log onto your Supabase project dashboard.
Your-anon-key is the anonymous key.

## Laravel Integration:

Supabase contacts are managed by the Laravel backend through environment variables (such as SUPABASE_URL and SUPABASE_KEY). Make sure your.env file has these set:

SUPABASE_URL=https://doeepfwtwpaccndocrff.supabase.co
SUPABASE_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvZWVwZnd0d3BhY2NuZG9jcmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MTkzNTUsImV4cCI6MjA2MTI5NTM1NX0.i-3lKjJMtjGjtIYFPvsLP8bG5Bd_1sShL-YvykgdfwE


## Requests via API:

During development, send requests to the Laravel server (http://localhost:8000/), which returns rendered views after proxying data to Supabase.

######


## Authentication:
$
[200](images/200.png)
[201](images/201.png)
[401](images/401.png)
[404](images/404.png)
[422](images/422.png)
$
######

## Available Resources

[Profile](profile.md)
[Categories](categories.md)
[Event](event.md)
[Reviews](reviews.md)
[Role-Request](role_request.md)
[Tickets](tickets.md)
[Users](users.md)
[User-Intersts-Id](user_intersts_id.md)