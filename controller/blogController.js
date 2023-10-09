const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/newAppError");
const axios = require("axios");
const _ = require("lodash");

const cacheKey = (url, headers) => {
  return JSON.stringify({ url, headers });
};

const cacheOptions = {
  // 10 minutes
  maxAge: 10 * 60 * 1000,
};

const fetchBlogs = _.memoize(
  async (url, headers) => {
    try {
      const response = await axios.get(url, { headers });
      return response.data.blogs;
    } catch (error) {
      throw new AppError("Error in fetching", 500);
    }
  },
  cacheKey,
  cacheOptions
);

exports.analytics = catchAsync(async (req, res, next) => {
  const url = "https://intent-kit-16.hasura.app/api/rest/blogs";
  const headers = {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  };
  // Only accepting "privacy" query otherwise same function byDefault work for analytics
  const query = req?.query?.query || "Hello";

  try {
    // calling fetchBlogs for memoize the data and return if available in cache
    const blogs = await fetchBlogs(url, headers);
    // if not query "privacy" then responding blogs analytics
    if (query.toLowerCase() === "privacy") {
      const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      res.status(200).json(filteredBlogs);
    }

    let totalBlogs = Object.keys(blogs).length;
    const longestTitleBlog = _.maxBy(blogs, "title.length");
    const privacyBlogsCount = _.filter(blogs, (blog) =>
      _.includes(blog.title.toLowerCase(), "privacy")
    ).length;
    const uniqueBlogTitles = _.uniqBy(blogs, "title").map((blog) => blog.title);

    const analyticsResults = {
      totalBlogs,
      longestTitleBlog,
      privacyBlogsCount,
      uniqueBlogTitles,
    };

    // Store totalBlogs in res.locals for access in the route handler
    res.locals = analyticsResults;

    next();
  } catch (error) {
    next(new AppError("Error in fetching", 500));
  }
});

// createEmployee
exports.getBlog = catchAsync(async (req, res, next) => {
  try {
    const analyticsResults = res.locals;
    res.status(200).json({
      status: "success",
      message: "Blog fetched",
      analyticsResults: analyticsResults,
    });
  } catch (err) {
    next(new AppError("Error in fetching", 500));
  }
});
