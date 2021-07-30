# Book Details Edit App

I used the free API found at openlibrary.org. 
It fetches the data of a book called Nineteen Eighty-Four by George Orwell.
You can select the option to edit the details and make changes.

There is no actual POST API but I mocked what it may look like using a similar setup to the GET request.


Use the following commands for building / running tests.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### NOTES

There are a few changes I would have liked to have made if I had the time...
- More in-depth testing. The testing I have done covers the minimum functionality but doesnt account for 'un-happy' paths.
- More documentation. I was hoping to have time to do more in terms of documentation as well.
- Edit.jsx. While functional, it is carrying a lot of the work load and given some more time would have looked to thinning it out, each switch case would be rendered into a separate component.
- Styling. Needs some tidying up but also the css classes could probably be more streamlined.