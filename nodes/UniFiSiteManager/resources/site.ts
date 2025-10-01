import type { INodeProperties } from 'n8n-workflow';
import { createPaginationProperties, createPaginationConfiguration, dataOutputProperty } from '../shared/commonproperties';

const siteGetAllDescription = createPaginationProperties('site');

const showOnlyForSites = {
	resource: ['site'],
};

export const siteDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSites,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many sites',
				description: 'Retrieve a list of many sites from hosts running the UniFi Network application',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/sites',
						qs: {
							pageSize: '={{ !$parameter.returnAll ? $parameter.limit : undefined }}',
						},
					},
					operations: createPaginationConfiguration('/v1/sites'),
					output: dataOutputProperty,
				},
			},
		],
		default: 'getAll',
	},
	...siteGetAllDescription,
];