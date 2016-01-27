# App-State TodoMVC Example

> App-State is a storage model that can act as a communication hub to keep modules in an app informed.

## Parts

Using app-state can be done in many different ways. In this example, we're using app-state with riotjs. As long as you
have a means of templating and making api calls, using app-state makes managing an app simpler.

### Views

Each view is responsible for doing two things:

1. Templating the appState to create the UI.
2. Capturing using interactins and triggering Actions or updating the route based on these.

### Actions

Actions are methods that mostly manage Api calls and push data into Models. Many Action methods are promise chains.
Actions can have light business logic in the form of showing and hiding loading spinners. Actions coordinate multiple
api calls if needed.

### API

Collection of api calls that asynchronously return data. To keep things simple and modular, the API has no knowledge of 
appState.

### Models

Models get data pushed into them by Actions. All major business logic is in the models, and all model methods are 
synchronous. This makes testing business logic relatively simple with the use of rewire / rewireify.

Models update the appState and set computed properties on the appState. Models can be tested with rewire / rewireify, and
by checking appState before and after calling model moethods.

Keeping model methods synchronous and about business logic, allows easy testing of important parts of the app.

### Router

The router simply responds to changes in the route. On app initialization the route is checked once, and subsequently the
router responds to change in the window's route. Using traditional `a` tags with proper hrefs allows to router to function
simply, and makes it unnecessary for views to call the router directly. In some cases actions may trigger route changes
when performing a dynamic route change.

