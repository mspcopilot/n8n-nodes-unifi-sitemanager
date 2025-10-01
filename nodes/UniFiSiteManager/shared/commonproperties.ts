import type { INodeProperties } from 'n8n-workflow';

export const createPaginationProperties = (resource: string): INodeProperties[] => [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [resource],
				operation: ['getAll'],
			},
		},
		default: true,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: [resource],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

export const createPaginationConfiguration = (fullPath: string) => ({
	pagination: {
		type: 'generic' as const,
		properties: {
			continue: '={{ $parameter.returnAll && !!$response.nextToken }}',
			request: {
				url: `=${fullPath}`,
				qs: {
					nextToken: '={{ $response.nextToken }}',
				},
			},
		},
	},
});

export const dataOutputProperty = {
	postReceive: [
		{
			type: 'rootProperty' as const,
			properties: {
				property: 'data',
			},
		},
	],
};