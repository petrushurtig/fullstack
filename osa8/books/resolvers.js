const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author", { name: 1, born: 1 });
      }
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        console.log("author id", author._id);
        return await Book.find({ author: author._id }).populate("author", {
          name: 1,
          born: 1,
        });
      }
      if (!args.author && args.genre) {
        console.log("only crime", args.genre);

        return await Book.find({ genres: { $in: args.genre } }).populate(
          "author",
          { name: 1, born: 1 }
        );
      }
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({
          $and: [{ author: author._id }, { genres: { $in: args.genre } }],
        }).populate("author", { name: 1, born: 1 });
      }
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: (root, args, context) => {
      return context.currUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author });
      const currUser = context.currUser;

      if (!currUser) {
        throw new AuthenticationError("not authenticated");
      }
      if (!author) {
        const newauthor = new Author({
          name: args.author,
        });
        try {
          await newauthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const foundAuthor = await Author.findOne({ name: args.author });
      const book = new Book({
        title: args.title,
        published: args.published,
        //author: author._id,
        author: foundAuthor,
        genres: args.genres,
      });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currUser = context.currUser;

      if (!currUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.born;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "pass") {
        throw new UserInputError("Wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
