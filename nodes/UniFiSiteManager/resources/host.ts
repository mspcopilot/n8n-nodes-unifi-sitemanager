import type { INodeProperties } from 'n8n-workflow';
import { createPaginationProperties, createPaginationConfiguration, dataOutputProperty } from '../shared/commonproperties';

const hostGetAllDescription = createPaginationProperties('host');

const hostGetDescription: INodeProperties[] = [
	{
		displayName: 'Host ID',
		name: 'hostId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['host'],
				operation: ['get'],
			},
		},
		default: '',
		placeholder: 'e.g. 507f1f77bcf86cd799439011',
		required: true,
		description: 'The ID of the host to retrieve',
	},
];

const showOnlyForHosts = {
	resource: ['host'],
};

export const hostDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForHosts,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many hosts',
				description: 'Retrieve a list of many hosts associated with the UI account',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/hosts',
						qs: {
							pageSize: '={{ !$parameter.returnAll ? $parameter.limit : undefined }}',
						},
					},
					operations: createPaginationConfiguration('/v1/hosts'),
					output: dataOutputProperty,
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a host',
				description: 'Get detailed information about a specific host by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/hosts/{{$parameter.hostId}}',
					},
					output: dataOutputProperty,
				},
			},
		],
		default: 'getAll',
	},
	...hostGetAllDescription,
	...hostGetDescription,
];