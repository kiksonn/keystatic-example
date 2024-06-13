import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      // where key static stores your data
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/posts",
              publicPath: "../../assets/images/posts/",
            },
          },
        }),

        // create connection posts and authors

        // author: fields.relationship({
        //   label: 'Author',
        //   collection: 'authors'
        // }),

        // create multiple authors on one project
        authors: fields.array(
          fields.relationship({
            label: "Authors",
            collection: "authors",
            validation: {
              isRequired: true,
            },
          }),
          {
            label: "Authors",
            itemLabel: (item) => item.value || "Please select an author",
          }
        ),
      },
    }),
    // Create new Collection Authors
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",

      // define format of authors
      format: { data: "json" },
      // what field should be in avalible in collection
      schema: {
        // auto generate slug
        name: fields.slug({ name: { label: "Name" } }),
        // create avatar field
        avatar: fields.image({
          label: "Avatar",
          // select where img avatar is store
          directory: "public/images/avatars",
          publicPath: "/images/avatars",
        }),

        // add showcase to authors
        showcase: fields.blocks(
          {
            link: {
              label: "Link",
              schema: fields.object({
                label: fields.text({
                  label: "Label",
                  validation: {
                    length: {
                      min: 1,
                    },
                  },
                }),
                url: fields.url({ label: "URL" }),
              }),
              itemLabel: (item) => "link : " + item.fields.label.value,
            },
            youtubeVideoId: {
              label: "Youtube Video ID",
              schema: fields.text({
                label: "Youtube Video ID",
                validation: {
                  length: {
                    min: 1,
                  },
                },
              }),
              itemLabel: (item) => " Youtube ID: " + item.value,
            },
          },
          {
            label: "Showcase",
          }
        ),
      },
    }),
  },
});
