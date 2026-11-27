// data/network.js
// A sample network built as a tree. Each node is a site that can have child sites.
// A tree is a natural fit for recursion: every child is itself a smaller tree.

export const network = {
  name: "Abuja Core Hub",
  kind: "core",
  users: 0,
  children: [
    {
      name: "Wuse Distribution",
      kind: "distribution",
      users: 40,
      children: [
        { name: "Wuse Market POP", kind: "access", users: 120, children: [] },
        { name: "Wuse II Office Park", kind: "access", users: 85, children: [] },
      ],
    },
    {
      name: "Gwarinpa Distribution",
      kind: "distribution",
      users: 25,
      children: [
        {
          name: "Gwarinpa Estate POP",
          kind: "access",
          users: 210,
          children: [
            { name: "3rd Avenue Tower", kind: "access", users: 60, children: [] },
          ],
        },
      ],
    },
    {
      name: "Kubwa Distribution",
      kind: "distribution",
      users: 30,
      children: [
        { name: "Kubwa Mall POP", kind: "access", users: 95, children: [] },
      ],
    },
  ],
};