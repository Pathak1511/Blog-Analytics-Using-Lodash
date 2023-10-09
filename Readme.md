##### [Blog Search API Documentation](https://documenter.getpostman.com/view/18873680/2s9YJgUg8W)

[Problem Statement](https://github.com/Pathak1511/Blog-Analytics-Using-Lodash/blob/main/problemStatement.md)

##### Overview

The Blog Search API allows you to search for blogs based on a query string. It provides a simple and efficient way to filter blogs from a remote source based on the provided search criteria.

##### Technologies Used

- **Node.js**: The API is built using Node.js, a runtime environment that allows you to run JavaScript on the server-side.
- **Express**: We use the Express.js framework to create and manage API routes and handle HTTP requests and responses.
- **Axios**: Axios is used to make HTTP requests to a remote server, specifically to fetch the list of blogs for searching.
- **Lodash**: Lodash is used for various utility functions, including memoization for caching analytics and search results.
- **JSON**: Data is exchanged in JSON format, which is a lightweight and easy-to-parse data interchange format.

##### Endpoint

`GET /api/blog-search`

##### Description

The Blog Search API endpoint enables you to search for blogs hosted on the Intent Kit platform. It filters blogs based on the provided query string, making it easy to find relevant content. The search is case-insensitive, meaning it matches blogs regardless of the letter case used in the query.

##### Parameters

- `query` (string, required): The search query to filter blogs. This query is case-insensitive.

##### Request

- **Method**: GET
- **Endpoint**: `/api/blog-search?query=your-query`
- **Headers**: None

##### Responses

##### Success Response

- **Status Code**: 200 OK
- **Example Response**:

```json
[
  {
    "id": "blog-1",
    "title": "Privacy Policy Updates",
    "content": "..."
  },
  {
    "id": "blog-2",
    "title": "Protecting Your Data",
    "content": "..."
  }
]
```

##### Request

- **Method**: GET
- **Endpoint**: `/api/blog-search`
- **Headers**: None

##### Example Request

```

curl --location 'http://localhost:3000/api/blog-stats'
```

##### Responses

##### Success Response

- **Status Code**: 200 OK
- **Example Response**:

```json
{
  "status": "success",
  "message": "Blog fetched",
  "analyticsResults": {
    "totalBlogs": 461,
    "longestTitleBlog": {
      "id": "1627f364-559c-46cf-a03a-04d185bacb3a",
      "image_url": "https://cdn.subspace.money/whatsub_services/backdrop_url/Q1g1nRYpHbA48ngIPX6nA.png",
      "title": "After 24 days at the box office, Sunny Deol's action film Gadar 2 became the second Hindi film to gross over ₹500 crore"
    },
    "privacyBlogsCount": 4,
    "uniqueBlogTitles": [
      "Privacy policy",
      "Top 5 ways to save money on Subscriptions",
      "Sony is updating its PlayStation Plus gaming subscription, which will be available soon.",
      "Top 5 Subscription Management apps",
      "Top 5 shows to watch on NETFLIX on the 2nd week of September.",
      "............................."
    ]
  }
}
```
