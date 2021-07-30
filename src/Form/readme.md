# Form.jsx
This is the top level for the page contents. It primarily handles the flow of compoents and the data provided to them.

## state

- Initially contains a copy of the form data passed from the props of the ```<Application /> ``` component. This is updated when the ```<Edit />``` panel triggers a submission.
- Also manages the view. This is defaulted to "details"

## Views 

#### details
- Default view. Renders the ```<Details />``` component.

#### edit
- Renders the ```<Edit />``` component when the appropriate action has been selected.

#### actions
-Renders the ```<Actions />``` component which provides a list of menu options for the form.

## handleSubmission method

- Receives payload object containing form data.
- Appends the availablesPlaces and availableTopics arrays.
- Calls handleSubmission function from props and passes in the updated data object.
