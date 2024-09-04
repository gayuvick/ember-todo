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
    // console.log(JSON.parse(request.data) , "data");
    // console.log("request coming to utils handler" , request)

    // For `createRecord`, `updateRecord`, `deleteRecord` operations, make sure URLs are correctly set
    let url = request.url;
    let method = 'GET'; // Default method for queries
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    
    // Handle different types of operations
    if (request.op === 'createRecord') {
      url = `/api/tasks`; // Path for creating a record
      method = 'POST'; // Method for creating a record
    } else if (request.op === 'updateRecord') {
      url = `/api/tasks/${request.data.id}`; // Path for updating a record
      method = 'PUT'; // Method for updating a record
    } else if (request.op === 'deleteRecord') {
      url = `/api/tasks/${request.data.id}`; // Path for deleting a record
      method = 'DELETE'; // Method for deleting a record
    } else if (request.op === 'findAll') {
      url = `/api/tasks`; // Path for querying records
      method = 'GET';
    }
    else if(request.op === "findRecord"){
      url = `/api/tasks${request.data.id}`;
      method = 'GET';
    }

    // console.log("url after processing based on operation" , url)

    // Prepend base URL
    const updatedRequest = {
      ...request,
      url: `http://localhost:3000${url}`, // Base URL for the server
      method: method, // Set the appropriate method
      headers: headers, // Set headers
     
    };
// console.log("changed request now based for store" , updatedRequest)
    return next(updatedRequest);
  }
};
