# Application.jsx
This is the highest level component. It primarily handles the API calls and the view depending on the status of them.

## componentDidMount method

- Fetches book data via axios
- With the returned data, it processes it via filterData and sets it to state
- If it errors, this data is captured and also added to state

## filterData method

- Takes data returned from REST as argument
- Returns an object with the REST data in a format used by ```<Form />```

## mapArray method

- Receives array of strings as argument
- Maps it into an array of objects  ```{display: "", value: 0}``` 

## handleSubmission method
- Receives payload object containing form data
- Posts it to a mock API for demo purposes then adds it to the state to be passed back down into the ```<Form /> ``` component to view changes.


#### Notes
With more time I would have liked to create a ```<Message />``` component that would have took a mode as a prop and rendered a message based on the loading & submission view types.
