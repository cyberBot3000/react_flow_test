import type { Node } from './nodes.interfaces';

export const nodes: Node[] = [
  {
    id: 'http1',
    name: 'HTTP Trigger',
    children: [],
  },
  {
    id: 'http2',
    name: 'choice',
    children: [[{id: 'when', name: 'When', children: []}], [{id: 'otherwise', name: 'Otherwise', children: []}]],
  },
  {
    id: 'activemq61',
    name: 'Active MQ 6.X',
    children: [],
  },
  {
    id: 'parallel1',
    name: 'Parallel',
    children: [
      [
        {
          id: 'script1',
          name: 'Script',
          children: [],
        },
        {
          id: 'nested-parallel1',
          name: 'Nested Parallel',
          children: [
            [
              {
                id: 'smtp1',
                name: 'SMTP',
                children: [],
              },
              {
                id: 'logger1',
                name: 'Logger',
                children: [
                  [
                    {
                      id: 'sql4',
                      name: 'SQL',
                      children: [],
                    },
                  ],
                  [
                    {
                      id: 'sql5',
                      name: 'SQL',
                      children: [],
                    },
                  ],
                ],
              },
            ],
            [
              {
                id: 'cache2',
                name: 'Cache',
                children: [],
              },
            ],
          ],
        },
      ],
      [
        {
          id: 'sql1',
          name: 'SQL',
          children: [
            [
              {
                id: 'sql3',
                name: 'SQL3',
                children: [],
              },
            ],
            [
              {
                id: 'cache1',
                name: 'Cache',
                children: [],
              },
            ],
            [
              {
                id: 'rabbitmq1',
                name: 'RABBITMQ',
                children: [],
              },
            ],
            [
              {
                id: 'kafka1',
                name: 'Kafka',
                children: [],
              },
            ],
          ],
        },
        {
          id: 'setBody1',
          name: 'setBody1',
          children: [
            [
              {
                id: 'otlp1',
                name: 'otlp1',
                children: [],
              },
            ],
            [
              {
                id: 'otlp2',
                name: 'otlp2',
                children: [],
              },
            ],
          ],
        },
      ],
      [
        {
          id: 'sql2',
          name: 'SQL2',
          children: [],
        },
        {
          id: 'loop1',
          name: 'loop1',
          children: [
            [
              {
                id: 'dataMapper1',
                name: 'dataMapper1',
                children: [],
              },
              {
                id: 'bean1',
                name: 'bean1',
                children: [],
              },
            ],
          ],
        },
      ],
    ],
  },
  {
    id: 'httpsender1',
    name: 'HTTP Sender',
    children: [],
  },
  {
    id: 'httpsender2',
    name: 'HTTP Sender2',
    children: [
      [
        {
          id: 'parallel923932',
          name: 'Parallel923',
          children: [
            [
              {
                id: 'sql10',
                name: 'SQL',
                children: [],
              },
              {
                id: 'sql11',
                name: 'SQL',
                children: [
                  [
                    {
                      id: 'sql111',
                      name: 'SQLudududu',
                      children: [],
                    },
                  ],
                  [
                    {
                      id: 'sql1342',
                      name: 'asklfjasljflasdj',
                      children: [],
                    },
                  ],
                ],
              },
              {
                id: 'sql12',
                name: 'SQL',
                children: [],
              },
              {
                id: 'sql13',
                name: 'SQL',
                children: [],
              },
            ],
          ],
        },
      ],
      [{
        id: 'rabbitmq5x103030',
        name: 'RabbitMQ 5.X',
        children: [],
      }]
    ],
  },
];
