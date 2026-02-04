export type Node = {
  id: string
  name: string
  children: Node[][]
}
export const nodes: Node[] = [
  {
    id: 'f84ff063-da3e-42d2-8176-1eb3beec6d5b',
    name: 'HTTP Trigger',
    children: [],
  },
  {
    id: '6196b76b-58ba-4d3f-a34e-835c5c1723db',
    name: 'Active MQ 6.X',
    children: [],
  },
  {
    id: 'b5c6f02f-0506-4bee-887d-6f42649c384e',
    name: 'Parallel',
    children: [
      [
        {
          id: 'e84ac89c-9fbc-4d5d-8a97-6968d8ff1592',
          name: 'Script',
          children: [],
        },
        {
          id: 'cf600a18-316a-4fdd-a067-29b73d2dfea9',
          name: 'SMTP',
          children: [],
        }
      ],
      [
        {
          id: '941c1e1c-a1fb-4cca-b271-2db2e6bd1eb5',
          name: 'SQL',
          children: [],
        }
      ]
    ],
  },
  {
    id: '4e913273-f09e-4ee4-81bf-9d5907236e00',
    name: 'HTTP Sender',
    children: [],
  }
]