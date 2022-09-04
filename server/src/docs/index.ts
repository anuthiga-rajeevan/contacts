// import { createFlowmapper, flowmapperRequestBody } from './schema/createFlowmapper';
// import { accountResponse } from './schema/accounts';

export const options = {
  openapi: '3.0.0',
  info: {
    title: 'Contacts',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'Contacts Backend API Documentation',
    },
  ],
  tags: ['Contacts'],
//   paths: {
//     '/api/accounts/{accountId}/flowmapper': {
//       post: createFlowmapper,
//     },
//   },
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//       },
//     },
//     schemas: {
//       flowmapperRequestBody,
//       accountResponse,
//     },
//   },
};
