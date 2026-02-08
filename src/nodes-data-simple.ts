import type { Node } from "./nodes.interfaces";

export const nodes: Node[] = [
  // {
  //   id: "http1",
  //   name: "HTTP Trigger",
  //   type: "default",
  // },
  {
    id: "http2",
    name: "choice",
    type: "group",
    children: [
      [{ id: "when", name: "When", type: "default" }],
      [{ id: "otherwise", name: "Otherwise", type: "default" }],
    ],
  },
  // {
  //   id: "activemq61",
  //   name: "Active MQ 6.X",
  //   type: "default",
  // },
  // {
  //   id: "parallel1",
  //   name: "Parallel",
  //   type: "group",
  //   children: [
  //     [
  //       {
  //         id: "script1",
  //         name: "Script",
  //         type: "default",
  //       },
  //       {
  //         id: "nested-parallel1",
  //         name: "Nested Parallel",
  //         type: "group",
  //         children: [
  //           [
  //             {
  //               id: "smtp1",
  //               name: "SMTP",
  //               type: "default",
  //             },
  //             {
  //               id: "logger1",
  //               name: "Logger",
  //               type: "group",
  //               children: [
  //                 [
  //                   {
  //                     id: "sql4",
  //                     name: "SQL",
  //                     type: "default",
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     id: "sql5",
  //                     name: "SQL",
  //                     type: "default",
  //                   },
  //                 ],
  //               ],
  //             },
  //           ],
  //           [
  //             {
  //               id: "cache2",
  //               name: "Cache",
  //               type: "default",
  //             },
  //           ],
  //         ],
  //       },
  //     ],
  //     [
  //       {
  //         id: "sql1",
  //         name: "SQL",
  //         type: "group",
  //         children: [
  //           [
  //             {
  //               id: "sql3",
  //               name: "SQL3",
  //               type: "default",
  //             },
  //           ],
  //           [
  //             {
  //               id: "cache1",
  //               name: "Cache",
  //               type: "default",
  //             },
  //           ],
  //           [
  //             {
  //               id: "rabbitmq1",
  //               name: "RABBITMQ",
  //               type: "default",
  //             },
  //           ],
  //           [
  //             {
  //               id: "kafka1",
  //               name: "Kafka",
  //               type: "default",
  //             },
  //           ],
  //         ],
  //       },
  //       {
  //         id: "setBody1",
  //         name: "setBody1",
  //         type: "group",
  //         children: [
  //           [
  //             {
  //               id: "otlp1",
  //               name: "otlp1",
  //               type: "default",
  //             },
  //           ],
  //           [
  //             {
  //               id: "otlp2",
  //               name: "otlp2",
  //               type: "default",
  //             },
  //           ],
  //         ],
  //       },
  //     ],
  //     [
  //       {
  //         id: "sql2",
  //         name: "SQL2",
  //         type: "default",
  //       },
  //       {
  //         id: "loop1",
  //         name: "loop1",
  //         type: "group",
  //         children: [
  //           [
  //             {
  //               id: "dataMapper1",
  //               name: "dataMapper1",
  //               type: "default",
  //             },
  //             {
  //               id: "bean1",
  //               name: "bean1",
  //               type: "default",
  //             },
  //           ],
  //         ],
  //       },
  //     ],
  //   ],
  // },
  // {
  //   id: "httpsender1",
  //   name: "HTTP Sender",
  //   type: "default",
  // },
  // {
  //   id: "httpsender2",
  //   name: "HTTP Sender2",
  //   type: "group",
  //   children: [
  //     [
  //       {
  //         id: "parallel923932",
  //         name: "Parallel923",
  //         type: "group",
  //         children: [
  //           [
  //             {
  //               id: "sql10",
  //               name: "SQL",
  //               type: "default",
  //             },
  //             {
  //               id: "sql11",
  //               name: "SQL",
  //               type: "group",
  //               children: [
  //                 [
  //                   {
  //                     id: "sql111",
  //                     name: "SQLudududu",
  //                     type: "default",
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     id: "sql1342",
  //                     name: "asklfjasljflasdj",
  //                     type: "default",
  //                   },
  //                 ],
  //               ],
  //             },
  //             {
  //               id: "sql12",
  //               name: "SQL",
  //               type: "default",
  //             },
  //             {
  //               id: "sql13",
  //               name: "SQL",
  //               type: "default",
  //             },
  //           ],
  //         ],
  //       },
  //     ],
  //     [
  //       {
  //         id: "rabbitmq5x103030",
  //         name: "RabbitMQ 5.X",
  //         type: "default",
  //       },
  //     ],
  //   ],
  // },
];
