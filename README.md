
```markdown
# Issue Logger Frontend

This is the frontend for the Issue Logger application, built with Next.js. It displays recent issue activities and allows users to view details of individual issues.

## Folder Structure

```
issue_logger_frontend/
├── app/
│   ├── components/
│   │   ├── DeleteIssueButton.jsx
│   │   ├── RecentsIssues.jsx
│   │   ├── SpecificationCard.jsx
│   │   ├── UpdateIssueButton.jsx
│   ├── dashboard/
│   │   ├── dynamic/
│   │   │   ├── [id]/
│   │   │   │   ├──page.jsx
page.jsx
├── public/
│   ├── ...
├── styles/
│   ├── globals.css
├── .gitignore
├──
package.json

├──

README.md


```

### Folder Descriptions

- **app/components/**: Contains reusable React components.
  - **DeleteIssueButton.jsx**: Component to delete an issue.
  - **RecentsIssues.jsx**: Component to display a list of recent issues with pagination and sorting functionality.
  - **SpecificationCard.jsx**: Component to display issue specifications.
  - **UpdateIssueButton.jsx**: Component to update an issue.

- **app/dashboard/dynamic/[id]/**: Contains dynamic route components for displaying individual issue details in the dashboard.
  - **page.jsx**: Dynamic route component to display details of a specific issue based on the `id` parameter.

- **public/**: Contains static assets such as images, fonts, etc.

- **styles/**: Contains global CSS styles.

- **.gitignore**: Specifies files and directories to be ignored by Git.

- **package.json**: Contains project metadata and dependencies.

- **README.md**: Project documentation.

## How to Run the Project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/techvalley/issue_logger_frontend.git
   cd issue_logger_frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Component and Page Descriptions

### Components

#### `DeleteIssueButton.jsx`

- **Description**: This component provides a button to delete an issue.
- **Location**:

DeleteIssueButton.jsx



#### `RecentsIssues.jsx`

- **Description**: This component displays a list of recent issues with pagination and sorting functionality. It allows users to click on an issue to view its details.
- **Location**:

RecentsIssues.jsx



#### `SpecificationCard.jsx`

- **Description**: This component displays the specifications of an issue.
- **Location**:

SpecificationCard.jsx



#### `UpdateIssueButton.jsx`

- **Description**: This component provides a button to update an issue.
- **Location**:

UpdateIssueButton.jsx



### Pages

####

page.jsx



- **Description**: This dynamic route component displays details of a specific issue based on the `id` parameter. It fetches the issue data and renders the details on the page.
- **Location**:

page.jsx



#### `dynamic/[id]/page.jsx`

- **Description**: This dynamic route component displays details of a specific issue based on the `id` parameter. It fetches the issue data and renders the details on the page.
- **Location**: `app/dashboard/dynamic/[id]/page.jsx`

## How to Edit Components

### Editing `RecentsIssues.jsx`

The `RecentsIssues.jsx` component displays a list of recent issues with pagination and sorting functionality. To edit this component, navigate to

RecentsIssues.jsx

.

#### Example: Adding a New Column

To add a new column to the issues table, follow these steps:

1. **Update the Table Header**

   ```javascript
   <thead className="bg-gray-700 text-white rounded-md p-4">
     <tr className="text-left grid grid-cols-7"> <!-- Update grid-cols-6 to grid-cols-7 -->
       <th className="px-4 py-2 text-left">Issue</th>
       <th className="px-4 py-2 text-left">Issue ID</th>
       <th className="px-4 py-2 text-left">Status</th>
       <th className="px-4 py-2 text-left">Action</th>
       <th className="px-4 py-2 text-left">Comment</th>
       <th className="px-4 py-2 text-left">Date</th>
       <th className="px-4 py-2 text-left">New Column</th> <!-- Add new column header -->
     </tr>
   </thead>
   ```

2. **Update the Table Body**

   ```javascript
   <tbody className="bg-white">
     {currentIssues.map((issue) => (
       <Link key={issue.issue_id} href={`/dashboard/dynamic/${issue.id}`} className="contents">
         <tr className="hover:bg-gray-100 cursor-pointer grid grid-cols-7"> <!-- Update grid-cols-6 to grid-cols-7 -->
           <td className="px-4 py-2 border-b">{issue.name}</td>
           <td className="px-4 py-2 border-b">{issue.issue_id}</td>
           <td className="px-4 py-2 border-b">{issue.status}</td>
           <td className="px-4 py-2 border-b">{issue.action}</td>
           <td className="px-4 py-2 border-b">{issue.comment}</td>
           <td className="px-4 py-2 border-b">{issue.date}</td>
           <td className="px-4 py-2 border-b">{issue.newColumnData}</td> <!-- Add new column data -->
         </tr>
       </Link>
     ))}
   </tbody>
   ```

### Editing `[id]/page.jsx`

The `[id]/page.jsx` component displays details of a specific issue based on the `id` parameter. To edit this component, navigate to `app/dashboard/dynamic/[id]/page.jsx`.

#### Example: Adding a New Field

To add a new field to the issue details, follow these steps:

1. **Update the Sample Data**

   ```javascript
   const Issues = [
     {
       name: "testissue",
       issue_id: "#76235",
       status: "Open",
       action: "edit",
       comment: "Needs more info",
       date: "2022-01-01",
       newField: "New Data" // Add new field
     },
     // ...other issues
   ];
   ```

2. **Update the Component to Display the New Field**

   ```javascript
   const IssueDetails = () => {
     const router = useRouter();
     const { issue_id } = router.query;
     const [issue, setIssue] = useState(null);

     useEffect(() => {
       if (issue_id) {
         const foundIssue = Issues.find((issue) => issue.issue_id === issue_id);
         setIssue(foundIssue);
       }
     }, [issue_id]);

     if (!issue) {
       return <div>Loading...</div>;
     }

     return (
       <div>
         <h1>{issue.name}</h1>
         <p>Issue ID: {issue.issue_id}</p>
         <p>Status: {issue.status}</p>
         <p>Action: {issue.action}</p>
         <p>Comment: {issue.comment}</p>
         <p>Date: {issue.date}</p>
         <p>New Field: {issue.newField}</p> <!-- Display new field -->
       </div>
     );
   };

   export default IssueDetails;
   ```

## Internal Use Only

This project is for internal use by Tech Valley developers. Please do not share or distribute this code outside of the organization.

For any questions or further assistance, please contact the project maintainer.
```
