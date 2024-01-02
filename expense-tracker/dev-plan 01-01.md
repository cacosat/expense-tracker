
### Project Overview:
The project is an expense tracker application designed for web use. Its primary functionality includes:

1. **Adding Expense Categories**: Users can create various categories for their expenses such as 'Food', 'Accommodation', 'Transportation', etc.
2. **Logging Expenses**: Users can log expenses by specifying the category, description, date, and amount.
3. **Viewing Expenses**: Users can view a list of all expenses and filter them by category.
4. **Data Visualization**: The application will include a graph representing expenses in various categories over time.
5. **Interactivity**: The application features interactive elements like forms and modals to input and edit data.
6. **Persistence**: All expense data is persisted in a database, allowing for long-term tracking and reporting.

### Progress Summary:
So far, we have accomplished the following:

1. **Environment Setup**: Initialized a Node.js project and installed key dependencies such as Express, a body parser, CORS, and dotenv for environment variable management.
2. **Server Initialization**: Established an Express server that can handle HTTP requests and provide basic routing.
3. **Database Connection**: Configured a connection to an SQLite database, which is currently handling our data persistence.
4. **Routes Creation**: Defined routes for our API, specifically for adding and retrieving both categories and expenses.
5. **Endpoints Implementation**: Implemented basic CRUD operations through these routes, allowing the client to interact with the database via HTTP methods.

### Next Steps (To-Do Format):

1. **Total Expenses Counter**:
   - Can be in addition to the endpoint of get expenses or an entirely different endpoint.git 
   - Implement a query within the GET /expenses endpoint to calculate the sum of all expenses.
   - Example: `SELECT SUM(amount) FROM expenses;`
   - Update the endpoint to return this total along with the list of expenses.

2. **Refine Business Logic**:
   - Add input validation in route handlers to check for non-empty and valid data.
   - Example: Use middleware or a utility function to validate the request body.

3. **Data Manipulation and Reporting**:
   - Modify the GET /expenses endpoint to aggregate expenses by category.
   - Example: `SELECT category_id, SUM(amount) FROM expenses GROUP BY category_id;`
   - Return this data for frontend graph processing.

4. **Security Measures**:
   - Ensure that all user inputs are validated and sanitized in the route handlers.
   - Example: Use a library like `express-validator` to check and clean data.

5. **Testing**:
   - Manually test all endpoints using tools like Postman or Insomnia.
   - Example: Create various requests in Postman to test each endpoint for different scenarios.

6. **Frontend Integration**:
   - Connect the frontend with the backend API endpoints.
   - Example: Use `fetch` or `axios` in your React components to send requests to the backend.

7. **Deployment Preparation**:
   - Choose a cloud service for deployment (e.g., Heroku, AWS).
   - Set up a production-ready database.
   - Configure environment variables for the production environment.

8. **Deployment**:
   - Deploy the application to the chosen cloud service.
   - Perform final testing in the production environment.

9. **Continuous Monitoring and Improvement**:
   - Monitor the deployed application for any issues or user feedback.
   - Regularly update and improve the application based on this feedback.
