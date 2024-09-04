// // app/utils/handlers.js
// export const BaseUrlHandler = {
//   request(context, next) {
//     const { request } = context;
//     console.log(request , "request")
//     const updatedRequest = Object.assign({}, request, {
//       url: `http://localhost:3000${request.url}`,
//     });
//     console.log(updatedRequest , "updatedrequest")
//     return next(updatedRequest);
//   },
// };

// app/utils/handlers.js
export const BaseUrlHandler = {
  request(context, next) {
    const { request } = context;

    // For `createRecord`, `updateRecord`, `deleteRecord` operations, make sure URLs are correctly set
    let url = request.url;
    
    // Handle different types of operations
    if (request.op === 'createRecord') {
      // Example: Add endpoint path if needed
      url = `/api/tasks`; // Adjust path based on your backend structure
    } else if (request.op === 'updateRecord') {
      // Handle update record, e.g., /api/tasks/:id
      url = `/api/tasks/${request.data.id}`;
    } else if (request.op === 'deleteRecord') {
      // Handle delete record, e.g., /api/tasks/:id
      url = `/api/tasks/${request.data.id}`;
    } else if (request.op === 'query') {
      // Handle query operation
      url = `/api/tasks`; // This might be a general endpoint for fetching tasks
    }

    // Prepend base URL
    const updatedRequest = {
      ...request,
      url: `https://ember-server.vercel.app${url}` // Adjust the base URL as needed
    };

    return next(updatedRequest);
  }
};
